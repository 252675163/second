"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_4/directive",
    "components/templates/micro-activity-template/template10_4/service",
], function () {

    return angular.module("Template10_4", [
        "ionic",
        "Template10_4.directives",
        "Template10_4.Service",
        //"UploadImg"
    ]);
});
