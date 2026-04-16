import { prisma } from "../db/prisma.js";

const activeRoute = "iTIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.iTIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("iTIntros/index", {
      data,
      title: "it intros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("iTIntros/create", {
    title: "Create IT Intro",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.iTIntros.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.iTIntros.findUnique({
      where: { id: req.params.id },
    });

    res.render("iTIntros/detail", {
      data,
      title: "IT Intro Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.iTIntros.update({
      where: { id: req.params.id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.iTIntros.delete({
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

    await prisma.iTIntros.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
