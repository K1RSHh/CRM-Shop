import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { IProduct } from "../types/product";
import type { FirebaseError } from "firebase/app";
import { toast } from "sonner";

const Inventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<IProduct, "id" | "createdAt">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "Noodles",
    origin: "Korea",
    isSpicy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newId = await productService.addProduct({
        ...formData,
        createdAt: Date.now(),
      });
      console.log("add new product", newId);
      toast.success("The product has been successfully added!");
    } catch (err) {
      const error = err as FirebaseError;
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Oh, something went wrong:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Product loading...</div>;

  return (
    <div>
      <h1>Product List</h1>

      {products.length === 0 ? (
        <p>The warehouse is currently empty.</p>
      ) : (
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              {item.name} — {item.stock} pieces.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
