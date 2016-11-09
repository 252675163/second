"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:第三套模板{final}第一个section
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-course-info/directive",
    "components/templates/new-micro-site-template/site-course-info/service",
    "components/templates/new-micro-site-template/site-course-info/site-course-info-edit/directive"

], function () {

    return angular.module("SiteCourseInfo", [
        "ionic",
        "SiteCourseInfo.directives",
        "SiteCourseInfo.Service",
        "SiteCourseInfoEdit.directives"
    ]);
});
