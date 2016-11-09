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
    "components/templates/micro-activity-template/template11_2/directive",
    "components/templates/micro-activity-template/template11_2/service",
    "components/templates/micro-activity-template/template11_3/directive",
    "components/templates/micro-activity-template/template11_3/service",
], function() {

    return angular.module("Template11", [
        "ionic",
        "Template11_1.directives",
        "Template11_1.Service",
        "Template11_2.directives",
        "Template11_2.Service",
        "Template11_3.directives",
        "Template11_3.Service",
        //"UploadImg"
    ]);
});