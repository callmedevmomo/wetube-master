import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  console.log(videos);
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};
// export const videos = (req, res) => res.render("videos");
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location }
  } = req;
  console.log(req.file);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo._id);
  req.user.save();
  req.flash("success", "Happy to your Uploading!!");
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: `Detail || ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const geteditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id); //type  obj to str

    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const posteditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      //or String(video.creator) !== req.user.id
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {}
  res.redirect(routes.home);
};

//api function ==> interact with only server

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400); //bad request
  } finally {
    res.end();
  }
};

//Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment._id);
    video.save();
    req.flash("success", "Add your Comment!");
  } catch (error) {
    res.status(400);
    req.flash("error", "Can't add Comment at this time.");
  } finally {
    res.end();
  }
};

export const postRemoveComment = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Comment.findByIdAndDelete(id);

    req.flash("success", "Delete your comment!");
  } catch (error) {
    req.flash("error", "Can't delete your comment retry later");
    res.status(400);
  } finally {
    res.end();
  }
};
