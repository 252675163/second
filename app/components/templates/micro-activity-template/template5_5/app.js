"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_5/directive",
    "components/templates/micro-activity-template/template5_5/service",
], function () {

    return angular.module("Template5_5", [
        "ionic",
        "Template5_5.directives",
        "Template5_5.Service",
        //"UploadImg"
    ]);
});
