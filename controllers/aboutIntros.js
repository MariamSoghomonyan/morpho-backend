import { prisma } from "../db/prisma.js";

const activeRoute = "aboutIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.aboutIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("aboutIntros/index", {
      data,
      title: "about intros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("aboutIntros/create", {
    title: "Create about intro",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.aboutIntros.create({
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
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
  const { id } = req.params;

  try {
    const data = await prisma.aboutIntros.findUnique({
      where: { id },
    });

    res.render("aboutIntros/detail", {
      data,
      title: "About intro detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.aboutIntros.update({
      where: { id },
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
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
  const { id } = req.params;

  try {
    await prisma.aboutIntros.delete({
      where: { id },
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

    await prisma.aboutIntros.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
