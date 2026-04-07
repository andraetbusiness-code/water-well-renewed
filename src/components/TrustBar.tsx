import { Star, Home, Shield, Calendar, Phone } from "lucide-react";

const trustItems = [
  { icon: Star, label: "4.7 Stars (461+ Reviews)" },
  { icon: Home, label: "HD Authorized Provider" },
  { icon: Shield, label: "Lifetime Warranty" },
  { icon: Calendar, label: "5-Day Risk-Free Trial" },
  { icon: Phone, label: "(951) 612-4094", href: "tel:+19516124094" },
];

export const TrustBar = () => {
  return (
    <div className="w-full bg-[hsl(213,100%,97%)] border-y border-primary/10">
      <div className="container py-3">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {trustItems.map((item) => {
            const content = (
              <div key={item.label} className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80">
                <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </div>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href} className="flex items-center gap-2 whitespace-nowrap text-sm text-foreground/80 hover:text-primary transition-colors">
                  <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </div>
  );
};
