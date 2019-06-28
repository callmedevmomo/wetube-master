import express from "express";
import routes from "../routes";
import {
  videoDetail,
  editVideo,
  deleteVideo,
  postUpload,
  getUpload
} from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVIdeo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
