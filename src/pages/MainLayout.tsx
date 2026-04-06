import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";
import { Route, Routes } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";

const MainLayout = () => {
  return (
    <div className="flex h-full rounded-2xl bg-background">
      {" "}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 3. Місце для сторінок */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto">
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
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
