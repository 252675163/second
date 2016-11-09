"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:site-cover
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-cover/directive",
    "components/templates/new-micro-site-template/site-cover/service",
], function () {

    return angular.module("siteCover", [
        "ionic",
        "siteCover.directives",
        "siteCover.Service",
        //"UploadImg"
    ]);
});
