"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_7/directive",
    "components/templates/micro-activity-template/template3_7/service",
], function () {

    return angular.module("Template3_7", [
        "ionic",
        "Template3_7.directives",
        "Template3_7.Service",
        //"UploadImg"
    ]);
});
