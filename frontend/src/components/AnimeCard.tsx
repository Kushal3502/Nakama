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
    <div className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg line-clamp-2">
          {data.title}
        </h3>
      </div>
    </div>
  );
}

export default Card;