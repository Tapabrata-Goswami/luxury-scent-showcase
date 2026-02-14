import apexionImg from "@/assets/perfume-apexion.jpg";
import velvetCherryImg from "@/assets/perfume-velvet-cherry.jpg";
import blushRoyaleImg from "@/assets/perfume-blush-royale.jpg";
import rougeImperialImg from "@/assets/perfume-rouge-imperial.jpg";
import cognacVeilImg from "@/assets/perfume-cognac-veil.jpg";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  price: number;
  size: string;
  image: string;
  category: "best-seller" | "coming-soon";
}

export const products: Product[] = [
  {
    id: "apexion",
    name: "Apexion",
    tagline: "Crisp, Confident, Clean Woods",
    description: "A commanding blend of crisp bergamot and clean cedarwood that evokes effortless confidence. Apexion opens with a burst of freshness before settling into a warm, woody embrace that lasts all day.",
    notes: { top: ["Bergamot", "Green Apple"], heart: ["Cedar", "Vetiver"], base: ["White Musk", "Sandalwood"] },
    price: 38.00,
    size: "10mL",
    image: apexionImg,
    category: "best-seller",
  },
  {
    id: "velvet-cherry",
    name: "Velvet Cherry",
    tagline: "Dark Cherry & Soft Warmth",
    description: "An intoxicating fusion of dark cherry and velvety amber that wraps you in warmth. This gourmand-meets-oriental scent is perfect for evenings that demand to be remembered.",
    notes: { top: ["Black Cherry", "Almond"], heart: ["Rose", "Tonka Bean"], base: ["Amber", "Vanilla"] },
    price: 38.00,
    size: "10mL",
    image: velvetCherryImg,
    category: "best-seller",
  },
  {
    id: "blush-royale",
    name: "Blush Royale",
    tagline: "Rosy, Creamy, Intoxicating",
    description: "A romantic masterpiece built on Bulgarian rose and creamy peony. Blush Royale is the scent of understated elegance — soft yet unforgettable, delicate yet commanding.",
    notes: { top: ["Pink Pepper", "Pear"], heart: ["Bulgarian Rose", "Peony"], base: ["Musk", "Cashmeran"] },
    price: 38.00,
    size: "10mL",
    image: blushRoyaleImg,
    category: "best-seller",
  },
  {
    id: "rouge-imperial",
    name: "Rouge Imperial",
    tagline: "Amber Glow & Radiant Sweetness",
    description: "A regal composition where amber meets saffron in a dance of warmth and radiance. Rouge Imperial is for those who wear their confidence like a crown.",
    notes: { top: ["Saffron", "Cinnamon"], heart: ["Oud", "Rose"], base: ["Amber", "Benzoin"] },
    price: 38.00,
    size: "10mL",
    image: rougeImperialImg,
    category: "best-seller",
  },
  {
    id: "cognac-veil",
    name: "Cognac Veil",
    tagline: "Boozy Amber, Smooth Spices",
    description: "A sophisticated blend inspired by aged cognac and warm spices. This rich, boozy fragrance opens with smooth plum and settles into a base of leather and amber.",
    notes: { top: ["Plum", "Cognac"], heart: ["Cinnamon", "Cardamom"], base: ["Leather", "Amber"] },
    price: 38.00,
    size: "10mL",
    image: cognacVeilImg,
    category: "best-seller",
  },
];
