"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:感恩节
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_1/directive",
    "components/templates/micro-activity-template/template6_1/service",
], function () {

    return angular.module("Template6_1", [
        "ionic",
        "Template6_1.directives",
        "Template6_1.Service",
        //"UploadImg"
    ]);
});
