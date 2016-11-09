"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_5/directive",
    "components/templates/micro-activity-template/template3_5/service",
], function () {

    return angular.module("Template3_5", [
        "ionic",
        "Template3_5.directives",
        "Template3_5.Service",
        //"UploadImg"
    ]);
});
