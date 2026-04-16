import { prisma } from "../db/prisma.js";

const activeRoute = "business";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.business.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("business/index", {
      data,
      title: "business",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("business/create", {
    title: "Create business",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.business.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.business.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("business/detail", {
      data,
      title: "business",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.business.update({
      where: { id: req.params.id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.business.delete({
      where: { id: req.params.id },
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

    await prisma.business.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
