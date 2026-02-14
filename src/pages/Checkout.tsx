import { useState } from "react";
import { motion } from "framer-motion";
import { useWooCart } from "@/hooks/useWooCart";
import { graphqlFetch } from "@/lib/graphql-client";
import { CHECKOUT_MUTATION } from "@/graphql/queries";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, Tag } from "lucide-react";
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

  const inputClass =
    "w-full bg-secondary/30 border border-border/60 text-foreground font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50";

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl text-foreground mb-2 text-center"
        >
          Checkout
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-elegant text-base text-muted-foreground italic text-center mb-12"
        >
          Complete your order
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Billing Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 flex flex-col gap-5"
          >
            <h2 className="font-display text-xl text-foreground mb-1">Billing Details</h2>

            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                Street Address
              </label>
              <input
                type="text"
                name="address1"
                required
                value={formData.address1}
                onChange={handleChange}
                className={inputClass}
                placeholder="123 Rue de Rivoli"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="FR"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                  Postcode
                </label>
                <input
                  type="text"
                  name="postcode"
                  required
                  value={formData.postcode}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 block">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+33 1 23 45 67 89"
              />
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-2 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary/70" />
                <span className="font-body text-xs">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4 text-primary/70" />
                <span className="font-body text-xs">Free Shipping</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4.5 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Place Order — ${parsePrice(cart?.total ?? "0")}`
              )}
            </button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="border border-border/60 bg-secondary/10 p-6 rounded-sm sticky top-28">
              <h3 className="font-display text-xl text-foreground mb-6">Order Summary</h3>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary/30 rounded-sm overflow-hidden flex-shrink-0">
                      {item.product.node.image?.sourceUrl ? (
                        <img
                          src={item.product.node.image.sourceUrl}
                          alt={item.product.node.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-display text-xs">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-foreground truncate">{item.product.node.name}</p>
                      <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm text-foreground">{parsePrice(item.total)}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t border-border/40 pt-4 mb-4">
                <label className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-secondary/30 border border-border/60 text-foreground font-body text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="font-body text-xs tracking-luxury uppercase border border-primary/50 text-primary px-4 py-2.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {cart?.appliedCoupons && cart.appliedCoupons.length > 0 && (
                <div className="mb-4">
                  {cart.appliedCoupons.map((c) => (
                    <p key={c.code} className="font-body text-xs text-primary flex items-center gap-1">
                      <Tag className="w-3 h-3" /> "{c.code}": −{parsePrice(c.discountAmount)}
                    </p>
                  ))}
                </div>
              )}

              <div className="border-t border-border/40 pt-4 flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-body text-sm text-foreground">{parsePrice(cart?.subtotal ?? "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-muted-foreground">Shipping</span>
                  <span className="font-body text-sm text-foreground">{parsePrice(cart?.shippingTotal ?? "0")}</span>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-border/40">
                  <span className="font-body text-sm tracking-luxury uppercase text-muted-foreground">Total</span>
                  <span className="font-display text-2xl text-foreground">{parsePrice(cart?.total ?? "0")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
