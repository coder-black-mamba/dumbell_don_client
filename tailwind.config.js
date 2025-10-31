// tailwind.config.js
module.exports = {
  darkMode: "class", // not strictly needed, but recommended
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"], // or just ["dark"] if you never want light
    darkTheme: "dark", // default dark theme
  },
};
