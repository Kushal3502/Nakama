import { ANIME } from "@consumet/extensions";

const provider = new ANIME.Gogoanime();

export const usePopular = async () => {
  const response = await provider.fetchPopular();
  console.log(response);
};
