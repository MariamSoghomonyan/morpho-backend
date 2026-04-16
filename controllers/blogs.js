import { prisma } from "../db/prisma.js";

const activeRoute = "blogs";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.blogs.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("blogs/index", {
      data,
      title: "blogs",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("blogs/create", {
    title: "blogs",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.blogs.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.blogs.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("blogs/detail", {
      data,
      title: "blogs",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.blogs.update({
      where: { id: req.params.id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.blogs.delete({
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

    await prisma.blogs.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
