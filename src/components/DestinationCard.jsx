import React from "react";
import { Badge } from "@/components/ui/badge";

const DestinationCard = () => {
  return (
    <div className="flex border-2 border-gray-300 rounded-3xl p-4 flex-col">
      <img
        src="/src/assets/kampung-batik-laweyan.jpeg"
        alt=""
        className="w-[344px] h-[344px] border rounded-[30px]"
      />
      <div className="flex flex-col gap-4 mt-8 mb-6 font-montserrat">
        <h2 className="text-3xl font-bold text-neutral-black ">Nama Tempat</h2>
        <p className="text-xl text-neutral-grey font-semibold">Nama Daerah</p>
        <Badge variant="custom">Badge</Badge>
        <p className="text-xl text-neutral-dark-grey font-medium">
          Harga Rp <span className="font-semibold">25.000 - 50.000</span>
        </p>
        <p className="text-xl text-pr-blue-800 font-bold">
          84% Match dengan kamu
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
