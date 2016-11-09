"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_4/directive",
    "components/templates/micro-activity-template/template5_4/service",
], function () {

    return angular.module("Template5_4", [
        "ionic",
        "Template5_4.directives",
        "Template5_4.Service",
        //"UploadImg"
    ]);
});
