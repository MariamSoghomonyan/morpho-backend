import { prisma } from "../db/prisma.js";

const activeRoute = "homePagePartners";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePagePartners.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePagePartners/index", {
      data,
      title: "home page partners",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePagePartners/create", {
    title: "Create Home page partners",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.homePagePartners.create({
      data: {
        image: req.file ? `/images/${req.file.filename}` : null,
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
    const data = await prisma.homePagePartners.findUnique({
      where: { id },
    });

    res.render("homePagePartners/detail", {
      data,
      title: "Home page partners Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.homePagePartners.update({
      where: { id },
      data: {
        image: req.file ? `/images/${req.file.filename}` : req.body.oldImage,
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
    await prisma.homePagePartners.delete({
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

    await prisma.homePagePartners.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
