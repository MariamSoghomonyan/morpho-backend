import { Router } from "express";
import * as apiController from "../controllers/api.js";

const router = Router();

router.get("/", apiController.apiList);

router.get("/logos", apiController.logos);
router.get("/navbars", apiController.navbars);
router.get("/languages", apiController.languages);
router.get("/contact_buttons", apiController.contactBtns);

router.get("/home_page_intros", apiController.homePageIntros);

router.get(
  "/home_page_services_heading",
  apiController.homePageServicesHeadings,
);
router.get("/home_page_services", apiController.homePageServices);

router.get(
  "/home_page_choose_us_heading",
  apiController.homePageChooseUsHeadings,
);
router.get("/home_page_choose_us", apiController.homePageChooseUss);

router.get(
  "/home_page_partners_heading",
  apiController.homePagePartnersHeadings,
);
router.get("/home_page_partners", apiController.homePagePartners);

router.get("/home_page_consultations", apiController.homePageConsultations);

router.get("/academy_page_intros", apiController.academyPageIntros);

router.get(
  "/academy_page_courses_headings",
  apiController.academyPageCoursesHeadings,
);
router.get("/academy_page_courses", apiController.academyPageCourses);

router.get("/academy_page_contacts", apiController.academyPageContacts);
router.get("/academy_page_teams", apiController.academyPageTeams);

router.get("/about_intros", apiController.aboutIntros);
router.get("/about_chooses", apiController.aboutChooses);
router.get("/about_values", apiController.aboutValues);

router.get("/design_intros", apiController.designIntros);
router.get("/design_categories", apiController.designCategories);
router.get("/design_portfolios", apiController.designPortfolios);

router.get("/it_intros", apiController.iTIntros);
router.get("/it_services", apiController.iTServices);
router.get("/it_process", apiController.iTProcess);

router.get("/smm_intros", apiController.smmIntros);
router.get("/smm_services", apiController.smmServices);
router.get("/smm_process", apiController.smmProcess);

router.get("/business", apiController.business);
router.get("/consulting_services", apiController.consultingServices);
router.get("/our_services", apiController.ourServices);

router.get("/blogs", apiController.blogs);
router.get("/videos", apiController.videos);

router.get("/footer_intros", apiController.footerIntros);
router.get("/footer_links_mains", apiController.footerLinksMains);
router.get("/footer_links_services", apiController.footerLinksServices);
router.get("/footer_contacts", apiController.footerContacts);
router.get("/footer_credits", apiController.footerCredits);
router.get("/footer_social_links", apiController.footerSocialLinks);

export default router;
