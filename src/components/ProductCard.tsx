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
      className="group flex flex-col items-center text-center"
    >
      <Link to={`/products/${product.slug}`} className="w-full">
        <div className="relative overflow-hidden bg-secondary/30 rounded-sm mb-5 aspect-square">
          <img
            src={product.image?.sourceUrl}
            alt={product.image?.altText || product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
        </div>
      </Link>

      <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
      <p
        className="font-elegant text-sm text-muted-foreground italic mb-3 line-clamp-1"
        dangerouslySetInnerHTML={{ __html: product.shortDescription || "" }}
      />

      <Link
        to={`/products/${product.slug}`}
        className="font-body text-xs tracking-luxury uppercase border-2 border-gold text-foreground px-6 py-2.5 hover:bg-gold hover:text-background transition-all duration-300 mb-2"
      >
        Quick Add
      </Link>
      <p className="font-body text-sm text-foreground">{parsePrice(product.price)}</p>
    </motion.div>
  );
};

export default ProductCard;
