import { prisma } from "../db/prisma.js";

const activeRoute = "iTServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.iTServices.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("iTServices/index", {
      data,
      title: "it services",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("iTServices/create", {
    title: "Create IT Service",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.iTServices.create({
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
    const data = await prisma.iTServices.findUnique({
      where: { id: req.params.id },
    });

    res.render("iTServices/detail", {
      data,
      title: "IT Service Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.iTServices.update({
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
    await prisma.iTServices.delete({
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

    await prisma.iTServices.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
