import React from "react";

interface Data {
  id: string;
  image: string;
  title: string;
  url: string;
}

interface CardProp {
  data: Data;
}

function Card({ data }: CardProp) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer h-72">
      <div className="relative">
        <img
          src={data.image}
          alt={data.title}
          className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      <div className="absolute bottom-0 p-4 bg-black/50 backdrop-blur-md w-full">
        <h3 className="text-white text-lg font-semibold truncate group-hover:text-blue-400 transition-colors duration-200">
          {data.title}
        </h3>
      </div>
    </div>
  );
}

export default Card;
