import { useState } from "react";
import { motion } from "framer-motion";
import { useWooCart } from "@/hooks/useWooCart";
import { graphqlFetch } from "@/lib/graphql-client";
import { CHECKOUT_MUTATION } from "@/graphql/queries";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GraphQLNotConfigured from "@/components/GraphQLNotConfigured";

const parsePrice = (price: string): string => {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
};

const Checkout = () => {
  const { cart, loading, configured, applyCoupon } = useWooCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", address1: "", city: "", country: "", postcode: "", phone: "",
  });

  if (!configured) return <GraphQLNotConfigured />;

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center">
        <div className="animate-pulse font-elegant text-lg text-muted-foreground italic">Loading checkout...</div>
      </div>
    );
  }

  const items = cart?.contents?.nodes ?? [];
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await graphqlFetch<{ checkout: { redirect?: string; order?: { orderNumber?: string } } }>(
        CHECKOUT_MUTATION,
        {
          input: {
            billing: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              address1: formData.address1,
              city: formData.city,
              country: formData.country,
              postcode: formData.postcode,
              phone: formData.phone,
            },
            shipping: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address1: formData.address1,
              city: formData.city,
              country: formData.country,
              postcode: formData.postcode,
            },
            paymentMethod: "cod",
          },
        }
      );

      if (data?.checkout?.redirect) {
        window.location.href = data.checkout.redirect;
      } else {
        toast.success(`Order #${data?.checkout?.order?.orderNumber} placed successfully!`);
        navigate("/");
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      await applyCoupon(couponCode.trim());
      toast.success("Coupon applied!");
      setCouponCode("");
    } catch {
      toast.error("Invalid coupon code");
    }
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
              <input type="text" name="address1" required value={formData.address1} onChange={handleChange} className={inputClass} />
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
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Postcode</label>
                <input type="text" name="postcode" required value={formData.postcode} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Processing..." : `Place Order — ${parsePrice(cart?.total ?? "0")}`}
            </button>
          </form>

          <div className="md:col-span-2">
            <div className="border border-border p-6">
              <h3 className="font-display text-lg text-foreground mb-6">Order Summary</h3>
              {items.map((item) => (
                <div key={item.key} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-body text-sm text-foreground">{item.product.node.name} <span className="text-muted-foreground">×{item.quantity}</span></p>
                  </div>
                  <p className="font-body text-sm text-foreground">{parsePrice(item.total)}</p>
                </div>
              ))}

              {/* Coupon */}
              <div className="border-t border-border mt-4 pt-4">
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-secondary/50 border border-border text-foreground font-body text-sm px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="font-body text-xs tracking-luxury uppercase border border-primary/50 text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {cart?.appliedCoupons && cart.appliedCoupons.length > 0 && (
                <div className="mt-3">
                  {cart.appliedCoupons.map((c) => (
                    <p key={c.code} className="font-body text-xs text-primary">
                      Coupon "{c.code}": -{parsePrice(c.discountAmount)}
                    </p>
                  ))}
                </div>
              )}

              <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-body text-sm text-foreground">{parsePrice(cart?.subtotal ?? "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-muted-foreground">Shipping</span>
                  <span className="font-body text-sm text-foreground">{parsePrice(cart?.shippingTotal ?? "0")}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border">
                  <span className="font-body text-sm tracking-luxury uppercase text-muted-foreground">Total</span>
                  <span className="font-display text-xl text-foreground">{parsePrice(cart?.total ?? "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
