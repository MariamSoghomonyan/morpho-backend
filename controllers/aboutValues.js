import { prisma } from "../db/prisma.js";

const activeRoute = "aboutValues";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.aboutValues.findMany({
      include: { items: true },
      orderBy: { createdAt: "asc" },
    });

    res.render("aboutValues/index", {
      data,
      title: "about values",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("aboutValues/create", {
    title: "create about values",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const about = await prisma.aboutValues.create({
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
        about_btn: req.body.about_btn,
      },
    });

    const items = req.body.items || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.aboutValueItems.create({
        data: {
          title: items[i],
          order: i,
          aboutId: about.id,
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
    const data = await prisma.aboutValues.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("aboutValues/detail", {
      data,
      title: "about values detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.aboutValues.update({
      where: { id },
      data: {
        lang: req.body.lang,
        badge: req.body.badge,
        title: req.body.title,
        about_btn: req.body.about_btn,
      },
    });

    await prisma.aboutValueItems.deleteMany({
      where: { aboutId: id },
    });

    const items = req.body.items || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.aboutValueItems.create({
        data: {
          title: items[i],
          order: i,
          aboutId: id,
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

    await prisma.aboutValues.delete({
      where: { id },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const ids = req.body.ids
      ? req.body.ids
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : [];

    if (ids.length === 0) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    await prisma.aboutValues.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
