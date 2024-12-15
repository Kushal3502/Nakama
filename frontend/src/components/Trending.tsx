import { ANIME } from "@consumet/extensions";
import { useState, useEffect } from "react";
import { Card } from ".";
import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";

function Trending() {
  const provider = new ANIME.Gogoanime();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopAiring = async () => {
    try {
      setIsLoading(true);
      const response = await provider.fetchTopAiring();
      //@ts-ignore
      setData(response.results);
    } catch (error) {
      console.error("Failed to fetch trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAiring();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl font-semibold text-primary">
          Loading trending anime...
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="w-full flex justify-between items-center mb-4">
        <span className=" flex items-center gap-2">
          <h3 className=" text-xl">Top Airing</h3>
          <TrendingUp />
        </span>
        <Button
          size={"sm"}
          className=" bg-indigo-700 hover:bg-indigo-800 text-white"
        >
          View all
        </Button>
      </div>
      <div className=" grid grid-cols-5 gap-6">
        {data &&
          data
            .filter((_, index) => index < 10)
            .map((item, index) => <Card data={item} key={index} />)}
      </div>
    </div>
  );
}

export default Trending;
