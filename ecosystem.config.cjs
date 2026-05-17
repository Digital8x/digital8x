module.exports = {
  apps: [
    {
      name: "digital8x-next",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3002,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
        // Database Credentials
        DB_HOST: "localhost",
        DB_USER: "a1679hju_digital8x",
        DB_PASSWORD: "ArjunEswar",
        DB_NAME: "a1679hju_digital8x",
        // SMTP Credentials
        SMTP_HOST: "mail.shivabihani.com",
        SMTP_USER: "leads@shivabihani.com",
        SMTP_PASS: "={3)%J6b1mh7",
        SMTP_PORT: 465,
        SMTP_FROM_NAME: "Digital 8x Leads",
        // Admin Notifications
        ADMIN_EMAILS: "harshmheswry@gmail.com,diyarjun9@gmail.com",
      },
    },
  ],
};
