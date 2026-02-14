import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useWooCart } from "@/hooks/useWooCart";
import { toast } from "sonner";
import GraphQLNotConfigured from "@/components/GraphQLNotConfigured";
import { ProductDetailSkeleton } from "@/components/LoadingSkeleton";

const parsePrice = (price: string): string => {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, configured } = useProduct(id);
  const { addToCart } = useWooCart();

  if (!configured) return <GraphQLNotConfigured />;

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24">
        <div className="container mx-auto px-6">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAdd = async () => {
    try {
      await addToCart(product.databaseId);
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const allImages = [
    product.image,
    ...(product.galleryImages?.nodes ?? []),
  ].filter(Boolean);

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
            className="flex flex-col gap-4"
          >
            <div className="aspect-square bg-secondary/30 rounded-sm overflow-hidden">
              <img src={product.image?.sourceUrl} alt={product.image?.altText || product.name} className="w-full h-full object-cover" />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square bg-secondary/30 rounded-sm overflow-hidden">
                    <img src={img.sourceUrl} alt={img.altText || ""} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-2">Saint Samson Paris</p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">{product.name}</h1>
            {product.sku && (
              <p className="font-body text-xs text-muted-foreground mb-4">SKU: {product.sku}</p>
            )}
            <p className="font-body text-2xl text-foreground mb-4">{parsePrice(product.price)}</p>

            {product.stockStatus === "OUT_OF_STOCK" ? (
              <p className="font-body text-sm text-destructive mb-8">Out of Stock</p>
            ) : (
              <p className="font-body text-sm text-primary mb-8">In Stock</p>
            )}

            <div
              className="font-body text-sm text-muted-foreground leading-relaxed mb-10 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />

            <button
              onClick={handleAdd}
              disabled={product.stockStatus === "OUT_OF_STOCK"}
              className="w-full font-body text-xs tracking-luxury uppercase bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stockStatus === "OUT_OF_STOCK" ? "Sold Out" : "Add to Cart"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
