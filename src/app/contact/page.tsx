"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full flex items-center justify-center bg-neutral-900 border-b-4 border-primary/20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
          alt="Contact Us Support"
          fill
          className="object-cover opacity-30 animate-scale-slow"
        />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-white tracking-tight">
            Get in <span className="text-primary text-glow">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Have questions about our food? We're here to help you anytime.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white/95 backdrop-blur rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Gourmet Street,
                    <br />
                    Foodie District, NY 10001
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white/95 backdrop-blur rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                  <p className="text-muted-foreground mb-1">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Mon-Fri 9am-6pm
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white/95 backdrop-blur rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Address</h3>
                  <p className="text-muted-foreground">support@foodie.com</p>
                  <p className="text-muted-foreground">partners@foodie.com</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 md:p-12">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold font-heading mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we will get back to you within
                    24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-semibold">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="h-12 bg-neutral-50 border-neutral-200 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-semibold"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 bg-neutral-50 border-neutral-200 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-base font-semibold"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      className="h-12 bg-neutral-50 border-neutral-200 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-base font-semibold"
                    >
                      Message
                    </Label>
                    <textarea
                      id="message"
                      className="flex w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                      placeholder="Write your message here..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <Send className="w-5 h-5" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <AccordionItem
              question="How long does delivery take?"
              answer="Usually within 30-45 minutes depending on your location and restaurant preparation time."
            />
            <AccordionItem
              question="Do you offer vegetarian options?"
              answer="Yes, most of our restaurant partners offer a wide variety of vegetarian and vegan options. You can filter by 'Veg' on the menu page."
            />
            <AccordionItem
              question="What payment methods do you accept?"
              answer="We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay. Cash on delivery is also available in select areas."
            />
            <AccordionItem
              question="Can I track my order?"
              answer="Absolutely! You can track your order in real-time from the 'Orders' page or the link sent to your phone/email."
            />
          </div>
        </div>

        {/* Socials */}
        <div className="mt-24 text-center">
          <h3 className="font-bold text-xl mb-6">Follow us on Social Media</h3>
          <div className="flex justify-center gap-6">
            <SocialLink icon={<Facebook className="w-6 h-6" />} href="#" />
            <SocialLink icon={<Twitter className="w-6 h-6" />} href="#" />
            <SocialLink icon={<Instagram className="w-6 h-6" />} href="#" />
            <SocialLink icon={<Linkedin className="w-6 h-6" />} href="#" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-none shadow-sm overflow-hidden group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary/5 text-primary p-2 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-foreground">{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="text-muted-foreground" />
        ) : (
          <ChevronDown className="text-muted-foreground" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 pt-0 text-muted-foreground pl-20">{answer}</div>
      </div>
    </Card>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg text-muted-foreground hover:text-white hover:bg-primary hover:-translate-y-1 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
