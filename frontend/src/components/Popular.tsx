import { useState, useEffect } from "react";
import { Slider } from ".";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { get } from "@/utils/api";

function Popular() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopular = async () => {
    setIsLoading(true);
    try {
      const response = await get("/anime/popular");
      console.log(response);
      
      setData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch popular anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl font-semibold text-primary">
          Loading popular anime...
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="w-full flex justify-between items-center mb-4">
        <span className=" flex items-center gap-2">
          <h3 className=" text-xl">Popular</h3>
          <Star />
        </span>
        <Button
          size={"sm"}
          className=" bg-indigo-700 hover:bg-indigo-800 text-white"
          onClick={() => navigate("/home/popular")}
        >
          View all
        </Button>
      </div>
      <Slider animeList={data} />
    </div>
  );
}

export default Popular;
