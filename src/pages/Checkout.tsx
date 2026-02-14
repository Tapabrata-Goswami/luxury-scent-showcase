import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", country: "", zip: "",
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! Thank you for your purchase.");
    clearCart();
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full bg-secondary/50 border border-border text-foreground font-body text-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-3xl text-foreground mb-12 text-center"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-6">
            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Address</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Country</label>
                <input type="text" name="country" required value={formData.country} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">ZIP</label>
                <input type="text" name="zip" required value={formData.zip} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors"
            >
              Place Order — ${totalPrice.toFixed(2)}
            </button>
          </form>

          <div className="md:col-span-2">
            <div className="border border-border p-6">
              <h3 className="font-display text-lg text-foreground mb-6">Order Summary</h3>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-body text-sm text-foreground">{item.product.name} <span className="text-muted-foreground">×{item.quantity}</span></p>
                  </div>
                  <p className="font-body text-sm text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-border mt-4 pt-4 flex justify-between">
                <span className="font-body text-sm tracking-luxury uppercase text-muted-foreground">Total</span>
                <span className="font-display text-xl text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
