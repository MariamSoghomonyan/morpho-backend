import { prisma } from "../db/prisma.js";

const activeRoute = "footerLinksMains";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerLinksMains.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("footerLinksMains/index", {
      data,
      title: "footer links mains",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerLinksMains/create", {
    title: "Create footer links main",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerLinksMains.create({
      data: {
        lang: req.body.lang,
        title: req.body.title,
        route: req.body.route,
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
    const data = await prisma.footerLinksMains.findUnique({
      where: { id },
    });

    res.render("footerLinksMains/detail", {
      data,
      title: "Footer links mains detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerLinksMains.update({
      where: { id },
      data: {
        lang: req.body.lang,
        title: req.body.title,
        route: req.body.route,
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
    await prisma.footerLinksMains.delete({
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

    await prisma.footerLinksMains.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
