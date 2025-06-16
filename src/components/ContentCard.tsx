import React from "react";

interface ContentCardProps {
  item: {
    id: string;
    title: string;
    creator: string;
    imagePath: string;
    pricingOption: number;
    price: number;
  };
}

const ContentCard: React.FC<{ item: ContentCardProps["item"] }> = ({
  item,
}) => {
  return (
    <div className="card">
      <img
        src={
          item.imagePath || "https://via.placeholder.com/220x150?text=No+Image"
        }
        alt={item.title}
      />
      <div className="card-content">
        <p>
          <strong>{item.title}</strong>
        </p>
        <p>By: {item.creator}</p>
        <p>
          Pricing:{" "}
          {item.pricingOption === 0
            ? "Paid"
            : item.pricingOption === 1
            ? "Free"
            : "View Only"}
        </p>
        {item.pricingOption === 0 && <p>Price: ${item.price}</p>}
      </div>
    </div>
  );
};

export default ContentCard;
