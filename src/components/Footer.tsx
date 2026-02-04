"use client";

import Link from "next/link";
import {
  UtensilsCrossed,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-white">
              Subscribe to our Newsletter
            </h2>
            <p className="text-white/90 text-lg max-w-md">
              Get exclusive deals, new menu alerts, and special offers delivered
              to your inbox.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                placeholder="Enter your email"
                className="pl-10 h-14 w-full md:w-80 bg-white text-neutral-900 border-none rounded-xl focus:ring-4 focus:ring-white/30"
              />
            </div>
            <Button
              size="lg"
              className="h-14 px-8 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl font-bold shadow-lg"
            >
              Subscribe
            </Button>
          </div>

          {/* Visual Decoration */}
          <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <UtensilsCrossed size={200} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-neutral-800 pb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                <UtensilsCrossed size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight font-heading">
                Foodie.
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed">
              Experience the best food delivery service in town. We deliver
              happiness to your doorstep with love and care.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/menu">Browse Menu</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/offers">Special Offers</FooterLink>
              <FooterLink href="/orders">Track Order</FooterLink>
              <FooterLink href="/cart">My Cart</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Support
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/careers">Work with Us</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Contact Used
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary w-6 h-6 shrink-0 mt-1" />
                <span className="text-neutral-400">
                  123 Gourmet Street,
                  <br /> Foodie District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary w-6 h-6 shrink-0" />
                <span className="text-neutral-400 font-medium">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary w-6 h-6 shrink-0" />
                <span className="text-neutral-400">support@foodie.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-500">
          <p>© 2024 Foodie Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
    >
      {icon}
    </a>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-neutral-400 hover:text-primary transition-all duration-300 flex items-center gap-2 group"
      >
        <ArrowRight
          size={14}
          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        />
        <span className="group-hover:translate-x-1 transition-transform">
          {children}
        </span>
      </Link>
    </li>
  );
}
