module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(220, 13%, 91%)",
        input: "hsl(220, 13%, 91%)",
        ring: "hsl(217, 91%, 60%)",
        background: "hsl(0, 0%, 98%)",
        foreground: "hsl(220, 9%, 20%)",
        primary: {
          DEFAULT: "hsl(262, 83%, 58%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(217, 91%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        tertiary: {
          DEFAULT: "hsl(280, 100%, 70%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 98%)",
          foreground: "hsl(210, 15%, 10%)",
        },
        success: {
          DEFAULT: "hsl(142, 71%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(240, 5%, 96%)",
          foreground: "hsl(240, 4%, 46%)",
        },
        accent: {
          DEFAULT: "hsl(240, 5%, 96%)",
          foreground: "hsl(240, 10%, 4%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(210, 25%, 12%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(240, 10%, 4%)",
        },
        gray: {
          50: "hsl(210, 25%, 98%)",
          100: "hsl(210, 20%, 95%)",
          200: "hsl(210, 15%, 90%)",
          300: "hsl(210, 10%, 82%)",
          400: "hsl(210, 9%, 70%)",
          500: "hsl(210, 8%, 55%)",
          600: "hsl(210, 10%, 40%)",
          700: "hsl(210, 12%, 28%)",
          800: "hsl(210, 15%, 18%)",
          900: "hsl(210, 20%, 10%)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        "sans-alt": ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        h1: ["2.618rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "500" }],
        h2: ["1.618rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "300" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "300" }],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(217, 91%, 60%))',
        'gradient-2': 'linear-gradient(135deg, hsl(280, 100%, 70%), hsl(262, 83%, 58%))',
        'gradient-3': 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(142, 71%, 45%))',
        'button-border-gradient': 'linear-gradient(90deg, hsla(262, 83%, 58%, 1), hsla(217, 91%, 60%, 0.7))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
