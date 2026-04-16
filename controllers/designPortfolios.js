import { prisma } from "../db/prisma.js";

const activeRoute = "designPortfolios";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.designPortfolio.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    res.render("designPortfolios/index", {
      data,
      title: "designPortfolios",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("designPortfolios/create", {
    title: "designPortfolios",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const data = req.body;
    const files = req.files || [];

    const created = await prisma.designPortfolio.create({
      data: {
        lang: data.lang,
        title: data.title,
        designBtn: data.designBtn,
      },
    });

    if (files.length) {
      await prisma.designPortfolioItem.createMany({
        data: files.map((file) => ({
          image: `/images/${file.filename}`,
          portfolioId: created.id,
        })),
      });
    }

    res.redirect("/admin/designPortfolios");
  } catch (error) {
    next(error);
  }
};

export const detailPage = async (req, res, next) => {
  try {
    const data = await prisma.designPortfolio.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("designPortfolios/detail", {
      data,
      title: "designPortfolios",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const files = req.files || [];

    await prisma.designPortfolio.update({
      where: { id },
      data: {
        lang: data.lang,
        title: data.title,
        designBtn: data.designBtn,
      },
    });

    if (files.length) {
      await prisma.designPortfolioItem.createMany({
        data: files.map((file) => ({
          image: `/images/${file.filename}`,
          portfolioId: id,
        })),
      });
    }

    res.redirect("/admin/designPortfolios");
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await prisma.designPortfolio.delete({
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

    await prisma.designPortfolio.deleteMany({
      where: { id: { in: ids } },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
