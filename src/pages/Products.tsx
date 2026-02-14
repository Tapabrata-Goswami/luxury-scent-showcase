import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import GraphQLNotConfigured from "@/components/GraphQLNotConfigured";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";

const Products = () => {
  const { products, loading, configured } = useProducts();

  if (!configured) return <GraphQLNotConfigured />;

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">Our Collection</h1>
          <p className="font-elegant text-lg text-muted-foreground italic">Discover your signature scent</p>
        </motion.div>

        {loading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <p className="text-center font-elegant text-lg text-muted-foreground italic">
            No products found. Add products in WooCommerce.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
