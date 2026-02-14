import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import GraphQLNotConfigured from "@/components/GraphQLNotConfigured";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import heroBg from "@/assets/hero-bg.jpg";
import productSectionBg from "@/assets/product-section-bg.jpeg";
import perfumeApexion from "@/assets/perfume-apexion.jpg";
import perfumeBlush from "@/assets/perfume-blush-royale.jpg";
import perfumeCognac from "@/assets/perfume-cognac-veil.jpg";
import perfumeRouge from "@/assets/perfume-rouge-imperial.jpg";
import perfumeVelvet from "@/assets/perfume-velvet-cherry.jpg";
import perfumeExtra from "@/assets/perfume-extra-grid.jpg";
import { useState } from "react";

const Index = () => {
  const { products, loading, configured } = useProducts();
  const [email, setEmail] = useState("");

  const galleryImages = [
    { src: perfumeApexion, alt: "Apexion", label: "Apexion" },
    { src: perfumeBlush, alt: "Blush Royale", label: "Blush Royale" },
    { src: perfumeCognac, alt: "Cognac Veil", label: "Cognac Veil" },
    { src: perfumeRouge, alt: "Rouge Imperial", label: "Rouge Imperial" },
    { src: perfumeVelvet, alt: "Velvet Cherry", label: "Velvet Cherry" },
    { src: perfumeExtra, alt: "Noir Collection", label: "Noir Collection" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-body text-xs tracking-luxury uppercase text-gold-gradient mb-4"
            >
              Luxury Fragrance House
            </motion.p>
            <h1 className="font-display text-6xl md:text-8xl text-foreground leading-[0.9] mb-4">
              Saint<br />
              <span className="text-gold-gradient">Samson</span>
            </h1>
            <p className="font-elegant text-xl text-foreground/70 leading-relaxed mb-10 max-w-md">
              Luxury fragrance oils & perfumes designed for compliments — made to layer, last, and travel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase bg-gold-gradient text-background px-10 py-4 hover:opacity-90 transition-opacity font-bold"
              >
                Shop Collection
              </Link>
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase border border-primary/50 text-foreground px-10 py-4 hover:border-primary hover:text-primary transition-all duration-300"
              >
                Discovery Set
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border/30 py-6 bg-secondary/50">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-20">
          {["Handcrafted in Paris", "Long Lasting", "Gift-Ready", "Loved on TikTok"].map((item) => (
            <span key={item} className="font-body text-xs tracking-luxury uppercase text-muted-foreground">
              ✦ {item}
            </span>
          ))}
        </div>
      </section>

      {/* Image Grid — 3x2 layout */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-luxury uppercase text-primary mb-3">Our Collection</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              The Art of <span className="text-gold-gradient">Fragrance</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative group overflow-hidden aspect-square"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-display text-lg text-foreground">{img.label}</p>
                  <p className="font-body text-xs tracking-luxury uppercase text-primary">Explore</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img src={perfumeRouge} alt="Saint Samson Perfume" className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-0 border border-primary/20" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-xs tracking-luxury uppercase text-primary mb-4">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                Born in Paris,<br />
                <span className="text-gold-gradient">Worn Everywhere</span>
              </h2>
              <p className="font-elegant text-lg text-muted-foreground leading-relaxed mb-6">
                Saint Samson was founded with a singular vision — to democratize luxury fragrance.
                Each scent is meticulously crafted in our Parisian atelier, using only the finest
                ingredients sourced from Grasse, Tuscany, and the spice markets of Marrakech.
              </p>
              <p className="font-elegant text-lg text-muted-foreground leading-relaxed mb-8">
                Our perfume oils are designed for the modern connoisseur — long-lasting,
                travel-ready, and endlessly compliment-worthy.
              </p>
              <Link
                to="/products"
                className="font-body text-xs tracking-luxury uppercase border border-primary text-primary px-8 py-3.5 hover:bg-primary hover:text-background transition-all duration-300 inline-block"
              >
                Explore the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={productSectionBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-luxury uppercase text-primary mb-3">Bestsellers</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Most <span className="text-gold-gradient">Loved</span>
            </h2>
          </motion.div>

          {!configured ? (
            <GraphQLNotConfigured />
          ) : loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <p className="text-center font-elegant text-lg text-muted-foreground italic">
              No products found. Add products in WooCommerce.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-primary/30" />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-xs tracking-luxury uppercase text-primary mb-4">Coming Soon</p>
            <h2 className="font-display text-5xl md:text-7xl text-foreground italic mb-4">
              Eau de Parfum
            </h2>
            <p className="font-elegant text-xl text-muted-foreground mb-4 max-w-lg mx-auto">
              The next chapter of Saint Samson — a full-size Eau de Parfum line arriving Spring 2026.
            </p>
            <div className="flex justify-center gap-8 mb-12">
              {[
                { value: "50mL", label: "Volume" },
                { value: "$58", label: "Starting" },
                { value: "5", label: "Scents" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="font-display text-3xl text-gold-gradient">{stat.value}</p>
                    <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px h-10 bg-border" />}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
              {galleryImages.slice(0, 5).map((img, i) => (
                <motion.div
                  key={img.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-[3/4] overflow-hidden border border-border/30">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <p className="font-body text-xs tracking-wide-luxury uppercase text-muted-foreground mt-3">{img.label}</p>
                </motion.div>
              ))}
            </div>

            <button className="font-body text-xs tracking-luxury uppercase bg-gold-gradient text-background px-10 py-4 hover:opacity-90 transition-opacity font-bold">
              Notify Me
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-secondary/40 border-y border-border/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="font-body text-xs tracking-luxury uppercase text-primary mb-3">Stay Connected</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Join the <span className="text-gold-gradient">Inner Circle</span>
            </h2>
            <p className="font-elegant text-lg text-muted-foreground mb-8">
              Be the first to know about new launches, exclusive offers, and behind-the-scenes stories.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border/50 px-6 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="font-body text-xs tracking-luxury uppercase bg-gold-gradient text-background px-8 py-4 hover:opacity-90 transition-opacity font-bold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="font-body text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
