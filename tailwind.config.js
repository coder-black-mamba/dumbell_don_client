const daisyui = require("daisyui");

module.exports = {
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563eb",
          secondary: "#64748b",
          accent: "#22c55e",
          neutral: "#1e293b",
          "base-100": "#ffffff",
          success: "#16a34a",
          info: "#0ea5e9",
          warning: "#facc15",
          error: "#dc2626",
        },
      },
    ],
  },
};
