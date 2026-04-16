import { prisma } from "../db/prisma.js";

const activeRoute = "iTProcess";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.iTProcess.findMany({
      include: { steps: true },
      orderBy: { createdAt: "asc" },
    });

    res.render("iTProcess/index", {
      data,
      title: "ITProcess",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("iTProcess/create", {
    title: "Create ITProcess",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const process = await prisma.iTProcess.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        offer_btn: req.body.offer_btn,
      },
    });

    const numbers = req.body.step_number || [];
    const titles = req.body.step_title || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.iTProcessStep.create({
        data: {
          number: numbers[i],
          title: titles[i],
          itProcessId: process.id,
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
    const data = await prisma.iTProcess.findUnique({
      where: { id: req.params.id },
      include: { steps: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("iTProcess/detail", {
      data,
      title: "ITProcess Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.iTProcess.update({
      where: { id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        offer_btn: req.body.offer_btn,
      },
    });

    await prisma.iTProcessStep.deleteMany({
      where: { itProcessId: id },
    });

    const numbers = req.body.step_number || [];
    const titles = req.body.step_title || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.iTProcessStep.create({
        data: {
          number: numbers[i],
          title: titles[i],
          itProcessId: id,
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

    await prisma.iTProcessStep.deleteMany({
      where: { itProcessId: id },
    });

    await prisma.iTProcess.delete({
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
      return res.redirect("/admin/iTProcess");
    }

    await prisma.iTProcessStep.deleteMany({
      where: { itProcessId: { in: ids } },
    });

    await prisma.iTProcess.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect("/admin/iTProcess");
  } catch (error) {
    next(error);
  }
};
