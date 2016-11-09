"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template5/directive",
    "components/templates/micro-activity-template/template5/service",
    //"components/upload_img/app"
], function () {

    return angular.module("MicroOldNewTemplate5", [
        "ionic",
        "MicroOldNewTemplate5.directives",
        "MicroOldNewTemplate5.Service",
        //"UploadImg"
    ]);
});
