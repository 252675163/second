"use strict";
/**
 * author :huijuan
 * time: 2016年1月12日
 * description:招生简章模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template15_1/directive",
    "components/templates/micro-activity-template/template15_1/service",
], function () {

    return angular.module("Template15_1", [
        "ionic",
        "Template15_1.directives",
        "Template15_1.Service",
        //"UploadImg"
    ]);
});
