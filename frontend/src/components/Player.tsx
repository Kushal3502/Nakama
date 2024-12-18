import { get } from "@/utils/api";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "./ui/button";

interface Episode {
  quality: string;
  url: string;
}

function Player({ episodeId }: { episodeId: string }) {
  const [url, setUrl] = useState<string>("");
  const [sources, setSources] = useState<Episode[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const fetchEpisodeUrl = async (episodeId: string) => {
    setLoading(true);
    try {
      const response = await get(`/anime/episodes/${episodeId}`);
      setSources(response.data.sources);
      setUrl(response.data.sources[1].url);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch episode:", error);
      setError("Failed to load video. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodeUrl(episodeId);
  }, [episodeId]);

  if (loading) {
    return (
      <div className="max-w-[1200px] w-full mx-auto p-4 space-y-6">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-8 w-16 bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full p-4 space-y-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-red-500 font-medium">
            <p className="px-4 py-2 rounded bg-red-500/10">{error}</p>
          </div>
        )}
        {url ? (
          <ReactPlayer
            url={`https://gogoanime-and-hianime-proxy.vercel.app/quality-proxy?url=${url}`}
            width="100%"
            height="100%"
            playing={playing}
            controls={true}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          <p>Loading</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-gray-400">Select quality:</p>
        <div className="flex gap-2">
          {sources &&
            sources
              .filter((_, index) => index > 0 && index < 4)
              .map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setUrl(item.url)}
                  size={"sm"}
                  variant={url === item.url ? "default" : "outline"}
                  className=""
                >
                  {item.quality}
                </Button>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Player;
