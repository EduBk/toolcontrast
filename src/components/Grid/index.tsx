import React from "react";

import { cardsData } from "@/utils/CardsData";
import { CustomCard } from "@/components/Card";

export const MasonryGrid = () => {
  return (
    <div className="container mx-auto">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {cardsData.map((card, index) => (
          <CustomCard key={index} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};
