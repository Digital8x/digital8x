import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, honeypot } = body;

    // 1. Honeypot check: If the hidden honeypot field is filled, silently discard it
    // but return a success response to fool the bot
    if (honeypot) {
      console.warn("Spam bot detected via honeypot field. Silently discarding submission.");
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    // 2. Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required fields." },
        { status: 400 }
      );
    }

    // 3. Capture IP address
    const ipAddress = 
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    console.log(`Received lead from ${name} (${email}) - IP: ${ipAddress}`);

    // 4. Try saving to MySQL Database
    let dbSaved = false;
    let dbErrorMsg = "";
    try {
      await saveLead({
        name,
        email,
        phone,
        message: message || "",
        ipAddress,
      });
      dbSaved = true;
      console.log("Lead successfully saved to database.");
    } catch (error: any) {
      console.error("Database save failed:", error);
      dbErrorMsg = error.message || "Unknown DB error";
    }

    // 5. Try sending email via SMTP using Nodemailer
    let emailSent = false;
    let emailErrorMsg = "";
    
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpFromName = process.env.SMTP_FROM_NAME || "Digital 8x Leads";
    const adminEmails = process.env.ADMIN_EMAILS || "harshmheswry@gmail.com,diyarjun9@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // True for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            // Do not fail on invalid certificates if any
            rejectUnauthorized: false,
          },
        });

        // Email styling with high-end dark background and emerald highlights matching digital8x.com
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #111111;
                  color: #dddddd;
                  margin: 0;
                  padding: 40px 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #1a1a1a;
                  border-radius: 16px;
                  overflow: hidden;
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .header {
                  background-color: #488E5C;
                  padding: 30px 40px;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  color: #111111;
                  font-size: 24px;
                  font-weight: 800;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                .content {
                  padding: 40px;
                }
                .lead-title {
                  color: #ffffff;
                  font-size: 20px;
                  font-weight: 700;
                  margin-top: 0;
                  margin-bottom: 25px;
                  border-bottom: 2px solid #488E5C;
                  padding-bottom: 10px;
                }
                .info-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 30px;
                }
                .info-table td {
                  padding: 12px 0;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .info-table td.label {
                  font-weight: bold;
                  color: #888888;
                  width: 120px;
                  text-transform: uppercase;
                  font-size: 12px;
                  letter-spacing: 0.5px;
                }
                .info-table td.value {
                  color: #ffffff;
                  font-size: 15px;
                }
                .message-box {
                  background-color: #111111;
                  border-left: 4px solid #488E5C;
                  padding: 20px;
                  border-radius: 4px;
                  color: #e0e0e0;
                  font-size: 15px;
                  line-height: 1.6;
                  margin-bottom: 30px;
                  white-space: pre-wrap;
                }
                .actions {
                  display: flex;
                  gap: 15px;
                  margin-top: 20px;
                }
                .btn {
                  flex: 1;
                  display: inline-block;
                  text-align: center;
                  padding: 12px 20px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: bold;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  transition: background-color 0.2s;
                }
                .btn-primary {
                  background-color: #488E5C;
                  color: #111111;
                }
                .btn-secondary {
                  background-color: rgba(255, 255, 255, 0.05);
                  color: #ffffff;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .footer {
                  background-color: #111111;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #666666;
                  border-top: 1px solid rgba(255, 255, 255, 0.03);
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Digital 8x</h1>
                </div>
                <div class="content">
                  <div class="lead-title">New Lead Generation</div>
                  <table class="info-table">
                    <tr>
                      <td class="label">Name</td>
                      <td class="value">${name}</td>
                    </tr>
                    <tr>
                      <td class="label">Email</td>
                      <td class="value"><a href="mailto:${email}" style="color: #488E5C; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td class="label">Phone</td>
                      <td class="value"><a href="tel:${phone}" style="color: #488E5C; text-decoration: none;">${phone}</a></td>
                    </tr>
                    <tr>
                      <td class="label">IP Address</td>
                      <td class="value">${ipAddress}</td>
                    </tr>
                    <tr>
                      <td class="label">Date/Time</td>
                      <td class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                    </tr>
                  </table>
                  
                  <div class="label" style="font-weight: bold; color: #888888; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; margin-bottom: 10px;">Message</div>
                  <div class="message-box">${message || "No message provided."}</div>
                  
                  <div class="actions">
                    <a href="tel:${phone}" class="btn btn-primary">Call Now</a>
                    <a href="mailto:${email}" class="btn btn-secondary">Email Lead</a>
                  </div>
                </div>
                <div class="footer">
                  This is an automated lead notification sent from digital8x.com.
                </div>
              </div>
            </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"${smtpFromName}" <${smtpUser}>`,
          to: adminEmails,
          subject: `⚡ New Lead: ${name} - Digital 8x`,
          html: htmlContent,
          text: `New Lead Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nIP Address: ${ipAddress}\nMessage: ${message || "None"}`,
        });

        emailSent = true;
        console.log(`Notification email successfully sent to ${adminEmails}`);
      } catch (error: any) {
        console.error("SMTP sending failed:", error);
        emailErrorMsg = error.message || "Unknown SMTP error";
      }
    } else {
      console.warn("SMTP credentials not fully configured in environment variables.");
      emailErrorMsg = "SMTP environment variables are incomplete.";
    }

    // 6. Return response based on results
    // If either DB or Email succeeds, we consider it a soft success so the client doesn't see a scary error
    if (dbSaved || emailSent) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
        details: {
          database: dbSaved ? "saved" : `failed: ${dbErrorMsg}`,
          email: emailSent ? "sent" : `failed: ${emailErrorMsg}`,
        },
      });
    } else {
      // Both failed
      return NextResponse.json(
        {
          success: false,
          error: "Failed to store lead or send email notification.",
          details: {
            database: dbErrorMsg,
            email: emailErrorMsg,
          },
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
