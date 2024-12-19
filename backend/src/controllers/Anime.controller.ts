import { Request, Response } from "express";
import { ANIME } from "@consumet/extensions";

const provider = new ANIME.Gogoanime();

export const serch = async (req: Request, res: Response) => {
  const { query = "", page = 1 } = req.query;
  try {
    const data = await provider.search(query as string, page as number);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchPopular = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  try {
    const data = await provider.fetchPopular(page as number);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchTopAiring = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  try {
    const data = await provider.fetchTopAiring(page as number);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchRecentlyAdded = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  try {
    const data = await provider.fetchRecentEpisodes(page as number);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchAnimeInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await provider.fetchAnimeInfo(id as string);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchEpisodes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await provider.fetchEpisodeSources(id as string);
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
