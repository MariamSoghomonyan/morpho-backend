import { prisma } from "../db/prisma.js";

const activeRoute = "smmServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.smmServices.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("smmServices/index", {
      data,
      title: "smmServices",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("smmServices/create", {
    title: "Create smmServices",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.smmServices.create({
      data: {
        lang: req.body.lang,
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
  try {
    const data = await prisma.smmServices.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("smmServices/detail", {
      data,
      title: "smmServices",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.smmServices.update({
      where: { id: req.params.id },
      data: {
        lang: req.body.lang,
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
  try {
    await prisma.smmServices.delete({
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

    await prisma.smmServices.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
