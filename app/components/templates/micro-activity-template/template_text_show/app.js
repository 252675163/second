"use strict";
/**
 * author :陈天宇
 * time: 2016年10月18日15:23:12
 * description:新增文字多图页
 */

/*global define */
/*global angular */

define([
    "ionic",
    "components/templates/micro-activity-template/template_text_show/directive",
    "components/templates/micro-activity-template/template_text_show/service",
    "components/templates/micro-activity-template/template_img_show/service",

], function () {

    return angular.module("TemplateTextShow", [
        "ionic",
        "TemplateTextShow.directives",
        "TemplateTextShow.Service",
        "TemplateImgShow.Service"
    ]);
});
