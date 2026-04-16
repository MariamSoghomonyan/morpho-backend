import { prisma } from "../db/prisma.js";

const activeRoute = "smmProcess";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.smmProcess.findMany({
      include: { steps: true },
      orderBy: { createdAt: "asc" },
    });

    res.render("smmProcess/index", {
      data,
      title: "smmProcess",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("smmProcess/create", {
    title: "Create smmProcess",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const process = await prisma.smmProcess.create({
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        offer_btn: req.body.offer_btn,
      },
    });

    const numbers = req.body.step_number || [];
    const titles = req.body.step_title || [];

    for (let i = 0; i < numbers.length; i++) {
      if (!titles[i]) continue;

      await prisma.smmStep.create({
        data: {
          number: numbers[i],
          title: titles[i],
          smmProcessId: process.id,
          order: i,
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
    const data = await prisma.smmProcess.findUnique({
      where: { id: req.params.id },
      include: { steps: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("smmProcess/detail", {
      data,
      title: "smmProcess",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.smmProcess.update({
      where: { id },
      data: {
        lang: req.body.lang,
        subtitle: req.body.subtitle,
        offer_btn: req.body.offer_btn,
      },
    });

    await prisma.smmStep.deleteMany({
      where: { smmProcessId: id },
    });

    const numbers = req.body.step_number || [];
    const titles = req.body.step_title || [];

    for (let i = 0; i < numbers.length; i++) {
      if (!titles[i]) continue;

      await prisma.smmStep.create({
        data: {
          number: numbers[i],
          title: titles[i],
          smmProcessId: id,
          order: i,
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

    await prisma.smmStep.deleteMany({
      where: { smmProcessId: id },
    });

    await prisma.smmProcess.delete({
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

    if (!ids.length) return res.redirect(`/admin/${activeRoute}`);

    await prisma.smmStep.deleteMany({
      where: { smmProcessId: { in: ids } },
    });

    await prisma.smmProcess.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
