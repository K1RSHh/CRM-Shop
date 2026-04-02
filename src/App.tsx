import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

function App() {
  return (
    <div className="h-full">
      <Sidebar />
      <Routes>
        <Route path="/" element={<></>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
