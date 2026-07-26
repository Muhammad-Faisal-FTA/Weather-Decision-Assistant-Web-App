"use client";
// weatherapp/app/register/page.tsx — R-WA01
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_RECOMMENDATION_SERVICE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed");
      return;
    }

    // Registration only creates the account — sign in immediately so
    // the user lands in onboarding already authenticated. [R-WA02]
    await signIn("credentials", { email, password, redirect: false });
    router.push("/onboarding");
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-card">
        <h1 className="mb-4 text-lg font-semibold text-text-primary">Create your account</h1>

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
          minLength={8}
          className="mb-4 w-full rounded-md border border-border bg-primary-dark px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {error && <p className="mb-3 text-sm text-danger">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-background hover:opacity-90"
        >
          Register
        </button>
      </form>
    </main>
  );
}
