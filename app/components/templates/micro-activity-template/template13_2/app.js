"use strict";
/**
 * author :yinglechao
 * time: 2015年10月23日
 * description:种草
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template13_2/directive",
    "components/templates/micro-activity-template/template13_2/service",
], function () {

    return angular.module("Template13_2", [
        "ionic",
        "Template13_2.directives",
        "Template13_2.Service",
        //"UploadImg"
    ]);
});
