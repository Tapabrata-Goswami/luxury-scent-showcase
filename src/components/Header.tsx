import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, User, LogIn, UserPlus } from "lucide-react";
import { useWooCart } from "@/hooks/useWooCart";
import { useWooMenu } from "@/hooks/useWooMenu";
import logo from "@/assets/logo-transparent.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { cart } = useWooCart();
  const { items: menuItems } = useWooMenu("PRIMARY");
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = cart?.contents?.nodes?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  const toPath = (item: { path: string; url: string }) => {
    try {
      const url = new URL(item.url);
      return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    } catch {
      return item.path || "/";
    }
  };

  const fallbackLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/products" },
  ];

  const navLinks = menuItems.length > 0
    ? menuItems.map((m) => ({ label: m.label, path: toPath(m) }))
    : fallbackLinks;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
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
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-card border-l border-border/30 z-[70] flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <img src={logo} alt="Saint Samson" className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="text-foreground/70 hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
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
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors flex items-center gap-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Cart {itemCount > 0 && `(${itemCount})`}
                </Link>
              </nav>

              {/* Account Section at Bottom */}
              <div className="border-t border-border/20 p-6 space-y-3">
                <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-4">Account</p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-3 font-body text-sm text-foreground/70 hover:text-primary transition-colors py-2"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-3 font-body text-xs tracking-luxury uppercase border border-primary/50 text-foreground px-4 py-3 hover:bg-gold-gradient hover:text-background transition-all duration-300 justify-center"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
