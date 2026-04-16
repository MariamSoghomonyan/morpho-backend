import { prisma } from "../db/prisma.js";

const activeRoute = "footerSocialLinks";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerSocialLinks.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.render("footerSocialLinks/index", {
      data,
      title: "footer social links",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerSocialLinks/create", {
    title: "create footer social link",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerSocialLinks.create({
      data: {
        image: req.file ? `/images/${req.file.filename}` : null,
        url: req.body.url,
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
    const data = await prisma.footerSocialLinks.findUnique({
      where: { id },
    });

    res.render("footerSocialLinks/detail", {
      data,
      title: "footer social link detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerSocialLinks.update({
      where: { id },
      data: {
        image: req.file ? `/images/${req.file.filename}` : req.body.oldImage,
        url: req.body.url,
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
    await prisma.footerSocialLinks.delete({
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

    await prisma.footerSocialLinks.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
