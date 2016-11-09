"use strict";
/**
 * author :yinglechao
 * time: 2016.6.17
 * description:微传单二
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template25_1/directive",
    "components/templates/micro-activity-template/template25_1/service",
], function () {

    return angular.module("Template25_1", [
        "ionic",
        "Template25_1.directives",
        "Template25_1.Service",
        //"UploadImg"
    ]);
});
