import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin && email === "edusolo@admin.com" && password === "edusolo123") {
      navigate("/admin-dashboard");
    } else {
      navigate("/setup-profile");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
        <p className="text-muted-foreground text-left text-sm">
          Ayo login dan dapatkan rekomendasi tempat wisata terbaik untuk dirimu
          dengan berbasis AI!
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="contoh@email.com"
            className="h-12 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Kata Sandi</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Lupa kata sandi Anda?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            className="h-12 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Checkbox admin */}
        <div className="flex items-center gap-2">
          <input
            id="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="isAdmin" className="text-sm">
            Apakah Anda admin?
          </Label>
        </div>

        <Button type="submit" className="mt-2 h-12 w-full font-semibold rounded-xl">
          Masuk
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-neutral-bg text-muted-foreground relative z-10 px-2">
            Atau lanjutkan dengan
          </span>
        </div>
        <Button
          variant="outline"
          className="h-12 w-full rounded-full font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="!h-6 !w-6"
            viewBox="0 0 48 48"
          >
            {/* ...icon path Google... */}
          </svg>
          Masuk dengan Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <a href="#" className="underline underline-offset-4">
          Daftar
        </a>
      </div>
    </form>
  );
}
