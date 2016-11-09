"use strict";
/**
 * author :yinglechao
 * time: 2015年10月23日
 * description:种草记录
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_4/directive",
    "components/templates/micro-activity-template/template13_4/service",
], function () {

    return angular.module("Template13_4", [
        "ionic",
        "Template13_4.directives",
        "Template13_4.Service",
        //"UploadImg"
    ]);
});
