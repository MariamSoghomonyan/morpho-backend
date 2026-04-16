import { prisma } from "../db/prisma.js";

const activeRoute = "academyPageTeams";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.academyPageTeams.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("academyPageTeams/index", {
      data,
      title: "academy page teams",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("academyPageTeams/create", {
    title: "Create academy page teams",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.academyPageTeams.create({
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
    const data = await prisma.academyPageTeams.findUnique({
      where: { id },
    });

    res.render("academyPageTeams/detail", {
      data,
      title: "Academy page teams Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.academyPageTeams.update({
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
    await prisma.academyPageTeams.delete({
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

    await prisma.academyPageTeams.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
