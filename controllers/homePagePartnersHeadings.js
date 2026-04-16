import { prisma } from "../db/prisma.js";

const activeRoute = "homePagePartnersHeadings";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePagePartnersHeadings.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePagePartnersHeadings/index", {
      data,
      title: "home page partners headings",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePagePartnersHeadings/create", {
    title: "Create Home page partners headings",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePagePartnersHeadings.create({
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
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
    const data = await prisma.homePagePartnersHeadings.findUnique({
      where: { id },
    });

    res.render("homePagePartnersHeadings/detail", {
      data,
      title: "Home page partners headings Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePagePartnersHeadings.update({
      where: { id },
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
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
    await prisma.homePagePartnersHeadings.delete({
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

    await prisma.homePagePartnersHeadings.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
