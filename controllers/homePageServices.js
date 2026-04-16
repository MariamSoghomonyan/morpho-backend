import { prisma } from "../db/prisma.js";

const activeRoute = "homePageServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageService.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePageServices/index", {
      data,
      title: "home page services",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageServices/create", {
    title: "Create Home page service",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePageService.create({
      data: {
        slug: req.body.slug,
        lang: req.body.lang,
        image: req.file ? `/images/${req.file.filename}` : null,
        tabName: req.body.tabName,
        title: req.body.title,
        descr: req.body.descr,
        buttonText: req.body.buttonText,
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
    const data = await prisma.homePageService.findUnique({
      where: { id },
    });

    res.render("homePageServices/detail", {
      data,
      title: "Home page services Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePageService.update({
      where: { id },
      data: {
        slug: req.body.slug,
        lang: req.body.lang,
        image: req.file ? `/images/${req.file.filename}` : req.body.oldImage,
        tabName: req.body.tabName,
        title: req.body.title,
        descr: req.body.descr,
        buttonText: req.body.buttonText,
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
    await prisma.homePageService.delete({
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

    await prisma.homePageService.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
