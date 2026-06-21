import Content from "../models/content.model.js";

const addContentService = async (contentData, userId) => {
  const content = await Content.create({
    ...contentData,
    createdBy: userId,
  });

  return content;
};

export default addContentService;