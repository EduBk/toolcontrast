import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaCloudArrowUp } from "react-icons/fa6";

import { useColors } from "@/context/ColorContext";
import { useState } from "react";

type TypoeCardProps = {
  type?: string;
  title?: string;
  description?: string; // Hacerlo opcional
  tags?: string[];
  buttons?: string; // Hacerlo opcional
};

export const TypeCard: React.FC<TypoeCardProps> = ({
  type,
  title,
  description,
  tags,
  buttons,
}) => {
  const { textColor, bgColor } = useColors();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  

  // Estilos dinámicos para los botones
  const getButtonStyles = (type: string) => {
    switch (type) {
      case "cancel":
      case "view":
      case "try":
        return {
          style: {
            backgroundColor: textColor,
            color: bgColor,
          },
        };
    }
  };

  switch (type) {
    case "progress":
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle
                className="text-xl font-bold"
                style={{ color: textColor }}
              >
                {title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base" style={{ color: textColor }}>
              <div className="w-full bg-gray-400 rounded-full dark:bg-gray-700">
                <div
                  className={`text-xs font-medium text-center p-0.5 leading-none rounded-full w-3/6`}
                  style={{
                    backgroundColor: textColor,
                    color: bgColor,
                  }}
                >
                  {" "}
                  45%
                </div>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      );

    case "profile":
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <div className="relative">
            <div className="w-full h-32 p-3">
              <img
                src="https://as2.ftcdn.net/jpg/04/19/26/97/1000_F_419269782_9LsP3TQndMVnZ2j3ZhTPhMjaqQpFAth9.jpg"
                alt="Banner"
                className="w-full h-full object-cover opacity-90 rounded-xl"
              />
            </div>
            <div className="absolute -bottom-12 left-4">
              <div className="w-28 h-28 rounded-full">
                <img
                  src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <CardContent className="pt-16 pb-6 px-4">
            <h2
              className="text-2xl font-bold mb-1"
              style={{
                color: textColor,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                color: textColor,
              }}
            >
              {description}
            </p>
          </CardContent>
        </Card>
      );

    case "storage":
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <CardHeader>
            <div
              className="w-7 h-7 rounded flex justify-center cursor-pointer"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              ...
            </div>
            <div className="flex items-center gap-2">
              <CardTitle
                className="text-xl flex justify-center items-center w-full"
                style={{ color: textColor }}
              >
                <div
                  className="flex w-20 h-20 justify-center items-center rounded-full"
                  style={{
                    backgroundColor: "rgba(96, 96, 96, 0.25)",
                  }}
                >
                  <FaCloudArrowUp className="text-4xl" />
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle
              className="text-xl w-full flex justify-center mb-2 font-bold"
              style={{ color: textColor }}
            >
              {title}
            </CardTitle>
            <CardDescription
              className="text-base w-full flex justify-center"
              style={{ color: textColor }}
            >
              {description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 pt-4">
            <div className="w-full flex justify-between">
              <span>45Gb</span>
              <span>100Gb</span>
            </div>
            <div className="w-full bg-gray-400 rounded-full dark:bg-gray-700">
              <div
                className={`text-xs font-medium text-center p-0.5 leading-none rounded-full w-3/6 h-2`}
                style={{
                  backgroundColor: textColor,
                  color: bgColor,
                }}
              >
                {" "}
              </div>
            </div>
          </CardFooter>
        </Card>
      );

    case "chart":
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill={textColor} radius={4} />
                <Bar dataKey="mobile" fill={textColor} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              {description}
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      );

    case "calendar":
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <CardHeader>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className={cn("rounded-md flex justify-center")}
              modifiersClassNames={{
                selected: `bg-slate-300 text-white`,
              }}
            />
          </CardHeader>
        </Card>
      );

    default:
      return (
        <Card
          className={cn(
            "hover:shadow-lg transition-shadow duration-200 rounded-2xl"
          )}
          style={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  className="text-sm"
                  style={{
                    backgroundColor: `${bgColor}33`,
                    color: textColor,
                    borderColor: textColor,
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CardTitle
                className="text-xl font-bold"
                style={{ color: textColor }}
              >
                {title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base" style={{ color: textColor }}>
              {description}
            </CardDescription>
          </CardContent>
          {buttons && (
            <CardFooter className="flex flex-wrap gap-2 pt-4">
              <div className="flex gap-2 w-full">
                {buttons.split(" ").map((action) => {
                  const buttonStyles = getButtonStyles(action);
                  switch (action) {
                    case "cancel":
                      return (
                        <Button key={action} style={buttonStyles?.style}>
                          Cancel
                        </Button>
                      );
                    case "view":
                      return (
                        <Button key={action} style={buttonStyles?.style}>
                          View
                        </Button>
                      );
                    case "try":
                      return (
                        <Button
                          key={action}
                          className="w-full"
                          style={buttonStyles?.style}
                        >
                          Try Free
                        </Button>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </CardFooter>
          )}
        </Card>
      );
  }
};
