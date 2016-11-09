"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template9_1/directive",
    "components/templates/micro-activity-template/template9_1/service",
], function () {

    return angular.module("Template9_1", [
        "ionic",
        "Template9_1.directives",
        "Template9_1.Service",
        //"UploadImg"
    ]);
});
