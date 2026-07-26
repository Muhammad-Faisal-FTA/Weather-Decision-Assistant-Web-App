"use client";
// weatherapp/app/profile/page.tsx — F-W08, R-WA04
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProfile, saveProfile } from "@/lib/recommendationClient";
import { ProfileForm, ProfileValues } from "@/features/profile/components/ProfileForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [initial, setInitial] = useState<Partial<ProfileValues> | undefined>();
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = (session as { backendToken?: string })?.backendToken;
    if (status !== "authenticated" || !token) return;

    getProfile(token)
      .then((data) => setInitial(data ?? {}))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [session, status]);

  async function handleSubmit(values: ProfileValues) {
    const token = (session as { backendToken?: string })?.backendToken;
    await saveProfile(token!, values);
    router.push("/");
  }

  if (status === "loading" || loading) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-6 py-12 text-text-muted">
        Loading your profile…
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-6 py-12 text-text-secondary">
        Log in to view your profile.
      </main>
    );
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center px-6 py-12">
      <div className="mb-5 w-full max-w-lg">
        <h1 className="text-lg font-semibold text-text-primary">Your profile</h1>
        {loadError && (
          // Scoped error — form still renders with defaults. R-WA18
          <p className="mt-1 text-sm text-danger">Couldn&apos;t load your saved profile.</p>
        )}
      </div>
      <ProfileForm initialValues={initial} submitLabel="Save changes" onSubmit={handleSubmit} />
    </main>
  );
}
