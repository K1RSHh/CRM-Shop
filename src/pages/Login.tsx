import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const error = err as FirebaseError;

      console.log(error.code);

      if (error.code === "auth/invalid-credential") {
        toast.error("Неправильна пошта або пароль");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="rounded-2xl w-full h-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-border shadow-sm">
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">
          CRM Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">
              Email
            </label>
            <Input
              type="email"
              placeholder="admin@shop.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/50 text-white py-6 cursor-pointer"
          >
            Login in panel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
