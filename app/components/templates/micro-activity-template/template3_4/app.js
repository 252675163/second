"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_4/directive",
    "components/templates/micro-activity-template/template3_4/service",
], function () {

    return angular.module("Template3_4", [
        "ionic",
        "Template3_4.directives",
        "Template3_4.Service",
        //"UploadImg"
    ]);
});
