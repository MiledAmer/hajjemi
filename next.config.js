/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Lets the dev server be reached from a phone on the same LAN/hotspot
  // (e.g. testing over a mobile hotspot at 192.168.49.x) without the
  // cross-origin dev warning. Has no effect in production builds.
  allowedDevOrigins: ["192.168.1.0/24", "192.168.49.0/24"],
};

export default config;
