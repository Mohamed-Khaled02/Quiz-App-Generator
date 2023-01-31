import React from "react";
import FlashCard from "./FlashCard";

export default function FlashCardList({ Cards }) {
  return (
    <div className="card-grid">
      {Cards.map((card) => {
        return <FlashCard card={card} key={card.id} />;
      })}
    </div>
  );
}
