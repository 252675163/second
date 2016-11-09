"use strict";
/**
 * author :yinglechao
 * time: 2015年9月10日
 * description:
 */

define([
    "ionic",
    "components/error_remind/directive",
    "components/error_remind/service",
    //"libs/jquery/jquery",
    "jquery",                            //以下未知
    "cropper",
    "localResizeIMG4",
    "services/net/common"

], function () {

    return angular.module("ErrorRemind", [
        "ionic",
        "ErrorRemind.directive",
        "ErrorRemind.Service",
        "services.net.common"

    ]);
});
