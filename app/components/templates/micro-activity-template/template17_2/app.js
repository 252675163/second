"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:体验课模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template17_2/directive",
    "components/templates/micro-activity-template/template17_2/service",
], function () {

    return angular.module("Template17_2", [
        "ionic",
        "Template17_2.directives",
        "Template17_2.Service",
        //"UploadImg"
    ]);
});
