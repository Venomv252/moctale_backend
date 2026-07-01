import Content from "../models/content.model.js";

const getContentOverviewService = async () => {
  const totalContent = await Content.countDocuments();

  const movies = await Content.countDocuments({
    type: "movie",
  });

  const series = await Content.countDocuments({
    type: "series",
  });

  const anime = await Content.countDocuments({
    type: "anime",
  });

  const released = await Content.countDocuments({
    status: "released",
  });

  const upcoming = await Content.countDocuments({
    status: "upcoming",
  });

  const trending = await Content.countDocuments({
    isTrending: true,
  });

  const featured = await Content.countDocuments({
    isFeatured: true,
  });

  return {
    totalContent,
    movies,
    series,
    anime,
    released,
    upcoming,
    trending,
    featured,
  };
};

export default getContentOverviewService;