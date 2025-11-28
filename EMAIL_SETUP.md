# Email Notification Setup

To receive email notifications for consultation requests, you need to integrate an email service. Here are the recommended options:

## Option 1: Resend (Recommended)

1. Sign up at https://resend.com
2. Get your API key
3. Add to your Vercel environment variables:
   - `RESEND_API_KEY=your_api_key_here`
4. Verify your domain or use their test domain
5. Update `app/api/send-consultation-email/route.ts` with the commented Resend code

## Option 2: SendGrid

1. Sign up at https://sendgrid.com
2. Get your API key
3. Add to environment variables: `SENDGRID_API_KEY=your_key`
4. Update the API route with SendGrid integration

## Option 3: Nodemailer (Self-hosted SMTP)

Use your own email server with SMTP credentials.

## Current Setup

The email notification API route is set up at `/api/send-consultation-email`. Currently it logs to console. After adding your email service credentials, uncomment and configure the appropriate code in the route file.

Your consultation email will be sent to: **your-email@example.com** (update this in the route file)
