"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template2_2_7/directive",
    "components/templates/micro-activity-template/template2_2_7/service",
    "services/net/active-form"
    //"components/upload_img/app"
], function () {
    return angular.module("microOldNewTemplate227", [
        "ionic",
        "microOldNewTemplate2_2_7.directives",
        "microOldNewTemplate2_2_7.service",
        "services.net.activityForm"
        //"UploadImg"
    ]);
});
