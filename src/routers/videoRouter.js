import express from "express";
import routes from "../routes";
import {
  videoDetail,
  geteditVideo,
  deleteVideo,
  postUpload,
  getUpload,
  posteditVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, geteditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, posteditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
