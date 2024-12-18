import { Link } from "react-router";

export interface Data {
  id: string;
  image: string;
  title: string;
  url: string;
}

export interface CardProp {
  data: Data;
}

function Card({ data }: CardProp) {
  return (
    <Link
      to={`/info/${data.id}`}
      className="relative group overflow-hidden shadow-lg cursor-pointer rounded-xl "
    >
      <div className="aspect-w-2 aspect-h-3">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-medium line-clamp-2 text-shadow-lg">
          {data.title}
        </h3>
      </div>
    </Link>
  );
}

export default Card;
