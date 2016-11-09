"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template3_3/directive",
    "components/templates/micro-activity-template/template3_3/service",
], function () {

    return angular.module("Template3_3", [
        "ionic",
        "Template3_3.directives",
        "Template3_3.Service",
        //"UploadImg"
    ]);
});
