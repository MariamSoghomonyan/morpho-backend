import { prisma } from "../db/prisma.js";

const activeRoute = "footerContacts";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.footerContacts.findMany({
      orderBy: { id: "asc" },
    });

    res.render("footerContacts/index", {
      data,
      title: "footer contacts",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("footerContacts/create", {
    title: "Create footer contacts",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    await prisma.footerContacts.create({
      data: {
        lang: req.body.lang,
        email_label: req.body.email_label,
        telephone_label: req.body.telephone_label,
        address_label: req.body.address_label,
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
    const data = await prisma.footerContacts.findUnique({
      where: { id },
    });

    res.render("footerContacts/detail", {
      data,
      title: "Footer contacts detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.footerContacts.update({
      where: { id },
      data: {
        lang: req.body.lang,
        email_label: req.body.email_label,
        telephone_label: req.body.telephone_label,
        address_label: req.body.address_label,
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
    await prisma.footerContacts.delete({
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

    await prisma.footerContacts.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};
