"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_1/directive",
    "components/templates/micro-activity-template/template5_1/service",
], function () {

    return angular.module("Template5_1", [
        "ionic",
        "Template5_1.directives",
        "Template5_1.Service",
        //"UploadImg"
    ]);
});
