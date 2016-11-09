"use strict";
/**
 * author :yinglechao (小潘修改)
 * time: 2015年10月23日  
 * update: 2015年12月10日 20:42:24
 * description:圣诞活动
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template20_4/directive",
    "components/templates/micro-activity-template/template20_4/service",
], function () {

    return angular.module("Template20_4", [
        "ionic",
        "Template20_4.directives",
        "Template20_4.Service",
        //"UploadImg"
    ]);
});
