import { useState } from "react";
import ProductList from "../components/inventory/ProductList";
import AddProductForm from "../components/inventory/AddProductForm";
import {
  PlusCircleIcon,
  MinusCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

const Inventory = () => {
  const [productOpen, SetProductOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <div className="bg-layersBackground rounded-lg">
        {productOpen ? (
          <div className="flex p-2 items-center text-center">
            <button
              onClick={() => SetProductOpen(!productOpen)}
              className="cursor-pointer"
            >
              <MinusCircleIcon size={32} />
            </button>
            <h1 className="font-bold">Close product List</h1>
          </div>
        ) : (
          <div className="flex p-2 items-center text-center">
            <button
              onClick={() => SetProductOpen(!productOpen)}
              className="cursor-pointer"
            >
              <PlusCircleIcon size={32} />
            </button>
            <h1 className="font-bold">Open product List</h1>
          </div>
        )}
        {productOpen && <ProductList />}
      </div>
      <div className="bg-layersBackground rounded-lg mt-2">
        {formOpen ? (
          <div className="flex p-2 items-center text-center">
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="cursor-pointer"
            >
              <MinusCircleIcon size={32} />
            </button>
            <h1 className="font-bold">Close form</h1>
          </div>
        ) : (
          <div className="flex p-2  items-center text-center">
            <button
              onClick={() => setFormOpen(!formOpen)}
              className="cursor-pointer"
            >
              <PlusCircleIcon size={32} />
            </button>
            <h1 className="font-bold">Open form</h1>
          </div>
        )}
        {formOpen && <AddProductForm />}
      </div>
    </div>
  );
};

export default Inventory;
