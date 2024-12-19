import { Card } from "@/components";
import { useState, useEffect } from "react";
import { get } from "@/utils/api";
import { Data } from "./Details";

function Likes() {
  const [data, setData] = useState<Data[]>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchLikes = async () => {
    try {
      setIsLoading(true);
      const response = await get(`/users/likes`);
      const likes = await Promise.all(
        // @ts-ignore
        response.data.map(async (item) => {
          const animeResponse = await get(`/anime/${item.anime}`);
          return {
            id: item.anime,
            image: animeResponse.data.image,
            title: animeResponse.data.title,
          };
        })
      );

      setData(likes);
    } catch (error) {
      console.error("Failed to fetch trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col gap-4">
      <div className=" flex items-center justify-start gap-2">
        <h3 className=" text-3xl">Favourites</h3>
      </div>
      <div className=" grid md:grid-cols-6 grid-cols-3 md:gap-6 gap-3">
        {data &&
          data.map((item, index) => (
            // @ts-ignore
            <Card data={item} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Likes;
