"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:备考小贴士
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template7/directive",
    "components/templates/micro-activity-template/template7/service",
], function () {

    return angular.module("Template7", [
        "ionic",
        "Template7.directives",
        "Template7.Service",
        //"UploadImg"
    ]);
});
