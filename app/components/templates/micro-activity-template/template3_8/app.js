"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_8/directive",
    "components/templates/micro-activity-template/template3_8/service",
], function () {

    return angular.module("Template3_8", [
        "ionic",
        "Template3_8.directives",
        "Template3_8.Service",
        //"UploadImg"
    ]);
});
