import { Router } from "express";
import {
  fetchAnimeInfo,
  fetchEpisodes,
  fetchGenreInfo,
  fetchGenres,
  fetchPopular,
  fetchRecentlyAdded,
  fetchTopAiring,
  serch,
} from "../controllers/Anime.controller";

const router = Router();

router.route("/search").get(serch);
router.route("/genres").get(fetchGenres);
router.route("/genreinfo").get(fetchGenreInfo);
router.route("/popular").get(fetchPopular);
router.route("/top-airing").get(fetchTopAiring);
router.route("/recently-added").get(fetchRecentlyAdded);
router.route("/:id").get(fetchAnimeInfo);
router.route("/episodes/:id").get(fetchEpisodes);

export default router;
