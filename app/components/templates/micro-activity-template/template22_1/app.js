"use strict";
/**
 * author :yinglechao
 * time: 2016.5.17
 * description:微传单
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template22_1/directive",
    "components/templates/micro-activity-template/template22_1/service",
], function () {

    return angular.module("Template22_1", [
        "ionic",
        "Template22_1.directives",
        "Template22_1.Service",
        //"UploadImg"
    ]);
});
