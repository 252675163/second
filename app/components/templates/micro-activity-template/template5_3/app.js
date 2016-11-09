"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_3/directive",
    "components/templates/micro-activity-template/template5_3/service",
], function () {

    return angular.module("Template5_3", [
        "ionic",
        "Template5_3.directives",
        "Template5_3.Service",
        //"UploadImg"
    ]);
});
