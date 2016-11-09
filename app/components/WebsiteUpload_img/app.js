"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/WebsiteUpload_img/directive",
    "components/WebsiteUpload_img/service",
    //"libs/jquery/jquery",
    "jquery",
    "localResizeIMG4",
    "services/net/common"
], function () {

    return angular.module("WebsiteUploadImg", [
        "ionic",
        "WebsiteUploadImg.directive",
        "WebsiteUploadImg.Service",
        "services.net.common"

    ]);
});
