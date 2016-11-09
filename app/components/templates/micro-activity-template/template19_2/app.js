"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日  
 * update: 2015年12月10日 19:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template19_2/directive",
    "components/templates/micro-activity-template/template19_2/service",
], function () {

    return angular.module("Template19_2", [
        "ionic",
        "Template19_2.directives",
        "Template19_2.Service",
        //"UploadImg"
    ]);
});
