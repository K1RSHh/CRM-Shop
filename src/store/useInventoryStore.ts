import { productService } from "../services/productService";
import { create } from "zustand";
import type { IProduct } from "../types/product";

interface IInventoryStore {
  products: IProduct[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Omit<IProduct, "id">) => Promise<void>;
}

export const useInventoryStore = create<IInventoryStore>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    const data = await productService.getAllProducts();
    set({ products: data });
  },

  addProduct: async (newProductData) => {
    set((state: IInventoryStore) => ({
      products: [...state.products, { ...newProductData, id: "temp-id" }],
    }));
  },
}));
