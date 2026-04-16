import { prisma } from "../db/prisma.js";
import expressListEndpoints from "express-list-endpoints";
import apiRoute from "../routes/api.js";

const getBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const cleanJoin = (base, path) => {
  if (!path) return null;

  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${cleanBase}/${cleanPath}`;
};

const normalizeImage = (req, value) => {
  if (!value) return value;

  if (typeof value === "string") {
    if (value.startsWith("http")) {
      return value.replace("localhost", "127.0.0.1");
    }

    return cleanJoin(getBaseUrl(req), value);
  }

  return value;
};

const withImage = (req, item) => {
  if (!item) return item;

  const result = { ...item };

  if (result.image) {
    result.image = normalizeImage(req, result.image);
  }

  if (result.flag) {
    result.flag = normalizeImage(req, result.flag);
  }

  return result;
};

const withImagesArray = (req, data) => {
  return data.map((item) => {
    const result = { ...item };

    if (result.image) {
      result.image = normalizeImage(req, result.image);
    }

    return result;
  });
};

export const apiList = (req, res) => {
  const data = expressListEndpoints(apiRoute);
  const version = "v 1.0.0";

  const fullData = data.map((elem) => `${getBaseUrl(req)}/api${elem.path}`);
  fullData.shift();

  res.render("api", {
    title: "Morpho API",
    version,
    data: fullData,
    layout: false,
  });
};

export const logos = async (req, res, next) => {
  try {
    const data = await prisma.logo.findMany();
    const fullData = data.map((el) => withImage(req, el));
    res.json(fullData[0]);
  } catch (e) {
    next(e);
  }
};

export const navbars = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.navbar.findMany({
      where: lang ? { lang } : undefined,
      include: { dropdowns: true },
      orderBy: { order: "asc" },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const languages = async (req, res, next) => {
  try {
    const data = await prisma.lang.findMany();

    const fullData = data.map((elem) => ({
      ...elem,
      flag: normalizeImage(req, elem.flag),
    }));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const contactBtns = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.contactButton.findMany({
      where: lang ? { lang } : undefined,
      orderBy: { createdAt: "asc" },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePageIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageIntro.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePageServicesHeadings = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageServicesHeadings.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePageServices = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageService.findMany({
      where: lang ? { lang } : {},
    });

    const fullData = data.map((el) => withImage(req, el));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const homePageChooseUsHeadings = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageChooseUsHeadings.findMany({
      where: lang ? { lang } : {},
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePageChooseUss = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageChooseUss.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePagePartnersHeadings = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePagePartnersHeadings.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const homePagePartners = async (req, res, next) => {
  try {
    const data = await prisma.homePagePartners.findMany();
    const fullData = withImagesArray(req, data);
    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const homePageConsultations = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.homePageConsultations.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const academyPageIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.academyPageIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const academyPageCoursesHeadings = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.academyPageCoursesHeadings.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const academyPageCourses = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.academyPageCourses.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const academyPageContacts = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.academyPageContact.findMany({
      where: lang ? { lang } : {},
      include: { courses: true },
    });

    const fullData = data.map((item) => ({
      ...item,
      name_label: item.nameLabel,
      email_label: item.emailLabel,
      phone_label: item.phoneLabel,
      course_label: item.courseLabel,
      message_label: item.messageLabel,
      submit_btn: item.submitBtn,
    }));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};
export const academyPageTeams = async (req, res, next) => {
  try {
    const data = await prisma.academyPageTeams.findMany();

    const fullData = data
      .filter((el) => el && el.image)
      .map((el) => withImage(req, el));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const aboutIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.aboutIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const aboutChooses = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.aboutChoose.findMany({
      where: lang ? { lang } : {},
      include: { items: true },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const aboutValues = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.aboutValues.findMany({
      where: lang ? { lang } : {},
      include: {
        items: true,
      },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const designIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.designIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const designCategories = async (req, res, next) => {
  try {
    const data = await prisma.designCategories.findMany({
      include: {
        tabs: {
          include: { items: true },
        },
      },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const designPortfolios = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.designPortfolio.findMany({
      where: lang ? { lang } : undefined,
      include: { items: true },
      orderBy: { createdAt: "asc" },
    });

    const fullData = data.map((portfolio) => ({
      ...portfolio,
      items: portfolio.items.map((item) => withImage(req, item)),
    }));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const iTIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.iTIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const iTServices = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.iTServices.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const iTProcess = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.iTProcess.findMany({
      where: lang ? { lang } : {},
      include: { steps: true },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const smmIntros = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.smmIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const smmServices = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.smmServices.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const smmProcess = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.smmProcess.findMany({
      where: lang ? { lang } : {},
      include: { steps: true },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const business = async (req, res, next) => {
  try {
    const data = await prisma.business.findMany();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const consultingServices = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.consultingService.findMany({
      where: lang ? { lang } : {},
      include: { items: { orderBy: { createdAt: "asc" } } },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const ourServices = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.ourService.findMany({
      where: lang ? { lang } : {},
      include: { items: { orderBy: { createdAt: "asc" } } },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const blogs = async (req, res, next) => {
  const lang = req.query.lang || "";

  try {
    const data = await prisma.blogs.findMany({
      where: lang ? { lang } : {},
      orderBy: { createdAt: "desc" },
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const videos = async (req, res, next) => {
  try {
    const lang = req.query.lang;

    const where = lang && lang !== "all" ? { lang } : {};

    const data = await prisma.videos.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const fullData = data.map((elem) => ({
      ...elem,
      videoUrl: elem.videoUrl ? normalizeImage(req, elem.videoUrl) : null,
      thumbnail: elem.thumbnail ? normalizeImage(req, elem.thumbnail) : null,
    }));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};

export const footerIntros = async (req, res, next) => {
  try {
    const { lang } = req.query;

    const data = await prisma.footerIntros.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const footerLinksMains = async (req, res, next) => {
  try {
    const { lang } = req.query;

    const data = await prisma.footerLinksMains.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const footerLinksServices = async (req, res, next) => {
  try {
    const { lang } = req.query;

    const data = await prisma.footerLinksServices.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const footerContacts = async (req, res, next) => {
  try {
    const { lang } = req.query;

    const data = await prisma.footerContacts.findMany({
      where: lang ? { lang } : undefined,
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const footerCredits = async (req, res, next) => {
  try {
    const data = await prisma.footerCredits.findFirst();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const footerSocialLinks = async (req, res, next) => {
  try {
    const { lang } = req.query;

    const data = await prisma.footerSocialLinks.findMany({
      where: lang ? { lang } : undefined,
    });

    const fullData = data.map((el) => withImage(req, el));

    res.json(fullData);
  } catch (e) {
    next(e);
  }
};
