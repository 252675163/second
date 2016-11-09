"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template10_2/directive",
    "components/templates/micro-activity-template/template10_2/service",
], function () {

    return angular.module("Template10_2", [
        "ionic",
        "Template10_2.directives",
        "Template10_2.Service",
        //"UploadImg"
    ]);
});
