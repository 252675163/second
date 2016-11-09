"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生简章模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template15_2/directive",
    "components/templates/micro-activity-template/template15_2/service",
], function () {

    return angular.module("Template15_2", [
        "ionic",
        "Template15_2.directives",
        "Template15_2.Service",
        //"UploadImg"
    ]);
});
