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
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), geteditVideo);
videoRouter.post(routes.editVideo(), posteditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
