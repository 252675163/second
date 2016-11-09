"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 14:51:16
 * description: 新微官网的模块组件  TODO  命名规则 再商议
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/service",
    "components/templates/new-micro-site-template/site-cover/app",
    "components/templates/new-micro-site-template/site-news/app",
     "components/templates/new-micro-site-template/site-org-info/app",
    "components/templates/new-micro-site-template/site-course-info/app",
    "components/templates/new-micro-site-template/site-teacher-info/app",
    "components/templates/new-micro-site-template/site-about-us-info/app",
    "components/templates/new-micro-site-template/site-qr-code/app"


], function () {

    return angular.module("NewMicroTemplate", [
        "ionic",
        "SiteTemplateCommon.Service",
        "siteCover",
        "siteNews",
        "siteOrgInfo",
        "SiteCourseInfo",
        "SiteTeacherInfo",
        "SiteAboutUsInfo",
        "siteQrCode"

    ]);
});
