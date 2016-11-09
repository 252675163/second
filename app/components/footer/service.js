/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function () {
    return angular.module("MyFooter.Service", []).
        factory("myFooterService", [
            "$http", "$timeout", "$q", function ($http, $timeout, $q) {

                var footerService = {};
                footerService.data = {
                    footer: "",
                    tmpobj: {},
                    hideFeedback:false
                };
                //已更新方法  将模板类型 模板ID 活动/官网ID 传入
                footerService.setFooterandObj = function (footer, tmpobj) {
                    footerService.data.footer = footer;
                    footerService.data.tmpobj = tmpobj;
                };
                //
                footerService.setFooter = function (footer) {
                    footerService.data.footer = footer;
                };
                //隐藏举报按钮
                footerService.hideFeedback = function () {
                    footerService.data.hideFeedback = true;
                };
                return footerService;
            }
        ]);
});