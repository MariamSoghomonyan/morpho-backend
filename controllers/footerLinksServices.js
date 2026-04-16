import { prisma } from "../db/prisma.js";

const activeRoute = "footerLinksServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerLinksServices.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("footerLinksServices/index", {
      data,
      title: "footer links services",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerLinksServices/create", {
    title: "Create footer links services",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerLinksServices.create({
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
    const data = await prisma.footerLinksServices.findUnique({
      where: { id },
    });

    res.render("footerLinksServices/detail", {
      data,
      title: "footer links services detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerLinksServices.update({
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
    await prisma.footerLinksServices.delete({
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

    await prisma.footerLinksServices.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
