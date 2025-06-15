#!/bin/sh

# Detect and run based on the lockfile
if [ -f yarn.lock ]; then
  echo "Detected yarn.lock, running: yarn dev --hostname 0.0.0.0"
  yarn dev --hostname 0.0.0.0 --port 3000
elif [ -f package-lock.json ]; then
  echo "Detected package-lock.json, running: npm run dev --hostname 0.0.0.0"
  npm run dev -- --hostname 0.0.0.0 --port 3000
elif [ -f pnpm-lock.yaml ]; then
  echo "Detected pnpm-lock.yaml, running: pnpm dev --hostname 0.0.0.0"
  pnpm dev --hostname 0.0.0.0 --port 3000
else
  echo "No lockfile found, aborting."
  exit 1
fi
