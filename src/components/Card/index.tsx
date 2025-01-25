import React from "react";
import { TypeCard } from "./TypeCard";

type card = {
  title?: string;
  description?: string;
  tags?: string[];
  buttons?: string;
  index: number
  type?: string;
};

const CustomCard = (card: card, index: number) => {
  return (
    <div key={index} className={`break-inside-avoid mb-4`}>
      <TypeCard {...card} />
    </div>
  );
};

export { CustomCard };
