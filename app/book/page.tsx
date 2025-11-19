'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Insert the booking data into Supabase
      const { error: insertError } = await supabase
        .from('consultations')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service: formData.service,
          preferred_date: formData.date,
          preferred_time: formData.time,
          message: formData.message || null,
        })

      if (insertError) {
        throw insertError
      }

      setSubmitted(true)
    } catch (err) {
      console.error('[v0] Error submitting booking:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border">
          <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="The Humble Organizational"
                  width={50}
                  height={62}
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-light text-xl tracking-[0.15em] text-foreground">
                    HUMBLE
                  </span>
                  <span className="font-light text-xs tracking-[0.2em] text-muted-foreground">
                    ORGANIZATIONAL
                  </span>
                </div>
              </Link>
            </div>
          </nav>
        </header>

        {/* Success Message */}
        <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-4">
              Consultation <span className="font-normal">Requested</span>
            </h1>
            <p className="text-lg font-light text-muted-foreground text-pretty mb-8">
              Thank you for your interest! We&apos;ve received your consultation request and will contact you within 24 hours to confirm your appointment.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="The Humble Organizational"
                width={50}
                height={62}
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-light text-xl tracking-[0.15em] text-foreground">
                  HUMBLE
                </span>
                <span className="font-light text-xs tracking-[0.2em] text-muted-foreground">
                  ORGANIZATIONAL
                </span>
              </div>
            </Link>
            <Button asChild variant="ghost" className="font-light tracking-wide">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Booking Form Section */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Info */}
          <div>
            <div className="inline-block rounded-sm border border-border px-4 py-2 mb-6">
              <span className="text-xs font-light tracking-[0.2em] text-muted-foreground">
                SCHEDULE CONSULTATION
              </span>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-balance lg:text-5xl mb-6">
              Let&apos;s discuss your
              <br />
              <span className="font-normal">organizing needs</span>
            </h1>
            <p className="text-lg font-light leading-relaxed text-muted-foreground text-pretty mb-8">
              Book a complimentary consultation with our team to explore how The Humble Organizational can elevate your practice.
            </p>

            <div className="space-y-6">
              <Card className="p-6 border-border">
                <Calendar className="h-8 w-8 mb-3 text-foreground" />
                <h3 className="text-lg font-normal mb-2 tracking-wide">Flexible Scheduling</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  Choose a time that works best for you. We offer consultations Monday through Friday.
                </p>
              </Card>

              <Card className="p-6 border-border">
                <Clock className="h-8 w-8 mb-3 text-foreground" />
                <h3 className="text-lg font-normal mb-2 tracking-wide">30-Minute Session</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  A focused discussion to understand your goals and how we can support your journey.
                </p>
              </Card>
            </div>
          </div>

          {/* Right Column - Form */}
          <Card className="p-8 border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-light tracking-wide">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="font-light"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-light tracking-wide">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="font-light"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-light tracking-wide">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-light"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-light tracking-wide">
                  Service Interest *
                </Label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a service</option>
                  <option value="tho-membership">THO Membership</option>
                  <option value="space-optimization">Space Optimization Studio</option>
                  <option value="certification">Systems Certification</option>
                  <option value="marketplace">Organizer&apos;s Marketplace</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-light tracking-wide">
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="font-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-light tracking-wide">
                    Preferred Time *
                  </Label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-light tracking-wide">
                  Additional Information
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="font-light min-h-[120px]"
                  placeholder="Tell us about your organizing practice and what you hope to achieve..."
                />
              </div>

              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-light tracking-wide"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Schedule Consultation'}
              </Button>

              <p className="text-xs font-light text-muted-foreground text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}
