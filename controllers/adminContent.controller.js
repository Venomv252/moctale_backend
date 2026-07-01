import asyncHandler from "../utils/asyncHandler.js";
import addContentService from "../services/addContent.service.js";
import getContentsService from "../services/getContents.service.js";
import getContentOverviewService from "../services/getContentOverview.service.js";



export const getContentOverview = async (
  req,
  res,
  next
) => {
  try {
    const overview =
      await getContentOverviewService();

    return res.status(200).json({
      success: true,
      overview,
    });
  } catch (error) {
    next(error);
  }
};
export const addContent = asyncHandler(async (req, res) => {
  const content = await addContentService(
    req.body,
    req.user._id
  );

  return res.status(201).json({
    success: true,
    message: "Content added successfully",
    content,
  });
});



export const getContents = asyncHandler(async (req, res) => {
  const contents = await getContentsService(req.body);

  return res.status(200).json({
    success: true,
    count: contents.length,
    contents,
  });
});