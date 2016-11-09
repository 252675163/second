"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_5/directive",
    "components/templates/micro-activity-template/template6_5/service",
], function () {

    return angular.module("Template6_5", [
        "ionic",
        "Template6_5.directives",
        "Template6_5.Service",
        //"UploadImg"
    ]);
});
