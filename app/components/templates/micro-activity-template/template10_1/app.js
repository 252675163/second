"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:家长开放日
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_1/directive",
    "components/templates/micro-activity-template/template10_1/service",
], function () {

    return angular.module("Template10_1", [
        "ionic",
        "Template10_1.directives",
        "Template10_1.Service",
        //"UploadImg"
    ]);
});
