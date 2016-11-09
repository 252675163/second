"use strict";
/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template11_2/directive",
    "components/templates/micro-activity-template/template11_2/service",
], function () {

    return angular.module("Template11_2", [
        "ionic",
        "Template11_2.directives",
        "Template11_2.Service",
        //"UploadImg"
    ]);
});
