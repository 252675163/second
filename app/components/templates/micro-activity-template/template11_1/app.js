"use strict";
/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template11_1/directive",
    "components/templates/micro-activity-template/template11_1/service",
], function () {

    return angular.module("Template11_1", [
        "ionic",
        "Template11_1.directives",
        "Template11_1.Service",
        //"UploadImg"
    ]);
});
