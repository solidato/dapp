const pkg = require("./package.json");

// starts a command line process to get the git hash
const commitHash = require("child_process").execSync('git log --pretty=format:"%h" -n1').toString().trim();

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    LATEST_COMMIT_HASH: commitHash,
    PACKAGE_VERSION: pkg.version,
  },
});
