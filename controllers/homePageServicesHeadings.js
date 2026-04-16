import { prisma } from "../db/prisma.js";

const activeRoute = "homePageServicesHeadings";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageServicesHeadings.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    res.render("homePageServicesHeadings/index", {
      data,
      title: "home page services headings",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageServicesHeadings/create", {
    title: "Create Home page services heading",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePageServicesHeadings.create({
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
    const data = await prisma.homePageServicesHeadings.findUnique({
      where: { id },
    });

    res.render("homePageServicesHeadings/detail", {
      data,
      title: "Home page services headings Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePageServicesHeadings.update({
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
    await prisma.homePageServicesHeadings.delete({
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

    await prisma.homePageServicesHeadings.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
