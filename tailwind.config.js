/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      /* ---------------- COLORS ---------------- */

      colors: {
        primary: "#1B71E2",
        primaryDark: "#1557ad",
        accent: "#C5A059", // Sovereign Gold
        accentDark: "#B08A44",

        background: "#FDFDF5", // Parchment White
        surface: "#FFFFFF",

        textPrimary: "#1E293B",
        textSecondary: "#64748B",

        border: "#E2E8F0",

        success: "#15803D",
        warning: "#B45309",
        error: "#B91C1C",
      },

      /* ---------------- FONT SIZE ---------------- */

      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },

      /* ---------------- BORDER RADIUS ---------------- */

      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },

      /* ---------------- SPACING ---------------- */

      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
      },

      /* ---------------- SHADOWS ---------------- */

      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.06)",
        modal: "0 10px 25px rgba(0,0,0,0.15)",
      },

      /* ---------------- BORDER WIDTH ---------------- */

      borderWidth: {
        DEFAULT: "1px",
        thin: "0.5px",
        thick: "2px",
      },

      /* ---------------- MAX WIDTH ---------------- */

      maxWidth: {
        screen: "640px",
      },
    },
  },

  plugins: [],
};
