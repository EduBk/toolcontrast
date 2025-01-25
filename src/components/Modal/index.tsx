"use client";
// import React from "react";
import { useChat } from "ai/react";
import * as React from "react";
import { createAgent } from "@/utils/CreateAgent";
import { useColors } from "@/context/ColorContext";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function Modal() {
  const { textColor, bgColor, updateTextColor, updateBgColor } = useColors();
  const agent = createAgent(textColor);

  async function getSuggestions() {
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ prompt: agent }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    }
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer"
          title="Suggestions"
          onClick={() => getSuggestions()}
        >
          💡
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Suggestions</DrawerTitle>
            <DrawerDescription>Hola mama</DrawerDescription>
          </DrawerHeader>
          <div>
            <h1>HOLA MAMA YA VINE</h1>
          </div>
          <DrawerFooter className="flex flex-row">
            <Button>Acept</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
