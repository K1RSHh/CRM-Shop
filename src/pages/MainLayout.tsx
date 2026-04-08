import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden p-2 gap-2 rounded-2xl">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 bg-secondary rounded-2xl border border-border">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-400">
            <Outlet />
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
