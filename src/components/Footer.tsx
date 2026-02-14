import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl text-primary mb-4">Saint Samson</h3>
            <p className="font-elegant text-lg text-muted-foreground italic">Paris in Your Pocket</p>
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
              Luxury fragrance oils & perfumes designed for compliments — made to layer, last, and travel.
            </p>
          </div>
          <div>
            <h4 className="font-body text-sm tracking-luxury uppercase text-foreground mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/products" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link to="/cart" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Cart</Link>
            </div>
          </div>
          <div>
            <h4 className="font-body text-sm tracking-luxury uppercase text-foreground mb-6">Info</h4>
            <div className="flex flex-col gap-3">
              <span className="font-body text-sm text-muted-foreground">Fast Shipping</span>
              <span className="font-body text-sm text-muted-foreground">Long Lasting</span>
              <span className="font-body text-sm text-muted-foreground">Gift-Ready</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="font-body text-xs text-muted-foreground tracking-wide-luxury">
            © 2026 Saint Samson Paris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
