import { prisma } from "../db/prisma.js";

const activeRoute = "logo";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.logo.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("logos/index", {
      data,
      title: "logo",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("logos/create", {
    title: "Create Logo",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const image = req.file ? "/images/" + req.file.filename : null;

    await prisma.logo.create({
      data: {
        ...req.body,
        image,
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.logo.findUnique({
      where: { id: req.params.id },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("logos/detail", {
      data,
      title: "Logo Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const imagePath = req.file ? "/images/" + req.file.filename : undefined;

    const dataToUpdate = {
      ...req.body,
      ...(imagePath && { image: imagePath }),
    };

    await prisma.logo.update({
      where: { id },
      data: dataToUpdate,
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.logo.delete({
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

    await prisma.logo.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
