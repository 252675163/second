"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_2/directive",
    "components/templates/micro-activity-template/template5_2/service",
], function () {

    return angular.module("Template5_2", [
        "ionic",
        "Template5_2.directives",
        "Template5_2.Service",
        //"UploadImg"
    ]);
});
