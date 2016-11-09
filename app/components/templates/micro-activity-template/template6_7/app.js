"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template6_7/directive",
    "components/templates/micro-activity-template/template6_7/service",
    "services/net/active-form"

], function() {

    return angular.module("Template6_7", [
        "ionic",
        "Template6_7.directives",
        "Template6_7.Service",
        "services.net.activityForm"

        //"UploadImg"
    ]);
});