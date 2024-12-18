import { Router } from "express";
import {
  fetchAnimeInfo,
  fetchEpisodes,
  fetchPopular,
  fetchRecentlyAdded,
  fetchTopAiring,
} from "../controllers/Anime.controller";

const router = Router();

router.route("/popular").get(fetchPopular);
router.route("/top-airing").get(fetchTopAiring);
router.route("/recently-added").get(fetchRecentlyAdded);
router.route("/:id").get(fetchAnimeInfo);
router.route("/episodes/:id").get(fetchEpisodes);

export default router;
