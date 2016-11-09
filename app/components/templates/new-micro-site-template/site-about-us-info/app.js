"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:第三套模板{final}第一个section
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-about-us-info/directive",
    "components/templates/new-micro-site-template/site-about-us-info/service",
    "components/templates/new-micro-site-template/site-about-us-info/site-about-us-info-edit/directive"

], function () {

    return angular.module("SiteAboutUsInfo", [
        "ionic",
        "SiteAboutUsInfo.directives",
        "SiteAboutUsInfo.Service",
        "SiteAboutUsInfoEdit.directives"
    ]);
});
