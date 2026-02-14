import { motion } from "framer-motion";

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.05 }}
        className="flex flex-col items-center"
      >
        <div className="w-full aspect-square bg-secondary/50 rounded-sm animate-pulse mb-5" />
        <div className="h-5 w-24 bg-secondary/50 rounded animate-pulse mb-2" />
        <div className="h-4 w-32 bg-secondary/30 rounded animate-pulse mb-3" />
        <div className="h-4 w-16 bg-secondary/30 rounded animate-pulse" />
      </motion.div>
    ))}
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
    <div className="aspect-square bg-secondary/50 rounded-sm animate-pulse" />
    <div className="flex flex-col gap-4">
      <div className="h-4 w-32 bg-secondary/30 rounded animate-pulse" />
      <div className="h-10 w-64 bg-secondary/50 rounded animate-pulse" />
      <div className="h-5 w-48 bg-secondary/30 rounded animate-pulse" />
      <div className="h-8 w-24 bg-secondary/50 rounded animate-pulse mt-4" />
      <div className="h-20 w-full bg-secondary/30 rounded animate-pulse mt-4" />
      <div className="h-12 w-full bg-secondary/50 rounded animate-pulse mt-8" />
    </div>
  </div>
);
