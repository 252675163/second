"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_4/directive",
    "components/templates/micro-activity-template/template6_4/service",
], function () {

    return angular.module("Template6_4", [
        "ionic",
        "Template6_4.directives",
        "Template6_4.Service",
        //"UploadImg"
    ]);
});
