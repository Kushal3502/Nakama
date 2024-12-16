import { ANIME } from "@consumet/extensions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Data {
  id: string;
  number: number;
  url: string;
}

interface EpisodeProp {
  episodes: Data[];
}

function Episodes() {
  const provider = new ANIME.Gogoanime();
  const { id } = useParams();
  const [data, setData] = useState<EpisodeProp | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchEpisodes = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await provider.fetchAnimeInfo(id);
        // @ts-ignore
        setData(response.episodes);
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

  return <div>Episodes</div>;
}

export default Episodes;
