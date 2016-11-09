"use strict";
/**
 * author :yinglechao
 * time: 2015年10月23日
 * description:种草
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_3/directive",
    "components/templates/micro-activity-template/template13_3/service",
], function () {

    return angular.module("Template13_3", [
        "ionic",
        "Template13_3.directives",
        "Template13_3.Service",
        //"UploadImg"
    ]);
});
