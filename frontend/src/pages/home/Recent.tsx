import { Card } from "@/components";
import { Button } from "@/components/ui/button";
import { ANIME } from "@consumet/extensions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TrendingUp } from "lucide-react";

function Recent() {
  const provider = new ANIME.Gogoanime();

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopAiring = async () => {
    try {
      setIsLoading(true);
      const response = await provider.fetchRecentEpisodes(page);
      console.log(response);

      if (page === 1) {
        //@ts-ignore
        setData(response.results);
      } else {
        //@ts-ignore
        setData((prev) => [...prev, ...response.results]);
      }
      // @ts-ignore
      setHasNextPage(response.hasNextPage);
    } catch (error) {
      console.error("Failed to fetch trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAiring();
  }, [page]);

  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex items-center justify-start gap-2">
        <h3 className=" text-3xl">Recently added</h3>
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

export default Recent;
