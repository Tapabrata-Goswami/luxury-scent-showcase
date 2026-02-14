import { motion } from "framer-motion";

const GraphQLNotConfigured = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-screen pt-28 pb-24 flex items-center justify-center"
  >
    <div className="text-center max-w-lg px-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <span className="text-primary text-2xl">⚙</span>
      </div>
      <h1 className="font-display text-3xl text-foreground mb-4">
        Connect Your Backend
      </h1>
      <p className="font-elegant text-lg text-muted-foreground italic mb-6">
        WordPress + WooCommerce GraphQL endpoint not configured
      </p>
      <div className="bg-secondary/50 border border-border rounded-sm p-6 text-left">
        <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground mb-3">
          Setup Steps
        </p>
        <ol className="font-body text-sm text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Install WordPress with WooCommerce</li>
          <li>Install WPGraphQL &amp; WooGraphQL plugins</li>
          <li>
            Update <code className="text-primary font-mono text-xs">src/lib/graphql-client.ts</code> with
            your GraphQL endpoint URL
          </li>
        </ol>
      </div>
    </div>
  </motion.div>
);

export default GraphQLNotConfigured;
