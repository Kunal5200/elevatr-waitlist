import type { Metadata } from "next";
import { Inter, Mrs_Saint_Delafield } from "next/font/google";
import ThemeRegistry from "./components/ThemeRegistry";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Elevatr — Your digital career identity",
  description:
    "Quietly built, almost ready. A better way to work, create and grow. Elevatr is coming together.",
  icons: {
    icon: [
      {
        url: "/images/logo/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/images/logo/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/images/logo/favicon-light.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mrsSaintDelafield.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
