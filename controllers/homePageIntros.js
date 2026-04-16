import { prisma } from "../db/prisma.js";

const activeRoute = "homePageIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageIntro.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePageIntros/index", {
      data,
      title: "home page intro",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageIntros/create", {
    title: "Create Home Intro",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePageIntro.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
        services_btn: req.body.services_btn,
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
    const data = await prisma.homePageIntro.findUnique({
      where: { id },
    });

    if (!data) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    res.render("homePageIntros/detail", {
      data,
      title: "Home Intro Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePageIntro.update({
      where: { id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
        services_btn: req.body.services_btn,
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
    await prisma.homePageIntro.delete({
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

    await prisma.homePageIntro.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};