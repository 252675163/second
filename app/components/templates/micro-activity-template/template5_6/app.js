"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5_6/directive",
    "components/templates/micro-activity-template/template5_6/service",
    //"services/net/active-form"

], function() {

    return angular.module("Template5_6", [
        "ionic",
        "Template5_6.directives",
        "Template5_6.Service",
        //"services.net.activityForm"
        //"UploadImg"
    ]);
});