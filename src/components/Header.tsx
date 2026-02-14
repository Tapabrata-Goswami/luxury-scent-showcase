import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useWooCart } from "@/hooks/useWooCart";
import { useWooMenu } from "@/hooks/useWooMenu";
import logo from "@/assets/logo-transparent.png";
import { useState } from "react";

const Header = () => {
  const { cart } = useWooCart();
  const { items: menuItems } = useWooMenu("PRIMARY");
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = cart?.contents?.nodes?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  // Convert WordPress absolute URLs to relative paths
  const toPath = (item: { path: string; url: string }) => {
    try {
      const url = new URL(item.url);
      return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    } catch {
      return item.path || "/";
    }
  };

  // Fallback nav if no WP menu configured
  const fallbackLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/products" },
  ];

  const navLinks = menuItems.length > 0
    ? menuItems.map((m) => ({ label: m.label, path: toPath(m) }))
    : fallbackLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Saint Samson Paris" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-body text-sm tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
