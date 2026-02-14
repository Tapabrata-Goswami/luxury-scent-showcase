import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WooProduct } from "@/graphql/types";

interface ProductCardProps {
  product: WooProduct;
  index?: number;
}

const parsePrice = (price: string): string => {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col bg-card border border-border/30 rounded-sm overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-gold"
    >
      <Link to={`/products/${product.slug}`} className="w-full">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product.image?.sourceUrl}
            alt={product.image?.altText || product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        </div>
      </Link>

      <div className="p-5 flex flex-col items-center text-center flex-1">
        <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
        <p
          className="font-elegant text-sm text-muted-foreground italic mb-4 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: product.shortDescription || "" }}
        />
        <div className="mt-auto w-full space-y-3">
          <p className="font-display text-xl text-gold-gradient">{parsePrice(product.price)}</p>
          <Link
            to={`/products/${product.slug}`}
            className="block font-body text-xs tracking-luxury uppercase border border-primary/50 text-foreground px-6 py-3 hover:bg-gold-gradient hover:text-background transition-all duration-300 text-center"
          >
            Quick Add
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
