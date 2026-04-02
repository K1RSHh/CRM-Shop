export type TCategory = "Noodles" | "Snacks" | "Drinks" | "Sweets" | "Sauces";
export type TOrigin = "Korea" | "Japan" | "China" | "Thailand" | "Taiwan";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number; // Quantity in stock
  category: TCategory;
  origin: TOrigin;
  imageUrl?: string; // Link to a photo from Firebase Storage
  createdAt: number; // Timestamp for sorting
  isSpicy?: boolean;
}
