import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tool Contrast",
  description:
    "A web accessibility tool that evaluates the color contrast of elements on a webpage and provides a WCAG compliance score.",
  icons: {
    icon: "/logo.svg",
  },
  keywords: ["contrast", "WCAG"],
  openGraph: {
    title: "Tool Contrast",
    description:
      "A web accessibility tool that evaluates the color contrast of elements on a webpage and provides a WCAG compliance score.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tool Contrast",
    description: "A web accessibility tool that evaluates the color contrast of elements on a webpage and provides a WCAG compliance score.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
