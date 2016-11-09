"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/upload_img/directive",
    "components/upload_img/service",
    //"libs/jquery/jquery",
    "jquery",
    "cropper",
    "localResizeIMG4",
    "services/net/common"

], function () {

    return angular.module("UploadImg", [
        "ionic",
        "UploadImg.directive",
        "UploadImg.Service",
        "services.net.common"

    ]);
});
