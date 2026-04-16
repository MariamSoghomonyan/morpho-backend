import { prisma } from "../db/prisma.js";

const activeRoute = "footerIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("footerIntros/index", {
      data,
      title: "footer intros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerIntros/create", {
    title: "Create footer intros",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerIntros.create({
      data: {
        lang: req.body.lang,
        descr: req.body.descr,
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
    const data = await prisma.footerIntros.findUnique({
      where: { id },
    });

    res.render("footerIntros/detail", {
      data,
      title: "Footer intros detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerIntros.update({
      where: { id },
      data: {
        lang: req.body.lang,
        descr: req.body.descr,
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
    await prisma.footerIntros.delete({
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

    await prisma.footerIntros.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
