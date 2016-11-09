"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/template6/directive",
    "components/templates/new-micro-site-template/template6/service",
    "components/upload_img/app"
], function () {

    return angular.module("MicroTemplate6", [
        "ionic",
        "MicroTemplate6.directives",
        "MicroTemplate6.Service",
        "UploadImg"
    ]);
});
