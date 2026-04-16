import { prisma } from "../db/prisma.js";

const activeRoute = "homePageConsultations";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.homePageConsultations.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("homePageConsultations/index", {
      data,
      title: "home page consultations",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("homePageConsultations/create", {
    title: "Create home page consultations",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const { lang, title, descr, consultation_btn } = req.body;

    await prisma.homePageConsultations.create({
      data: {
        lang,
        title,
        descr,
        consultation_btn,
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
    const data = await prisma.homePageConsultations.findUnique({
      where: { id },
    });

    res.render("homePageConsultations/detail", {
      data,
      title: "Home page consultations Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { lang, title, descr, consultation_btn } = req.body;

    await prisma.homePageConsultations.update({
      where: { id },
      data: {
        lang,
        title,
        descr,
        consultation_btn,
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
    await prisma.homePageConsultations.delete({
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

    await prisma.homePageConsultations.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
