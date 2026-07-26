"use client";
// weatherapp/app/onboarding/page.tsx — F-W06, R-WA02, R-WA03
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveProfile } from "@/lib/recommendationClient";
import { ProfileForm, ProfileValues } from "@/features/profile/components/ProfileForm";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubmit(values: ProfileValues) {
    const token = (session as { backendToken?: string })?.backendToken;
    await saveProfile(token!, values);
    router.push("/");
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center px-6 py-12">
      <div className="mb-5 w-full max-w-lg">
        <h1 className="mb-1 text-lg font-semibold text-text-primary">Tell us about you</h1>
        <p className="text-sm text-text-secondary">
          Helps personalize your recommendations. You can skip and do this later.
        </p>
      </div>
      <ProfileForm submitLabel="Save" onSubmit={handleSubmit} onSkip={() => router.push("/")} />
    </main>
  );
}
