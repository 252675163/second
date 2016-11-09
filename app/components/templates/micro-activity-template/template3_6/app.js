"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_6/directive",
    "components/templates/micro-activity-template/template3_6/service",
], function () {

    return angular.module("Template3_6", [
        "ionic",
        "Template3_6.directives",
        "Template3_6.Service",
        //"UploadImg"
    ]);
});
