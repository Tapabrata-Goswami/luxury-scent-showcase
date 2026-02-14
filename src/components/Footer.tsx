import { Link } from "react-router-dom";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border/30">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Saint Samson Paris" className="h-12 w-auto mb-4" />
            <p className="font-elegant text-base text-muted-foreground italic leading-relaxed">
              Paris-worthy scent, pocket-sized. Luxury made for the modern connoisseur.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs tracking-luxury uppercase text-primary mb-6">Shop</h4>
            <ul className="space-y-3">
              {["Fragrance Oils", "Discovery Sets", "Eau de Parfum", "Gift Cards"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-xs tracking-luxury uppercase text-primary mb-6">Company</h4>
            <ul className="space-y-3">
              {["Our Story", "Ingredients", "Sustainability", "Press"].map((item) => (
                <li key={item}>
                  <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body text-xs tracking-luxury uppercase text-primary mb-6">Support</h4>
            <ul className="space-y-3">
              {["Shipping & Returns", "FAQ", "Contact Us", "Track Order"].map((item) => (
                <li key={item}>
                  <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social + Bottom bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground tracking-wide-luxury">
            © 2026 Saint Samson Paris. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "TikTok", "Facebook", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-xs tracking-wide-luxury uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
