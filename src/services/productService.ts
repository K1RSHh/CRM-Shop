import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  //   updateDoc,
  //   doc,
  //   query,
  //   where,
  //   increment,
} from "firebase/firestore";
import type { IProduct } from "../types/product";

const COLLECTION_NAME = "products";

export const productService = {
  getAllProducts: async (): Promise<IProduct[]> => {
    const productCollection = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(productCollection);

    return (await snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))) as IProduct[];
  },

  addProduct: async (product: Omit<IProduct, "id">): Promise<string> => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      createdAt: Date.now(),
    });

    return docRef.id;
  },
};
