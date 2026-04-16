import { prisma } from "../db/prisma.js";

const activeRoute = "academyPageCoursesHeadings";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.academyPageCoursesHeadings.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("academyPageCoursesHeadings/index", {
      data,
      title: "academy page courses headings",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("academyPageCoursesHeadings/create", {
    title: "Create academy page courses heading",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.academyPageCoursesHeadings.create({
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
    const data = await prisma.academyPageCoursesHeadings.findUnique({
      where: { id },
    });

    res.render("academyPageCoursesHeadings/detail", {
      data,
      title: "Academy page courses heading Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.academyPageCoursesHeadings.update({
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
    await prisma.academyPageCoursesHeadings.delete({
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

    await prisma.academyPageCoursesHeadings.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
