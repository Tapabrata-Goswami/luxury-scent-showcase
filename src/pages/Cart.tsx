import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl text-foreground mb-4">Your Cart is Empty</h1>
        <p className="font-elegant text-lg text-muted-foreground mb-8 italic">Discover your signature scent</p>
        <Link
          to="/products"
          className="font-body text-xs tracking-luxury uppercase border border-primary/50 text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl text-foreground mb-12 text-center"
        >
          Shopping Cart
        </motion.h1>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-6 border-b border-border pb-6"
            >
              <Link to={`/products/${item.product.id}`} className="w-20 h-20 flex-shrink-0 bg-secondary/30 rounded-sm overflow-hidden">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg text-foreground">{item.product.name}</h3>
                <p className="font-elegant text-sm text-muted-foreground italic">{item.product.size}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-muted-foreground hover:text-primary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-muted-foreground hover:text-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <p className="font-body text-sm w-20 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>

              <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <div className="flex justify-between items-center mb-8">
            <span className="font-body text-sm tracking-luxury uppercase text-muted-foreground">Total</span>
            <span className="font-display text-2xl text-foreground">${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full text-center font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
