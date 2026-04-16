import { prisma } from "../db/prisma.js";

const activeRoute = "academyPageContacts";

export const listPage = async (req, res, next) => {
  try {
    const data = await prisma.academyPageContact.findMany({
      include: { courses: true },
      orderBy: { createdAt: "desc" },
    });

    res.render("academyPageContacts/index", {
      data,
      title: "academy page contacts",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = (req, res) => {
  res.render("academyPageContacts/create", {
    title: "Create Academy Contact",
    activeRoute,
  });
};

export const add = async (req, res, next) => {
  try {
    const contact = await prisma.academyPageContact.create({
      data: {
        lang: req.body.lang,
        title: req.body.title,
        nameLabel: req.body.name_label,
        emailLabel: req.body.email_label,
        phoneLabel: req.body.phone_label,
        courseLabel: req.body.course_label,
        messageLabel: req.body.message_label,
        submitBtn: req.body.submit_btn,
      },
    });

    const titles = req.body.academy_course_title || [];
    const langs = req.body.academy_course_lang || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.academyPageCourse.create({
        data: {
          title: titles[i],
          lang: langs[i],
          contactId: contact.id,
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
    const data = await prisma.academyPageContact.findUnique({
      where: { id: req.params.id },
      include: { courses: true },
    });

    if (!data) return res.redirect(`/admin/${activeRoute}`);

    res.render("academyPageContacts/detail", {
      data,
      title: "Academy Contact Detail",
      activeRoute,
    });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.academyPageContact.update({
      where: { id },
      data: {
        lang: req.body.lang,
        title: req.body.title,
        nameLabel: req.body.name_label,
        emailLabel: req.body.email_label,
        phoneLabel: req.body.phone_label,
        courseLabel: req.body.course_label,
        messageLabel: req.body.message_label,
        submitBtn: req.body.submit_btn,
      },
    });

    await prisma.academyPageCourse.deleteMany({
      where: { contactId: id },
    });

    const titles = req.body.academy_course_title || [];
    const langs = req.body.academy_course_lang || [];

    for (let i = 0; i < titles.length; i++) {
      if (!titles[i]) continue;

      await prisma.academyPageCourse.create({
        data: {
          title: titles[i],
          lang: langs[i],
          contactId: id,
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

    await prisma.academyPageCourse.deleteMany({
      where: { contactId: id },
    });

    await prisma.academyPageContact.delete({
      where: { id },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const ids = req.body.ids?.split(",").filter(Boolean) || [];

    if (!ids.length) {
      return res.redirect(`/admin/${activeRoute}`);
    }

    await prisma.academyPageCourse.deleteMany({
      where: {
        contactId: { in: ids },
      },
    });

    await prisma.academyPageContact.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.redirect(`/admin/${activeRoute}`);
  } catch (error) {
    next(error);
  }
};