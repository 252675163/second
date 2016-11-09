"use strict";
/**
 * author :lvli
 * time: 2016年7月26日
 * description: 多图片上传
 */

define([
    "ionic",
    "components/multi_image_upload/directive",
    "components/multi_image_upload/service"

], function () {

    return angular.module("MultiImageUpload", [
        "ionic",
        "MultiImageUpload.directive",
        "MultiImageUpload.Service"

    ]);
});
