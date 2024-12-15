import { ANIME } from "@consumet/extensions";

const provider = new ANIME.Gogoanime();

export const fetchPopular = async () => {
  const response = await provider.fetchPopular();
  console.log(response);
};

export const fetchTopAiring = async () => {
  const response = await provider.fetchTopAiring();
  console.log(response);
};
