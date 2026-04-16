import { prisma } from "../db/prisma.js";

const activeRoute = "homePageChooseUss";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageChooseUss.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePageChooseUss/index", {
      data,
      title: "home page choose us",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageChooseUss/create", {
    title: "Create Home page choose us",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePageChooseUss.create({
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
    const data = await prisma.homePageChooseUss.findUnique({
      where: { id },
    });

    res.render("homePageChooseUss/detail", {
      data,
      title: "Home page choose us Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePageChooseUss.update({
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
    await prisma.homePageChooseUss.delete({
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

    await prisma.homePageChooseUss.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};