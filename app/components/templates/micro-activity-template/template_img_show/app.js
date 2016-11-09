"use strict";
/**
 * author :陈雪冬
 * modified: 陈天宇
 * time: 2016年7月26日16:14:48
 * update: 2016年7月26日16:14:48
 * description:新增图片页
 */

define([
    "ionic",
    "components/templates/micro-activity-template/template_img_show/directive",
    "components/templates/micro-activity-template/template_img_show/service",

], function () {

    return angular.module("TemplateImgShow", [
        "ionic",
        "TemplateImgShow.directives",
        "TemplateImgShow.Service"
    ]);
});
