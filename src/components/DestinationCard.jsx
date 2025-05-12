import React from "react";

import DestinationCardContent from "./DestinationCardContent.jsx";

const DestinationCard = ({ variant = "col" }) => {
  const spacing = variant === "col" ? "mt-8 mb-6" : "mt-3 mb-3 ml-7 mr-3.5";
  const imgStyle =
    variant === "col"
      ? "w-[344px] h-[344px] rounded-[30px]"
      : "w-[212px] h-[212px] rounded-[16px]";
  const cardStyle = variant === "col" ? "flex-col p-4 max-w-[376px] " : "flex-row p-2.5 min-w-lg w-[550px] max-w-[550px]";
  return (
    <div
      className={`flex bg-white rounded-3xl max-w-1 ${cardStyle}`}
    >
      <img
        src="/src/assets/images/kampung-batik-laweyan.jpeg"
        alt=""
        className={imgStyle}
      />
      <div className={spacing}>
        <DestinationCardContent variant={variant} />
      </div>
    </div>
  );
};

export default DestinationCard;
