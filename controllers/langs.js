import { prisma } from "../db/prisma.js";

const activeRoute = "lang";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.lang.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("langs/index", {
      data,
      title: "language",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("langs/create", {
    title: "Create Language",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const flag = req.file ? "/images/" + req.file.filename : null;

    await prisma.lang.create({
      data: {
        code: req.body.code,
        flag,
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
    const data = await prisma.lang.findUnique({
      where: { id },
    });

    if (!data) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    res.render("langs/detail", {
      data,
      title: "Language Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const flag = req.file ? "/images/" + req.file.filename : undefined;

    await prisma.lang.update({
      where: { id },
      data: {
        code: req.body.code,
        ...(flag && { flag }),
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
    await prisma.lang.delete({
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

    await prisma.lang.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};