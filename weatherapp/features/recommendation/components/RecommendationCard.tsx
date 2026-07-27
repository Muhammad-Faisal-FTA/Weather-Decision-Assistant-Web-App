"use client";
// weatherapp/features/recommendation/components/RecommendationCard.tsx — F-W07
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRecommendation } from "../hooks/useRecommendation";

const CATEGORY_LABEL: Record<string, string> = {
  activity: "🏃 Activity",
  clothing: "🧥 Clothing",
  wellness: "💧 Wellness",
  warning: "⚠️ Warning",
};

export function RecommendationCard() {
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <div className="w-full rounded-lg bg-surface p-6 text-sm text-text-secondary">
        <Link href="/login" className="text-accent hover:underline">
          Log in
        </Link>{" "}
        to get personalized recommendations.
      </div>
    );
  }

  return <RecommendationContent />;
}

function RecommendationContent() {
  const { data, isLoading, isError } = useRecommendation();

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-surface p-6 text-text-muted">
        Loading recommendations…
      </div>
    );
  }

  // Scoped failure — other dashboard cards render independently. [R-WA18]
  if (isError || !data) {
    return (
      <div className="w-full rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load recommendations right now.
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-surface p-6 shadow-card">
      <p className="mb-3 text-sm font-semibold text-text-primary">For You Today</p>

      <ul className="space-y-2">
        {data.recommendations.map((rec: { category: string; message: string }, i: number) => (
          <li key={i} className="text-sm text-text-secondary">
            <span className="text-text-primary">{CATEGORY_LABEL[rec.category] ?? rec.category}</span>
            {" — "}
            {rec.message}
          </li>
        ))}
      </ul>

      {/* Never let health-adjacent output read as medical advice. R-WA15 */}
      <p className="mt-4 text-xs text-text-muted">{data.disclaimer}</p>
    </div>
  );
}
