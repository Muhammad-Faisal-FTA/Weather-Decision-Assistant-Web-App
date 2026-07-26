// weatherapp/lib/recommendationClient.ts
const BASE = process.env.NEXT_PUBLIC_RECOMMENDATION_SERVICE_URL;

export async function saveProfile(token: string, data: object) {
  const res = await fetch(`${BASE}/api/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Couldn't save profile");
  return res.json();
}

export async function getProfile(token: string) {
  const res = await fetch(`${BASE}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Couldn't load profile");
  return res.json();
}
