import { prisma } from "../db/prisma.js";

const activeRoute = "navbar";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.navbar.findMany({
      include: { dropdowns: true },
      orderBy: { order: "asc" },
    });

    res.render("navbars/index", {
      data,
      title: "navbar",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("navbars/create", {
    title: "Create Navbar",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const navbar = await prisma.navbar.create({
      data: {
        lang: req.body.lang,
        title: req.body.title,
        route: req.body.route,
      },
    });

    const titles = req.body.dropdown_title || [];
    const routes = req.body.dropdown_route || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.navbarDropdown.create({
        data: {
          title: titles[i],
          route: routes[i],
          navbarId: navbar.id,
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
    const data = await prisma.navbar.findUnique({
      where: { id: req.params.id },
      include: { dropdowns: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("navbars/detail", {
      data,
      title: "Navbar Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.navbar.update({
      where: { id },
      data: {
        lang: req.body.lang,
        title: req.body.title,
        route: req.body.route,
      },
    });

    await prisma.navbarDropdown.deleteMany({
      where: { navbarId: id },
    });

    const titles = req.body.dropdown_title || [];
    const routes = req.body.dropdown_route || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.navbarDropdown.create({
        data: {
          title: titles[i],
          route: routes[i],
          navbarId: id,
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

    await prisma.navbarDropdown.deleteMany({
      where: { navbarId: id },
    });

    await prisma.navbar.delete({
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
      return res.redirect("/admin/navbar");
    }

    await prisma.navbarDropdown.deleteMany({
      where: {
        navbarId: { in: ids },
      },
    });

    await prisma.navbar.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect("/admin/navbar");
  } catch (error) {
    next(error);
  }
};  