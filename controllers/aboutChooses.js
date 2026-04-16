import { prisma } from "../db/prisma.js";

const activeRoute = "aboutChooses";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.aboutChoose.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    res.render("aboutChooses/index", {
      data,
      title: "about chooses",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("aboutChooses/create", {
    title: "Create About Chooses",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const choose = await prisma.aboutChoose.create({
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
      },
    });

    const items = req.body.item_title || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.aboutChooseItem.create({
        data: {
          title: items[i],
          chooseId: choose.id,
        },
      });
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.aboutChoose.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("aboutChooses/detail", {
      data,
      title: "About Chooses Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.aboutChoose.update({
      where: { id },
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
      },
    });

    await prisma.aboutChooseItem.deleteMany({
      where: { chooseId: id },
    });

    const items = req.body.item_title || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.aboutChooseItem.create({
        data: {
          title: items[i],
          chooseId: id,
        },
      });
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.aboutChooseItem.deleteMany({
      where: { chooseId: id },
    });

    await prisma.aboutChoose.delete({
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

    await prisma.aboutChooseItem.deleteMany({
      where: {
        chooseId: { in: ids },
      },
    });

    await prisma.aboutChoose.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
