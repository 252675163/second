"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description:site-cover
 */

define([
    "ionic",
    "components/templates/new-micro-site-template/site-qr-code/directive",
    "components/templates/new-micro-site-template/site-qr-code/service",
], function () {

    return angular.module("siteQrCode", [
        "ionic",
        "siteQrCode.directives",
        "siteQrCode.Service",
        //"UploadImg"
    ]);
});
