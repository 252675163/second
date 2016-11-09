"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_2/directive",
    "components/templates/micro-activity-template/template6_2/service",
], function () {

    return angular.module("Template6_2", [
        "ionic",
        "Template6_2.directives",
        "Template6_2.Service",
        //"UploadImg"
    ]);
});
