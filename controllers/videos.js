import { prisma } from "../db/prisma.js";

const activeRoute = "videos";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.videos.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("videos/index", {
      data,
      title: "videos",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("videos/create", {
    title: "videos",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const data = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    await prisma.videos.create({
      data: {
        contentId: Number(data.contentId),
        lang: data.lang,
        title: data.title,
        descr: data.descr,
        date: data.date,
        category: data.category,
        duration: data.duration,

        videoUrl: videoFile ? `/images/${videoFile.filename}` : null,
        thumbnail: thumbFile ? `/images/${thumbFile.filename}` : null,
      },
    });

    res.redirect("/admin/videos");
  } catch (error) {
    next(error);
  }
};
export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.videos.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("videos/detail", {
      data,
      title: "videos",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    const videoUrl = videoFile
      ? `/images/${videoFile.filename}`
      : data.oldVideo;
    const thumbnail = thumbFile
      ? `/images/${thumbFile.filename}`
      : data.oldThumbnail;

    await prisma.videos.update({
      where: { id },
      data: {
        contentId: Number(data.contentId),
        lang: data.lang,
        title: data.title,
        descr: data.descr,
        date: data.date,
        category: data.category,
        duration: data.duration,
        videoUrl,
        thumbnail,
      },
    });

    res.redirect("/admin/videos");
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.videos.delete({
      where: { id: req.params.id },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const ids = req.body.ids?.split(",") || [];

    if (!ids.length) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    await prisma.videos.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
