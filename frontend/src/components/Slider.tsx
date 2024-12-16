import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from ".";
import { Data } from "./AnimeCard";

interface SliderProps {
  animeList: Data[];
}

function Slider({ animeList }: SliderProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {animeList &&
          animeList.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/3 lg:basis-1/5 "
            >
              <Card data={item} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default Slider;
