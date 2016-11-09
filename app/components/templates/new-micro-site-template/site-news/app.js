"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:site-cover
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-news/directive",
    "components/templates/new-micro-site-template/site-news/service",
    "components/templates/new-micro-site-template/site-news/filter",
], function () {

    return angular.module("siteNews", [
        "ionic",
        "siteNews.directives",
        "siteNews.Service",
        'LengthFilter'
        //"UploadImg"
    ]);
});
