"use client";

import React, { useState, useRef, useEffect, useCallback, FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useColors } from "@/context/ColorContext";

// Types for color representations
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface ColorPickerProps {
  isTextColor?: boolean;
}

export const ColorPicker: FC<ColorPickerProps> = ({ isTextColor = false }) => {
  const { textColor, bgColor, updateTextColor, updateBgColor } = useColors();
  const [color, setColor] = useState<HSV>({ h: 0, s: 100, v: 100 });
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [isDraggingColor, setIsDraggingColor] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  const colorAreaRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);

  // Memoized utility functions
  const rgbToHex = useCallback((r: number, g: number, b: number): string => {
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }, []);

  const hexToRgb = useCallback((hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }, []);

  const hsvToRgb = useCallback((h: number, s: number, v: number): RGB => {
    h *= 360;
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else if (h >= 300 && h <= 360) [r, g, b] = [c, 0, x];

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }, []);

  // Initialize color from context
  useEffect(() => {
    const currentColor = isTextColor ? textColor : bgColor;
    const rgbColor = hexToRgb(currentColor);
    if (rgbColor) {
      setRgb(rgbColor);
    }
  }, [isTextColor, textColor, bgColor, hexToRgb]);

  // Handlers with memoization
  const updateColor = useCallback(
    (newRgb: RGB) => {
      const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      if (isTextColor) {
        updateTextColor(hexColor);
      } else {
        updateBgColor(hexColor);
      }
      setRgb(newRgb);
    },
    [isTextColor, updateTextColor, updateBgColor, rgbToHex]
  );

  const handleColorAreaMove = useCallback(
    (e: MouseEvent) => {
      if (!colorAreaRef.current) return;

      const rect = colorAreaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      setColor((prev) => {
        const newColor = {
          ...prev,
          s: Math.round(x * 100),
          v: Math.round((1 - y) * 100),
        };
        const newRgb = hsvToRgb(newColor.h / 360, newColor.s, newColor.v);
        updateColor(newRgb);
        return newColor;
      });
    },
    [colorAreaRef, hsvToRgb, updateColor]
  );

  const handleHueMove = useCallback(
    (e: MouseEvent) => {
      if (!hueBarRef.current) return;

      const rect = hueBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      setColor((prev) => {
        const newColor = {
          ...prev,
          h: Math.round(x * 360),
        };
        const newRgb = hsvToRgb(newColor.h / 360, newColor.s, newColor.v);
        updateColor(newRgb);
        return newColor;
      });
    },
    [hueBarRef, hsvToRgb, updateColor]
  );

  // Event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingColor) handleColorAreaMove(e);
      if (isDraggingHue) handleHueMove(e);
    };

    const handleMouseUp = () => {
      setIsDraggingColor(false);
      setIsDraggingHue(false);
    };

    if (isDraggingColor || isDraggingHue) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingColor, isDraggingHue, handleColorAreaMove, handleHueMove]);

  // RGB input change handler
  const handleRgbChange = useCallback(
    (channel: keyof RGB, value: string) => {
      const newValue = Math.max(0, Math.min(255, parseInt(value) || 0));
      const newRgb = { ...rgb, [channel]: newValue };
      updateColor(newRgb);
    },
    [rgb, updateColor]
  );

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <div className="flex items-center gap-1 p-2">
          <div
            className="w-6 h-6 rounded-xl border"
            style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
          />
          <span>
            #{rgb.r.toString(16).padStart(2, "0")}
            {rgb.g.toString(16).padStart(2, "0")}
            {rgb.b.toString(16).padStart(2, "0")}
          </span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Image
                className="dark:invert"
                src="https://img.icons8.com/color/48/color-wheel-2.png"
                alt="color-wheel-2"
                width={35}
                height={35}
                priority
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <span className="font-bold">
              {isTextColor ? "Text color" : "Background color"}
            </span>
            <div className="space-y-4">
              <div
                ref={colorAreaRef}
                className="relative w-full h-48 rounded-lg cursor-crosshair"
                style={{
                  backgroundColor: `hsl(${color.h}, 100%, 50%)`,
                  backgroundImage:
                    "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
                }}
                onMouseDown={(e) => {
                  setIsDraggingColor(true);
                  handleColorAreaMove(e.nativeEvent);
                }}
              >
                <div
                  className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${color.s}%`,
                    top: `${100 - color.v}%`,
                    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                  }}
                />
              </div>

              <div
                ref={hueBarRef}
                className="relative h-4 rounded-lg cursor-pointer"
                style={{
                  background:
                    "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                }}
                onMouseDown={(e) => {
                  setIsDraggingHue(true);
                  handleHueMove(e.nativeEvent);
                }}
              >
                <div
                  className="absolute w-4 h-full border-2 border-white rounded-sm -translate-x-1/2"
                  style={{
                    left: `${(color.h / 360) * 100}%`,
                    backgroundColor: `hsl(${color.h}, 100%, 50%)`,
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["r", "g", "b"] as (keyof RGB)[]).map((channel) => (
                  <div key={channel}>
                    <Label>{channel.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={rgb[channel]}
                      onChange={(e) => handleRgbChange(channel, e.target.value)}
                      min="0"
                      max="255"
                    />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
