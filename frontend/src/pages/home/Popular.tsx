import { Card } from "@/components";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { get } from "@/utils/api";

function Popular() {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopular = async () => {
    try {
      setIsLoading(true);
      const response = await await get(`/anime/popular?page=${page}`);
      console.log(response);

      if (page === 1) {
        //@ts-ignore
        setData(response.data.results);
      } else {
        //@ts-ignore
        setData((prev) => [...prev, ...response.data.results]);
      }
      // @ts-ignore
      setHasNextPage(response.data.hasNextPage);
    } catch (error) {
      console.error("Failed to fetch trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, [page]);

  return (
    <div className="h-screen flex flex-col gap-4">
      <div className=" flex items-center justify-start gap-2">
        <h3 className=" text-3xl">Popular</h3>
        <Star />
      </div>
      <div className=" grid md:grid-cols-6 grid-cols-3 md:gap-6 gap-3">
        {data && data.map((item, index) => <Card data={item} key={index} />)}
      </div>
      <div className=" flex justify-center">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800 text-white"
          onClick={() => setPage(page + 1)}
          disabled={!hasNextPage || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : (
            "Load more"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Popular;
