"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_6/directive",
    "components/templates/micro-activity-template/template6_6/service",
], function () {

    return angular.module("Template6_6", [
        "ionic",
        "Template6_6.directives",
        "Template6_6.Service",
        //"UploadImg"
    ]);
});
