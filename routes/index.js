
import { Router } from "express";
import { auth } from "../middlewares/auth.js";

import adminRoute from "./admin.js";
import logoRoute from "./logos.js";
import navbarRoute from "./navbars.js";
import langRoute from "./langs.js";
import contactButtonsRoute from "./contactButtons.js";
import homePageIntrosRoute from "./homePageIntros.js";
import homePageServicesHeadingsRoute from "./homePageServicesHeadings.js";
import homePageServicesRoute from "./homePageServices.js";
import homePageChooseUsHeadingsRoute from "./homePageChooseUsHeadings.js";
import homePageChooseUssRoute from "./homePageChooseUss.js";
import homePagePartnersHeadingsRoute from "./homePagePartnersHeadings.js";
import homePagePartnersRoute from "./homePagePartners.js";
import homePageConsultationsRoute from "./homePageConsultations.js";
import academyPageIntrosRoute from "./academyPageIntros.js";
import academyPageCoursesHeadingsRoute from "./academyPageCoursesHeadings.js";
import academyPageCoursesRoute from "./academyPageCourses.js";
import academyPageContactsRoute from "./academyPageContacts.js";
import academyPageTeamsRoute from "./academyPageTeams.js";
import aboutIntrosRoute from "./aboutIntros.js";
import aboutChoosesRoute from "./aboutChooses.js";
import aboutValuesRoute from "./aboutValues.js";
import designIntrosRoute from "./designIntros.js";
import designCategoriesRoute from "./designCategories.js";
import designPortfoliosRoute from "./designPortfolios.js";
import iTIntrosRoute from "./iTIntros.js";
import iTServicesRoute from "./iTServices.js";
import iTProcessRoute from "./iTProcess.js";
import smmIntrosRoute from "./smmIntros.js";
import smmServicesRoute from "./smmServices.js";
import smmProcessRoute from "./smmProcess.js";
import businessRoutes from "./business.js";
import ourServicesRoute from "./ourServices.js";
import consultingServicesRoute from "./consultingServices.js";
import blogsRoute from "./blogs.js";
import videosRoute from "./videos.js";
import footerIntrosRoute from "./footerIntros.js";
import footerLinksMainsRoute from "./footerLinksMains.js";
import footerLinksServicesRoute from "./footerLinksServices.js";
import footerContactsRoute from "./footerContacts.js";
import footerCreditsRoute from "./footerCredits.js";
import footerSocialLinksRoute from "./footerSocialLinks.js";

import apiRoute from "./api.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { layout: false });
});

router.use("/api", apiRoute);

router.use("/admin", adminRoute);
router.use("/admin", auth);

router.use("/admin/logo", logoRoute);
router.use("/admin/navbar", navbarRoute);
router.use("/admin/lang", langRoute);
router.use("/admin/contactButtons", contactButtonsRoute);

router.use("/admin/homePageIntros", homePageIntrosRoute);
router.use("/admin/homePageServicesHeadings", homePageServicesHeadingsRoute);
router.use("/admin/homePageServices", homePageServicesRoute);
router.use("/admin/homePageChooseUsHeadings", homePageChooseUsHeadingsRoute);
router.use("/admin/homePageChooseUss", homePageChooseUssRoute);
router.use("/admin/homePagePartnersHeadings", homePagePartnersHeadingsRoute);
router.use("/admin/homePagePartners", homePagePartnersRoute);
router.use("/admin/homePageConsultations", homePageConsultationsRoute);

router.use("/admin/academyPageIntros", academyPageIntrosRoute);
router.use("/admin/academyPageCoursesHeadings", academyPageCoursesHeadingsRoute);
router.use("/admin/academyPageCourses", academyPageCoursesRoute);
router.use("/admin/academyPageContacts", academyPageContactsRoute);
router.use("/admin/academyPageTeams", academyPageTeamsRoute);

router.use("/admin/aboutIntros", aboutIntrosRoute);
router.use("/admin/aboutChooses", aboutChoosesRoute);
router.use("/admin/aboutValues", aboutValuesRoute);

router.use("/admin/designIntros", designIntrosRoute);
router.use("/admin/designCategories", designCategoriesRoute);
router.use("/admin/designPortfolios", designPortfoliosRoute);

router.use("/admin/iTIntros", iTIntrosRoute);
router.use("/admin/iTServices", iTServicesRoute);
router.use("/admin/iTProcess", iTProcessRoute);

router.use("/admin/smmIntros", smmIntrosRoute);
router.use("/admin/smmServices", smmServicesRoute);
router.use("/admin/smmProcess", smmProcessRoute);

router.use("/admin/business", businessRoutes);
router.use("/admin/ourServices", ourServicesRoute);
router.use("/admin/consultingServices", consultingServicesRoute);

router.use("/admin/blogs", blogsRoute);
router.use("/admin/videos", videosRoute);

router.use("/admin/footerIntros", footerIntrosRoute);
router.use("/admin/footerLinksMains", footerLinksMainsRoute);
router.use("/admin/footerLinksServices", footerLinksServicesRoute);
router.use("/admin/footerContacts", footerContactsRoute);
router.use("/admin/footerCredits", footerCreditsRoute);
router.use("/admin/footerSocialLinks", footerSocialLinksRoute);

export default router;
