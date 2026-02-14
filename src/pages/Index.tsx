import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground leading-tight mb-3">
              Saint Samson
            </h1>
            <p className="font-body text-sm tracking-luxury uppercase text-muted-foreground mb-6">
              Paris in Your Pocket
            </p>
            <p className="font-elegant text-xl text-foreground/80 leading-relaxed mb-10">
              Luxury fragrance oils & perfumes designed for compliments — made to layer, last, and travel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground px-8 py-3.5 hover:bg-primary/90 transition-colors"
              >
                Shop Best Sellers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border py-5">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {["Fast Shipping", "Long Lasting", "Gift-Ready", "Loved on TikTok"].map((item) => (
            <span key={item} className="font-body text-xs tracking-luxury uppercase text-muted-foreground">
              • {item}
            </span>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl text-center text-foreground mb-16"
          >
            Best Sellers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Bar CTA */}
      <section className="py-24 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              The Saint Samson Discovery Bar
            </h2>
            <p className="font-elegant text-lg text-muted-foreground mb-8">
              Best Value · Perfect for Gifting · Travel-Ready 10mL
            </p>
            <button
              onClick={() => products.forEach((p) => addToCart(p))}
              className="font-body text-xs tracking-luxury uppercase bg-gold-gradient text-primary-foreground px-10 py-4 hover:opacity-90 transition-opacity"
            >
              Build Your Set
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
