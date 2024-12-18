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
    <div className="px-6 border-b border-gray-600 pb-8">
      <div className="w-full flex justify-between items-center mb-4">
        <span className=" flex items-center gap-2">
          <h3 className=" text-xl">Trending</h3>
          <TrendingUp />
        </span>
        <Button
          size={"sm"}
          className=" bg-indigo-700 hover:bg-indigo-800 text-white"
          onClick={() => navigate("/home/trending")}
        >
          View all
        </Button>
      </div>
      <Slider animeList={data}/>
    </div>
  );
}

export default Trending;
