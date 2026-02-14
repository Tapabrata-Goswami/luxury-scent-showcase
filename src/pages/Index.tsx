import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import GraphQLNotConfigured from "@/components/GraphQLNotConfigured";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { products, loading, configured } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-lg"
          >
            <h1 className="font-display text-5xl md:text-7xl text-foreground leading-tight mb-2">
              Saint Samson
            </h1>
            <p className="font-body text-sm tracking-luxury uppercase text-muted-foreground mb-6">
              Paris in Your Pocket
            </p>
            <p className="font-elegant text-lg text-foreground/80 leading-relaxed mb-10">
              Luxury fragrance oils & perfumes designed for compliments — made to layer, last, and travel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase border-2 border-foreground text-foreground px-8 py-3.5 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Shop Best Sellers
              </Link>
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase border-2 border-foreground text-foreground px-8 py-3.5 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Try the Discovery Bar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border py-5 bg-background">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {["Fast Shipping", "Long Lasting", "Gift-Ready", "Loved on TikTok"].map((item) => (
            <span key={item} className="font-body text-xs tracking-luxury uppercase text-muted-foreground">
              • {item}
            </span>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl text-center text-foreground mb-16"
          >
            Best Sellers
          </motion.h2>

          {!configured ? (
            <GraphQLNotConfigured />
          ) : loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <p className="text-center font-elegant text-lg text-muted-foreground italic">
              No products found. Add products in WooCommerce.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {products.slice(0, 5).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Discovery Bar CTA — dark band */}
      <section className="py-20 bg-noir text-cream">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
              The Saint Samson Discovery Bar
            </h2>
            <p className="font-elegant text-lg text-cream-muted mb-8">
              Best Value · Perfect for Gifting · Travel-Ready 10mL
            </p>
            <Link
              to="/products"
              className="font-body text-xs tracking-luxury uppercase bg-gold-gradient text-noir px-10 py-4 hover:opacity-90 transition-opacity inline-block font-bold"
            >
              Build Your Set
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon — Eau de Parfum */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-body text-sm tracking-luxury uppercase text-muted-foreground mb-2">
              Coming Soon
            </h2>
            <p className="font-display text-3xl md:text-4xl text-foreground italic mb-12">
              Eau de Parfum
            </p>

            {!configured ? null : loading ? (
              <ProductGridSkeleton />
            ) : products.length === 0 ? null : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                {products.slice(0, 5).map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative overflow-hidden bg-secondary/30 rounded-sm mb-5 aspect-square w-full">
                      <img
                        src={product.image?.sourceUrl}
                        alt={product.image?.altText || product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
                    <p
                      className="font-elegant text-sm text-muted-foreground italic mb-2 line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: product.shortDescription || "" }}
                    />
                    <p className="font-body text-sm text-foreground">50mL / $58.00</p>
                  </motion.div>
                ))}
              </div>
            )}

            <button className="font-body text-xs tracking-luxury uppercase border-2 border-gold text-gold px-10 py-3.5 hover:bg-gold hover:text-background transition-all duration-300">
              Notify Me
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
