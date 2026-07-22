Create Next.js App
        │
        ▼
Setup PWA
        │
        ▼
Setup Offline Architecture
        │
        ▼
Create App Shell
        │
        ▼
Develop Features
        │
        ▼
Update Service Worker
        │
        ▼
Test Offline
        │
        ▼
Deploy


===============================================================

A PWA consists of three main parts:
Next App
      +
Manifest
      +
Service Worker


=================================================================

Step 3 — Install PWA Support

The most common choice is next-pwa.

npm install next-pwa

Then configure it.

Create

next.config.ts

Example:

import withPWA from "next-pwa";

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

This tells Next.js to generate the service worker during production builds.

Step 4 — Create a Manifest

Create

public/manifest.json

Example:

{
  "name": "My Offline App",
  "short_name": "OfflineApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
Step 5 — Add Icons
public/icons/

icon-192.png
icon-512.png
Step 6 — Register Manifest in Layout
export const metadata = {
  manifest: "/manifest.json",
};

Now browsers know the app is installable.

Step 7 — Understand Caching

Not everything should be cached.

There are several caching strategies:

Static Assets
Logo

CSS

JS

Fonts

These rarely change.

Cache them permanently.

Images

Cache them.

If they're already downloaded once, they can load offline.

API Data

This depends on the type of data.

Possible strategies:

Cache First

Network First

Stale While Revalidate

Network Only

Examples:

Weather:

Network First

Blog posts:

Cache First

News:

Stale While Revalidate

Payments:

Network Only
Step 8 — Create an Offline Page
app/offline/page.tsx
export default function Offline() {
  return (
    <div>
      No internet connection.
    </div>
  );
}

The service worker can redirect users here when needed.

Step 9 — Build an App Shell

The app shell is the minimal UI that should always load, even without a network.

It typically includes:

Navbar

Sidebar

Header

Footer

Theme

Layout

These should be cached so users always see the application structure.

Step 10 — Develop Features

Now begin implementing features like:

Authentication

Dashboard

Products

Orders

Profile

Settings

At this stage, update the service worker whenever a feature introduces new resources or offline requirements.

Step 11 — Decide Offline Behavior for Each Feature

For each new feature, ask:

Should it work offline?

Examples:

Login
Internet required

No caching.

Dashboard
Show last cached version
Product List
Cache products
Notes App
Store locally

Sync later.

Chat
Queue messages

Sync when back online.

Step 12 — Local Storage Options

Offline-first apps often need client-side storage.

IndexedDB: Best for structured data, large storage, and offline-first apps.
Cache Storage: Used by service workers for caching requests and responses.
localStorage: Good only for small preferences (theme, language); synchronous and limited.

For most offline data, prefer IndexedDB.

Step 13 — Background Sync

When users are offline:

Create Todo

Instead of failing:

Save in IndexedDB

↓

Wait

↓

Internet returns

↓

Send to Server

This pattern improves reliability.

Step 14 — Test Offline

Use Chrome DevTools:

Network

↓

Offline

↓

Reload

Verify:

App shell loads.
Cached pages display.
Offline page appears when expected.
Data behaves according to your strategy.
Will You Need to Update the PWA Setup Later?

Yes, but not the basic setup. Here's what typically changes during development:

Stage	Changes Needed
Initial setup	Manifest, service worker, icons, app shell
Add new pages	Decide whether to cache them
Add API calls	Choose caching strategy (Network First, Cache First, etc.)
Add images/fonts	Include them in caching if needed
Add forms	Consider offline storage and background sync
Release updates	Increment cache version so users receive new assets

The manifest, basic service worker registration, and PWA configuration are usually stable. What evolves is the service worker's caching logic and offline behavior as features are added.

A Recommended Learning Path
Learn how service workers work (install, activate, fetch events).
Create a basic Next.js app.
Add the PWA manifest and installability.
Cache static assets (app shell).
Add an offline fallback page.
Learn runtime caching strategies.
Integrate IndexedDB for offline data.
Add background sync for queued actions.
Test offline scenarios throughout development.
Optimize update handling and cache versioning before production.