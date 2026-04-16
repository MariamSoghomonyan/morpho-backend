import { prisma } from "../db/prisma.js";

const activeRoute = "designIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.designIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("designIntros/index", {
      data,
      title: "design intros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("designIntros/create", {
    title: "Create design intros",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.designIntros.create({
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
    const data = await prisma.designIntros.findUnique({
      where: { id },
    });

    res.render("designIntros/detail", {
      data,
      title: "Design intros Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.designIntros.update({
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
    await prisma.designIntros.delete({
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

    await prisma.designIntros.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
