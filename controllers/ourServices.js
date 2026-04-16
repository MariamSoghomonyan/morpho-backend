import { prisma } from "../db/prisma.js";

const activeRoute = "ourServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.ourService.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    res.render("ourServices/index", {
      data,
      title: "OurServices",
      activeRoute,
    });
  } catch (e) {
    next(e);
  }
};

export const createPage = (req, res) => {
  res.render("ourServices/create", {
    title: "Create ourServices",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const service = await prisma.ourService.create({
      data: {
        lang: req.body.lang,
        title: req.body.title,
        consultation_btn: req.body.consultation_btn,
      },
    });

    const items = req.body.item_name || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.ourServiceItem.create({
        data: {
          name: items[i],
          serviceId: service.id,
        },
      });
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (e) {
    next(e);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.ourService.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("ourServices/detail", {
      data,
      title: "Detail ourServices",
      activeRoute,
    });
  } catch (e) {
    next(e);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.ourService.update({
      where: { id },
      data: {
        lang: req.body.lang,
        title: req.body.title,
        consultation_btn: req.body.consultation_btn,
      },
    });

    await prisma.ourServiceItem.deleteMany({
      where: { serviceId: id },
    });

    const items = req.body.item_name || [];

    for (let i = 0; i < items.length; i++) {
      if (!items[i]) continue;

      await prisma.ourServiceItem.create({
        data: {
          name: items[i],
          serviceId: id,
        },
      });
    }

    res.redirect(`/admin/${activeRoute}`);
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.ourServiceItem.deleteMany({
      where: { serviceId: id },
    });

    await prisma.ourService.delete({
      where: { id },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (e) {
    next(e);
  }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const ids = req.body.ids?.split(",") || [];

    if (!ids.length) return res.redirect(`/admin/${activeRoute}`);

    await prisma.ourServiceItem.deleteMany({
      where: { serviceId: { in: ids } },
    });

    await prisma.ourService.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (e) {
    next(e);
  }
};
