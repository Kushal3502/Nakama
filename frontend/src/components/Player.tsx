import { get } from "@/utils/api";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "./ui/button";

interface Episode {
  quality: string;
  url: string;
}

function Player({ episodeId }: { episodeId: string }) {
  const [url, setUrl] = useState<Episode>();
  const [sources, setSources] = useState<Episode[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const fetchEpisodeUrl = async (episodeId: string) => {
    setLoading(true);
    try {
      const response = await get(`/anime/episodes/${episodeId}`);
      const filteredSources = response.data.sources.filter(
        (source: Episode) => source.quality !== "backup"
      );
      setSources(filteredSources);

      // Select the highest quality source by default
      if (filteredSources.length > 0) {
        setUrl(filteredSources[filteredSources.length - 1]);
      }
      setError(null);
    } catch (error) {
      setError("Failed to load video. Please try again later.");
      console.error("Failed to fetch episode:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (episodeId) {
      fetchEpisodeUrl(episodeId);
      setPlaying(false);
    }
  }, [episodeId]);

  if (loading) {
    return (
      <div className="w-full max-w-[1280px] mx-auto space-y-4 md:space-y-6">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
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
    <div className="w-full max-w-[1280px] mx-auto space-y-4 md:space-y-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-red-500 font-medium">
            <p className="px-4 py-2 rounded bg-red-500/10 text-center">
              {error}
            </p>
          </div>
        ) : url ? (
          <ReactPlayer
            url={`https://gogoanime-and-hianime-proxy.vercel.app/${
              url.quality === "default" ? "hls-proxy" : "quality-proxy"
            }?url=${encodeURIComponent(url.url)}`}
            width="100%"
            height="100%"
            playing={playing}
            controls={true}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() =>
              setError("Video playback error. Please try another quality.")
            }
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">Loading video...</p>
          </div>
        )}
      </div>
      {sources && sources.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <p className="text-sm font-medium text-gray-400">Select quality:</p>
          <div className="flex flex-wrap gap-1">
            {sources.map((item, index) => (
              <Button
                key={index}
                onClick={() => setUrl(item)}
                size="sm"
                variant={url?.url === item.url ? "default" : "outline"}
                className="min-w-[60px]"
              >
                {item.quality}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
