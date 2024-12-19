import { Player } from "@/components";
import { Button } from "@/components/ui/button";
import { ANIME } from "@consumet/extensions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Data {
  id: string;
  number: number;
  url: string;
}

function Episodes() {
  const provider = new ANIME.Gogoanime();
  const { id } = useParams();
  const [data, setData] = useState<Data[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<string>("");

  const fetchEpisodes = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await provider.fetchAnimeInfo(id);
        // @ts-ignore
        setData(response.episodes);
        // @ts-ignore
        setCurrentEpisode(response.episodes[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch anime details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [id]);

  return (
    <div className="flex gap-4 p-4">
      {/* Video Player Section */}
      <div className="w-3/4 bg-gray-900 rounded-lg">
        {currentEpisode && (
          // @ts-ignore
          <Player id={currentEpisode} />
        )}
      </div>
      {/* Episodes List Section */}
      <div className="w-1/4 bg-gray-800 rounded-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Episodes</h2>
        <div className="grid gap-2 grid-cols-5">
          {isLoading ? (
            <div className="text-white">Loading episodes...</div>
          ) : (
            data &&
            data.map((episode) => (
              <Button
                key={episode.id}
                onClick={() => setCurrentEpisode(episode.id)}
                className={`p-2 rounded-md text-left ${
                  currentEpisode === episode.url
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {episode.number}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Episodes;
