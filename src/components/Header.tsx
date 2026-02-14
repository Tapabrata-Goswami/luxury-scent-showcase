import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-transparent.png";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Saint Samson Paris" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="font-body text-sm tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-body text-sm tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors">
            Shop
          </Link>
        </nav>

        <Link to="/cart" className="relative group">
          <ShoppingBag className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
