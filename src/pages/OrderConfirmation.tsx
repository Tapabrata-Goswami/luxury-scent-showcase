import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

interface OrderData {
  orderNumber?: string;
  total?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state as OrderData | null;

  if (!order?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-20 h-20 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl text-foreground mb-3"
        >
          Thank You for Your Order
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="font-elegant text-lg text-muted-foreground italic mb-10"
        >
          Your order has been placed successfully
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="border border-border/60 bg-secondary/10 rounded-sm p-8 mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Package className="w-5 h-5 text-primary/70" />
            <span className="font-body text-xs tracking-luxury uppercase text-muted-foreground">
              Order Details
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b border-border/30 pb-3">
              <span className="font-body text-sm text-muted-foreground">Order Number</span>
              <span className="font-display text-lg text-foreground">#{order.orderNumber}</span>
            </div>
            {order.total && (
              <div className="flex justify-between border-b border-border/30 pb-3">
                <span className="font-body text-sm text-muted-foreground">Total</span>
                <span className="font-body text-sm text-foreground">{order.total}</span>
              </div>
            )}
            {order.firstName && (
              <div className="flex justify-between border-b border-border/30 pb-3">
                <span className="font-body text-sm text-muted-foreground">Name</span>
                <span className="font-body text-sm text-foreground">
                  {order.firstName} {order.lastName}
                </span>
              </div>
            )}
            {order.email && (
              <div className="flex justify-between">
                <span className="font-body text-sm text-muted-foreground">Confirmation sent to</span>
                <span className="font-body text-sm text-foreground">{order.email}</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-body text-xs tracking-luxury uppercase border border-primary/50 text-primary px-6 py-3.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-xs tracking-luxury uppercase text-muted-foreground hover:text-primary transition-colors px-6 py-3.5"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
