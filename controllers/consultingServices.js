import { prisma } from "../db/prisma.js";

const activeRoute = "consultingServices";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.consultingService.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    res.render("consultingServices/index", {
      data,
      title: "consulting services",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("consultingServices/create", {
    title: "Create Consulting Service",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const service = await prisma.consultingService.create({
      data: {
        lang: req.body.lang,
      },
    });

    const titles = req.body.item_title || [];
    const descriptions = req.body.item_description || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.consultingServiceItem.create({
        data: {
          title: titles[i],
          description: descriptions[i],
          serviceId: service.id,
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
    const data = await prisma.consultingService.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("consultingServices/detail", {
      data,
      title: "Consulting Service Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.consultingService.update({
      where: { id },
      data: {
        lang: req.body.lang,
      },
    });

    await prisma.consultingServiceItem.deleteMany({
      where: { serviceId: id },
    });

    const titles = req.body.item_title || [];
    const descriptions = req.body.item_description || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.consultingServiceItem.create({
        data: {
          title: titles[i],
          description: descriptions[i],
          serviceId: id,
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

    await prisma.consultingService.delete({
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

    await prisma.consultingService.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
