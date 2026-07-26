"use client";
// weatherapp/features/profile/components/ProfileForm.tsx — F-W06, F-W08
import { useState } from "react";

const HOBBIES = ["Running", "Cycling", "Hiking", "Photography", "Gardening", "Travel"];
const HEALTH = ["none", "sun_sensitivity", "respiratory", "heat_sensitivity", "cold_sensitivity"];

export interface ProfileValues {
  gender: string;
  ageRange: string;
  occupation: string;
  hobbies: string[];
  healthConsiderations: string[];
}

const DEFAULTS: ProfileValues = {
  gender: "prefer_not_to_say",
  ageRange: "18_29",
  occupation: "office",
  hobbies: [],
  healthConsiderations: [],
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface Props {
  initialValues?: Partial<ProfileValues>;
  onSubmit: (values: ProfileValues) => Promise<void>;
  submitLabel: string;
  onSkip?: () => void;
}

export function ProfileForm({ initialValues, onSubmit, submitLabel, onSkip }: Props) {
  const [values, setValues] = useState<ProfileValues>({ ...DEFAULTS, ...initialValues });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mandatory within the form even when the flow itself is
    // skippable — "none" counts as a valid answer. [R-WA03]
    if (values.healthConsiderations.length === 0) {
      setError('Select at least one option (choose "None" if not applicable).');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSubmit(values);
    } catch {
      setError("Couldn't save your profile. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const selectClass =
    "mb-4 w-full rounded-md border border-border bg-primary-dark px-3 py-2 text-text-primary";
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs capitalize ${
      active ? "border-accent bg-accent text-background" : "border-border text-text-secondary"
    }`;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-surface p-6 shadow-card">
      <label className="mb-1 block text-sm text-text-secondary">Gender</label>
      <select
        value={values.gender}
        onChange={(e) => setValues((v) => ({ ...v, gender: e.target.value }))}
        className={selectClass}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer_not_to_say">Prefer not to say</option>
      </select>

      <label className="mb-1 block text-sm text-text-secondary">Age range</label>
      <select
        value={values.ageRange}
        onChange={(e) => setValues((v) => ({ ...v, ageRange: e.target.value }))}
        className={selectClass}
      >
        <option value="under_18">Under 18</option>
        <option value="18_29">18–29</option>
        <option value="30_44">30–44</option>
        <option value="45_59">45–59</option>
        <option value="60_plus">60+</option>
      </select>

      <label className="mb-1 block text-sm text-text-secondary">Occupation</label>
      <select
        value={values.occupation}
        onChange={(e) => setValues((v) => ({ ...v, occupation: e.target.value }))}
        className={selectClass}
      >
        <option value="outdoor_labor">Outdoor labor</option>
        <option value="office">Office</option>
        <option value="student">Student</option>
        <option value="healthcare">Healthcare</option>
        <option value="other">Other</option>
      </select>

      <label className="mb-1 block text-sm text-text-secondary">Hobbies</label>
      <div className="mb-4 flex flex-wrap gap-2">
        {HOBBIES.map((h) => (
          <button
            type="button"
            key={h}
            onClick={() => setValues((v) => ({ ...v, hobbies: toggle(v.hobbies, h) }))}
            className={chip(values.hobbies.includes(h))}
          >
            {h}
          </button>
        ))}
      </div>

      <label className="mb-1 block text-sm text-text-secondary">Health considerations *</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {HEALTH.map((h) => (
          <button
            type="button"
            key={h}
            onClick={() =>
              setValues((v) => ({ ...v, healthConsiderations: toggle(v.healthConsiderations, h) }))
            }
            className={chip(values.healthConsiderations.includes(h))}
          >
            {h.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {error && <p className="mb-3 text-sm text-danger">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-md bg-accent py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 rounded-md border border-border py-2.5 text-sm text-text-secondary hover:text-text-primary"
          >
            Skip for now
          </button>
        )}
      </div>
    </form>
  );
}
