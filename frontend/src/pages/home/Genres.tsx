import { get } from "@/utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Genre {
  id: string;
  title: string;
}

function Genres() {
  const [data, setData] = useState<Genre[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopular = async () => {
    try {
      setIsLoading(true);
      const response = await await get("/anime/genres");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch trending anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search by genre</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {data?.map((genre) => (
          <Link
            key={genre.id}
            to={`/genre?query=${genre.id}`}
            className="bg-transparent border-2 border-indigo-600 hover:border-purple-600 text-gray-300 rounded-lg p-4 text-center transition-all duration-300"
          >
            <span className="text-lg font-medium">{genre.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Genres;
