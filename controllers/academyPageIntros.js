import { prisma } from "../db/prisma.js";

const activeRoute = "academyPageIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.academyPageIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("academyPageIntros/index", {
      data,
      title: "academy page intros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("academyPageIntros/create", {
    title: "Create academy page intro",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.academyPageIntros.create({
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
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
    const data = await prisma.academyPageIntros.findUnique({
      where: { id },
    });

    res.render("academyPageIntros/detail", {
      data,
      title: "Academy page intro Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.academyPageIntros.update({
      where: { id },
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
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
    await prisma.academyPageIntros.delete({
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

    await prisma.academyPageIntros.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
