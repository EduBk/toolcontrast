"use client"
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { ColorProvider } from "@/context/ColorContext";

export default function Home() {
  return (
    <>
      <ColorProvider>
        <Header />
        <Layout />
      </ColorProvider>
    </>
  );
}
