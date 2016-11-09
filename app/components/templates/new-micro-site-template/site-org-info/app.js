"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:site-cover
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-org-info/directive",
    "components/templates/new-micro-site-template/site-org-info/service",
], function () {

    return angular.module("siteOrgInfo", [
        "ionic",
        "siteOrgInfo.directives",
        "siteOrgInfo.Service",
        //"UploadImg"
    ]);
});
