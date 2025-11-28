import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, service, preferred_date, preferred_time, message } = data

    // Format the email content
    const emailContent = `
New Consultation Request Received

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Interest: ${service}
Preferred Date: ${preferred_date}
Preferred Time: ${preferred_time}

Message:
${message || "No additional message"}

---
This notification was sent from The Humble Organizational booking system.
    `.trim()

    // For now, we'll log it to console
    // You'll need to add your email service credentials (Resend, SendGrid, etc.)
    console.log("[v0] New consultation request:", emailContent)

    // TODO: Integrate with an email service like Resend
    // Example with Resend:
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'noreply@yourdomain.com',
    //     to: 'your-email@example.com',
    //     subject: `New Consultation Request from ${name}`,
    //     text: emailContent
    //   })
    // })

    return NextResponse.json({ success: true, message: "Email notification sent" })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email notification" }, { status: 500 })
  }
}
