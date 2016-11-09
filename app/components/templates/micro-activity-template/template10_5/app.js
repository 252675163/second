"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_5/directive",
    "components/templates/micro-activity-template/template10_5/service",
], function () {

    return angular.module("Template10_5", [
        "ionic",
        "Template10_5.directives",
        "Template10_5.Service",
        //"UploadImg"
    ]);
});
