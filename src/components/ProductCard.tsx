import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col items-center text-center"
    >
      <Link to={`/products/${product.id}`} className="w-full">
        <div className="relative overflow-hidden bg-secondary/30 rounded-sm mb-5 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
        </div>
      </Link>

      <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
      <p className="font-elegant text-sm text-muted-foreground italic mb-3">{product.tagline}</p>

      <button
        onClick={() => addToCart(product)}
        className="font-body text-xs tracking-luxury uppercase border border-primary/50 text-primary px-6 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-300 mb-2"
      >
        Quick Add
      </button>
      <p className="font-body text-sm text-foreground">${product.price.toFixed(2)}</p>
    </motion.div>
  );
};

export default ProductCard;
