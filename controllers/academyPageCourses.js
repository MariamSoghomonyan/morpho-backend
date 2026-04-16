import { prisma } from "../db/prisma.js";

const activeRoute = "academyPageCourses";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.academyPageCourses.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("academyPageCourses/index", {
      data,
      title: "academy page courses",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("academyPageCourses/create", {
    title: "Create academy page course",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.academyPageCourses.create({
      data: {
        lang: req.body.lang,
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
    const data = await prisma.academyPageCourses.findUnique({
      where: { id },
    });

    res.render("academyPageCourses/detail", {
      data,
      title: "Academy page course Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.academyPageCourses.update({
      where: { id },
      data: {
        lang: req.body.lang,
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
    await prisma.academyPageCourses.delete({
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

    await prisma[activeRoute].deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
