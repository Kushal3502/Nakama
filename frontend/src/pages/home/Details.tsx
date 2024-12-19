import { Player } from "@/components";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { get, post } from "@/utils/api";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";

interface Episode {
  id: string;
  number: number;
}

export interface Data {
  description: string;
  genres: string[];
  image: string;
  releaseDate: string;
  status: string;
  title: string;
  totalEpisodes: number;
  episodes: Episode[];
}

function Details() {
  const { id } = useParams();
  const [data, setData] = useState<Data | undefined>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currEpisode, setCurrEpisode] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const fetchAnimeDetails = async () => {
    setIsLoading(true);
    try {
      const response = await get(`/anime/${id}`);
      console.log(response.data);
      setData(response.data);
      setEpisodes(response.data.episodes);
      setCurrEpisode(response.data.episodes[0].id);
    } catch (error) {
      console.error("Failed to fetch anime details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await get("/users/likes");
      const likes = response.data;
      setIsLiked(likes.some((like: any) => like.anime === id));
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  };

  const handleLike = async () => {
    try {
      const respons = await post(`/users/like/${id}`);
      console.log(respons);
      toast.success(isLiked ? "Like removed" : "Liked");
      setIsLiked(respons.liked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
    checkIfLiked();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    data && (
      <div className="relative min-h-screen w-full pb-8">
        <div className="fixed inset-0 w-full h-full">
          <img
            src={data.image}
            className="w-full h-full object-cover blur-md opacity-20"
            alt="background"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {currEpisode && <Player episodeId={currEpisode} />}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">
                  Episodes
                </h3>
                <ScrollArea className="h-[300px] lg:h-[400px] rounded-lg border border-gray-800/60 bg-black/30 backdrop-blur-sm p-4 lg:p-6">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {episodes.map((item) => (
                      <Button
                        key={item.number}
                        variant={
                          currEpisode === item.id ? "default" : "outline"
                        }
                        size={"sm"}
                        onClick={() => setCurrEpisode(item.id)}
                        className={` transition-all duration-200 ${
                          currEpisode === item.id
                            ? "shadow-lg shadow-primary/20 scale-105"
                            : "hover:bg-primary/20"
                        }`}
                      >
                        {item.number}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="lg:w-[400px]">
              <div className="w-full mx-auto flex items-center justify-between px-2 mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-100 tracking-tight">
                  {data.title}
                </h1>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
              <div className="space-y-6 bg-black/30 backdrop-blur-sm p-4 lg:p-6 rounded-lg border border-gray-800/60">
                <div className="flex gap-4 lg:gap-6">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-28 lg:w-32 h-40 lg:h-44 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-100 mb-4">
                      Details
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-medium">
                          Status:
                        </span>
                        <span className="text-primary font-semibold">
                          {data.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-medium">
                          Release:
                        </span>
                        <span>{data.releaseDate}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-medium">
                          Episodes:
                        </span>
                        <span>{data.totalEpisodes}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-medium">
                          Genres:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {data.genres.map((genre, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/20 rounded-full text-xs font-medium hover:bg-primary/30 transition-colors"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Details;
