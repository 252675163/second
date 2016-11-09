"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template4/directive",
    "components/templates/micro-activity-template/template4/service",
    "services/net/active-form"
    //"components/upload_img/app"
], function() {
    return angular.module("MicroOldNewTemplate4", [
        "ionic",
        "MicroOldNewTemplate4.directives",
        "MicroOldNewTemplate4.service",
        "services.net.activityForm"
        //"UploadImg"
    ]);
});