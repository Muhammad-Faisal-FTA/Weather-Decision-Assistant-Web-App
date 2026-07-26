"use client";
// weatherapp/app/login/page.tsx — R-WA01
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/");
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-card">
        <h1 className="mb-4 text-lg font-semibold text-text-primary">Log in</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-3 w-full rounded-md border border-border bg-primary-dark px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full rounded-md border border-border bg-primary-dark px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {error && <p className="mb-3 text-sm text-danger">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-background hover:opacity-90"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
