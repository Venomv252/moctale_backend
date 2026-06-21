import Content from "../models/content.model.js";

const getContentsService = async (filters = {}) => {
  const query = {};

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.genre) {
    query.genres = filters.genre;
  }

  const contents = await Content.find(query)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email");

  return contents;
};

export default getContentsService;