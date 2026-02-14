import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 font-body text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="aspect-square bg-secondary/30 rounded-sm overflow-hidden"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2">Saint Samson Paris</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">{product.name}</h1>
            <p className="font-elegant text-lg text-primary italic mb-6">{product.tagline}</p>
            <p className="font-body text-2xl text-foreground mb-8">${product.price.toFixed(2)} <span className="text-sm text-muted-foreground">/ {product.size}</span></p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">{product.description}</p>

            {/* Notes */}
            <div className="grid grid-cols-3 gap-6 mb-10 border-t border-b border-border py-8">
              {(["top", "heart", "base"] as const).map((type) => (
                <div key={type}>
                  <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-3">
                    {type === "top" ? "Top Notes" : type === "heart" ? "Heart Notes" : "Base Notes"}
                  </p>
                  {product.notes[type].map((n) => (
                    <p key={n} className="font-elegant text-sm text-foreground">{n}</p>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={handleAdd}
              className="w-full font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
