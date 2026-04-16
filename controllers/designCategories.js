import { prisma } from "../db/prisma.js";

const activeRoute = "designCategories";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.designCategories.findMany({
      include: {
        tabs: { include: { items: true } },
      },
    });

    res.render("designCategories/index", {
      data,
      title: "design categories",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("designCategories/create", {
    title: "Create category",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const category = await prisma.designCategories.create({
      data: {
        lang: req.body.lang,
      },
    });

    const tabs = req.body.tabs || [];

    for (let t = 0; t < tabs.length; t++) {
      const tab = await prisma.designCategoryTabs.create({
        data: {
          label: tabs[t].label,
          categoryId: category.id,
        },
      });

      const items = tabs[t].items || [];

      for (let i = 0; i < items.length; i++) {
        if (!items[i]) continue;

        await prisma.designCategoryItems.create({
          data: {
            title: items[i].title,
            descr: items[i].descr,
            tabId: tab.id,
          },
        });
      }
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.designCategories.findUnique({
      where: { id: req.params.id },
      include: {
        tabs: { include: { items: true } },
      },
    });

    res.render("designCategories/detail", {
      data,
      title: "detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.designCategories.update({
      where: { id },
      data: {
        lang: req.body.lang,
      },
    });

    await prisma.designCategoryTabs.deleteMany({
      where: { categoryId: id },
    });

    const tabs = req.body.tabs || [];

    for (let t = 0; t < tabs.length; t++) {
      const tab = await prisma.designCategoryTabs.create({
        data: {
          label: tabs[t].label,
          categoryId: id,
        },
      });

      const items = tabs[t].items || [];

      for (let i = 0; i < items.length; i++) {
        if (!items[i]) continue;

        await prisma.designCategoryItems.create({
          data: {
            title: items[i].title,
            descr: items[i].descr,
            tabId: tab.id,
          },
        });
      }
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.designCategories.delete({
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

    await prisma.designCategories.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
