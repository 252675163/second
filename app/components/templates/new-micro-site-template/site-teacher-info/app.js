"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:第三套模板{final}第一个section
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-teacher-info/directive",
    "components/templates/new-micro-site-template/site-teacher-info/service",
    "components/templates/new-micro-site-template/site-teacher-info/site-teacher-info-edit/directive"

], function () {

    return angular.module("SiteTeacherInfo", [
        "ionic",
        "SiteTeacherInfo.directives",
        "SiteTeacherInfo.Service",
        "SiteTeacherInfoEdit.directives"
    ]);
});
