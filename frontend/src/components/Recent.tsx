import { useState, useEffect } from "react";
import { Slider } from ".";
import { Button } from "./ui/button";
import { Timer } from "lucide-react";
import { useNavigate } from "react-router";
import { get } from "@/utils/api";

function Recent() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentlyAdded = async () => {
    setIsLoading(true);
    try {
      const response = await get("/anime/recently-added");
      console.log(response);

      setData(response.data.results);
    } catch (error) {
      console.error("Failed to fetch recent anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyAdded();
  }, []);

  return (
    <div className="px-6 border-b border-gray-600 pb-8">
      <div className="w-full flex justify-between items-center mb-4">
        <span className=" flex items-center gap-2">
          <h3 className=" text-xl">Recently added</h3>
          <Timer />
        </span>
        <Button
          size={"sm"}
          className=" bg-indigo-700 hover:bg-indigo-800 text-white"
          onClick={() => navigate("/recent")}
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

export default Recent;
