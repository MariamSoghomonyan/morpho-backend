import { prisma } from "../db/prisma.js";

const activeRoute = "footerCredits";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerCredits.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("footerCredits/index", {
      data,
      title: "footer credits",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerCredits/create", {
    title: "Create footer credits",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerCredits.create({
      data: {
        text: req.body.text,
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
    const data = await prisma.footerCredits.findUnique({
      where: { id },
    });

    res.render("footerCredits/detail", {
      data,
      title: "footer credits detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerCredits.update({
      where: { id },
      data: {
        text: req.body.text,
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
    await prisma.footerCredits.delete({
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

    await prisma.footerCredits.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
