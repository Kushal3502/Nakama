import { Button } from "@/components/ui/button";
import { ANIME } from "@consumet/extensions";
import { Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

interface Data {
  description: string;
  genres: [];
  image: string;
  releaseDate: string;
  status: string;
  title: string;
  totalEpisodes: number;
}

function Details() {
  const provider = new ANIME.Gogoanime();
  const { id } = useParams();
  const [data, setData] = useState<Data | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnimeDetails = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await provider.fetchAnimeInfo(id);
        // @ts-ignore
        setData(response);
      }
    } catch (error) {
      console.error("Failed to fetch anime details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl font-semibold text-primary">
          Loading anime details...
        </div>
      </div>
    );
  }

  return (
    data && (
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={data.image}
            className="w-full h-full object-cover blur-sm opacity-10"
            alt="background"
          />
        </div>
        <div className=" mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src={data.image}
                alt={data.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold text-primary mb-4">
                {data.title}
              </h1>
              <div className="flex gap-4 mb-6">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full">
                  <Play /> Watch now
                </Button>
                <Button className="bg-indigo-300 hover:bg-indigo-400 text-white px-6 py-2 rounded-full">
                  <Heart /> Add to Favourites
                </Button>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-justify">
                {data.description}
              </p>
              <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-primary">
                      Release Date:
                    </span>
                    {data.releaseDate}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-primary">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        data.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {data.status}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-primary">
                      Episodes:
                    </span>
                    {data.totalEpisodes}
                  </li>
                </ul>
                <div className="pt-4">
                  <p className="font-semibold text-primary mb-3">Genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.genres.map((item, index) => (
                      <Button
                        variant={"outline"}
                        key={index}
                        className="bg-indigo-900 hover:bg-indigo-950 rounded-full text-sm px-4 py-1"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
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
