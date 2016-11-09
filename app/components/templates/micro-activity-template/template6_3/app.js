"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_3/directive",
    "components/templates/micro-activity-template/template6_3/service",
], function () {

    return angular.module("Template6_3", [
        "ionic",
        "Template6_3.directives",
        "Template6_3.Service",
        //"UploadImg"
    ]);
});
