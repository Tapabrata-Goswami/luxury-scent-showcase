import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="container mx-auto px-6">
        <p className="font-elegant text-center text-base italic text-muted-foreground mb-8">
          Paris-worthy scent, pocket-sized. Join the list for exclusive offers.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <Link to="/products" className="font-body text-xs tracking-wide-luxury uppercase text-muted-foreground hover:text-foreground transition-colors">
            Shipping & Returns
          </Link>
          <Link to="/products" className="font-body text-xs tracking-wide-luxury uppercase text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link to="/products" className="font-body text-xs tracking-wide-luxury uppercase text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
        <p className="font-body text-xs text-center text-muted-foreground tracking-wide-luxury">
          © 2026 Saint Samson Paris. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
