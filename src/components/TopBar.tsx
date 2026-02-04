import { Phone, Mail, Clock, MapPin } from "lucide-react";

export function TopBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground py-2 text-[10px] md:text-xs">
      <div className="container mx-auto px-6 flex flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1.5 hover:text-white/90 transition-colors cursor-pointer">
            <Phone size={14} className="fill-current" />
            <span className="font-medium tracking-wide">+1 (555) 123-4567</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 hover:text-white/90 transition-colors cursor-pointer">
            <Mail size={14} />
            <span className="font-medium tracking-wide">hello@foodie.com</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock size={14} />
            <span className="font-medium">Daily: 8:00 AM - 11:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5 md:hidden">
            <MapPin size={14} />
            <span className="font-medium">Chennai, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
