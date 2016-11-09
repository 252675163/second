"use strict";
/**
 * author :wenjun
 * time: 2015年11月23日
 * description:元旦活动模板
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template11_3/directive",
    "components/templates/micro-activity-template/template11_3/service",
], function () {

    return angular.module("Template11_3", [
        "ionic",
        "Template11_3.directives",
        "Template11_3.Service",
        //"UploadImg"
    ]);
});
