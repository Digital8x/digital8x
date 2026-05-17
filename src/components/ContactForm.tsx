"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "", // Spam protection field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field errors as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.trim().replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage("Network connection issue. Please verify your internet and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#488E5C]/20 rounded-full blur-xl animate-pulse"></div>
          <CheckCircle className="w-20 h-20 text-[#488E5C] relative z-10 animate-bounce-slow" />
        </div>
        <h3 className="text-3xl font-black font-syne text-white uppercase tracking-tight mb-4">
          Thank you, {formData.name.split(" ")[0]}!
        </h3>
        <p className="text-lg text-gray-300 font-inter max-w-md leading-relaxed">
          Your enquiry has been securely received and saved. Our performance marketing experts will evaluate your request and contact you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
            setStatus("idle");
          }}
          className="mt-8 px-8 py-3 bg-[#488E5C]/10 border border-[#488E5C]/30 text-[#488E5C] font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-[#488E5C] hover:text-[#111111] transition-all duration-300 font-inter cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <h3 className="text-3xl font-bold font-syne mb-8 uppercase tracking-tight text-white flex items-center gap-3">
        Send a Message
        <span className="inline-block w-2 h-2 rounded-full bg-[#488E5C] animate-pulse"></span>
      </h3>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 rounded-xl flex gap-3 items-start animate-slide-down text-red-200 text-sm font-inter">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Submission Failed</span>
            {errorMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Spam Honeypot Field (visually hidden for bots) */}
        <div className="absolute overflow-hidden w-0 h-0 opacity-0 -z-10">
          <label htmlFor="website">Website URL (leave empty)</label>
          <input
            id="website"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <div className="relative flex items-center">
            <User className="absolute left-5 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#488E5C]" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "loading"}
              className={`w-full bg-black/40 border ${
                fieldErrors.name ? "border-red-500/50" : "border-white/10"
              } rounded-xl pl-14 pr-6 py-4 outline-none focus:border-[#488E5C] focus:ring-1 focus:ring-[#488E5C]/30 text-white placeholder-gray-500 transition-all font-inter`}
            />
          </div>
          {fieldErrors.name && (
            <span className="text-xs text-red-400 font-inter pl-2">{fieldErrors.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <div className="relative flex items-center">
            <Mail className="absolute left-5 text-gray-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "loading"}
              className={`w-full bg-black/40 border ${
                fieldErrors.email ? "border-red-500/50" : "border-white/10"
              } rounded-xl pl-14 pr-6 py-4 outline-none focus:border-[#488E5C] focus:ring-1 focus:ring-[#488E5C]/30 text-white placeholder-gray-500 transition-all font-inter`}
            />
          </div>
          {fieldErrors.email && (
            <span className="text-xs text-red-400 font-inter pl-2">{fieldErrors.email}</span>
          )}
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-1.5">
          <div className="relative flex items-center">
            <Phone className="absolute left-5 text-gray-500 w-5 h-5" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (e.g. +91 9876543210)"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "loading"}
              className={`w-full bg-black/40 border ${
                fieldErrors.phone ? "border-red-500/50" : "border-white/10"
              } rounded-xl pl-14 pr-6 py-4 outline-none focus:border-[#488E5C] focus:ring-1 focus:ring-[#488E5C]/30 text-white placeholder-gray-500 transition-all font-inter`}
            />
          </div>
          {fieldErrors.phone && (
            <span className="text-xs text-red-400 font-inter pl-2">{fieldErrors.phone}</span>
          )}
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-1.5">
          <div className="relative flex">
            <MessageSquare className="absolute left-5 top-4.5 text-gray-500 w-5 h-5" />
            <textarea
              name="message"
              placeholder="Tell us about your project or growth goals..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-14 pr-6 py-4 outline-none focus:border-[#488E5C] focus:ring-1 focus:ring-[#488E5C]/30 text-white placeholder-gray-500 transition-all font-inter resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full flex items-center justify-center gap-3 bg-[#488E5C] text-[#111111] font-black uppercase text-sm tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(72,142,92,0.2)] ${
            status === "loading"
              ? "opacity-80 cursor-not-allowed bg-[#488E5C]/80"
              : "hover:bg-white hover:text-[#111111] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
          } mt-4`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Transmitting Enquiry...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
