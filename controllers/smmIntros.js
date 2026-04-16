import { prisma } from "../db/prisma.js";

const activeRoute = "smmIntros";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.smmIntros.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("smmIntros/index", {
      data,
      title: "smmIntros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("smmIntros/create", {
    title: "Create smmIntros",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.smmIntros.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.smmIntros.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("smmIntros/detail", {
      data,
      title: "smmIntros",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    await prisma.smmIntros.update({
      where: { id: req.params.id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        title: req.body.title,
        descr: req.body.descr,
        advice_btn: req.body.advice_btn,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.smmIntros.delete({
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

    await prisma.smmIntros.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
