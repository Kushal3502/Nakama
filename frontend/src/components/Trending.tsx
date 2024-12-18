import { useState, useEffect } from "react";
import { Slider } from ".";
import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { get } from "@/utils/api";

function Trending() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopAiring = async () => {
    setIsLoading(true);
    try {
      const response = await get("/anime/top-airing");
      console.log(response);

      setData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch top airing anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAiring();
  }, []);

  return (
    <div className="px-6 border-b border-gray-600 pb-8">
      <div className="w-full flex justify-between items-center mb-4">
        <span className=" flex items-center gap-2">
          <h3 className=" text-xl">Trending</h3>
          <TrendingUp />
        </span>
        <Button
          size={"sm"}
          className=" bg-indigo-700 hover:bg-indigo-800 text-white"
          onClick={() => navigate("/trending")}
        >
          View all
        </Button>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className=" bg-gray-700 animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-gray-700 animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-gray-700 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : (
        <Slider animeList={data} />
      )}
    </div>
  );
}

export default Trending;
