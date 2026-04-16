import { prisma } from "../db/prisma.js";

const activeRoute = "homePageChooseUsHeadings";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageChooseUsHeadings.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePageChooseUsHeadings/index", {
      data,
      title: "home page choose us headings",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageChooseUsHeadings/create", {
    title: "Create Home page choose us headings",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePageChooseUsHeadings.create({
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
    const data = await prisma.homePageChooseUsHeadings.findUnique({
      where: { id },
    });

    res.render("homePageChooseUsHeadings/detail", {
      data,
      title: "Home page choose us headings Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePageChooseUsHeadings.update({
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
    await prisma.homePageChooseUsHeadings.delete({
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

    await prisma.homePageChooseUsHeadings.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
