import { prisma } from "../db/prisma.js";

const activeRoute = "contactButtons";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.contactButton.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("contactButtons/index", {
      data,
      title: "contact button",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("contactButtons/create", {
    title: "Create Contact Button",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.contactButton.create({
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
    const data = await prisma.contactButton.findUnique({
      where: { id },
    });

    if (!data) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    res.render("contactButtons/detail", {
      data,
      title: "Contact Button Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.contactButton.update({
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
    await prisma.contactButton.delete({
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

    await prisma.contactButton.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
