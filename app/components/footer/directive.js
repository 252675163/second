"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 * 
 * 修改时间：2016年6月17日18:29:28    添加举报入口 及举报表单 By 陈雪冬
 */


define(["ionic", "components/footer/service"], function () {
    angular.module("MyFooter.directive", ['MyFooter.Service'])
        .directive("myFooter", [
            "$window", "$timeout", "$ionicLoading", "$compile", "$document", "myFooterService",function ($window, $timeout, $ionicLoading, $compile, $document, myFooterService) {
                return {
                    restrict: "E",
                    scope: true,
                    templateUrl: "components/footer/template.html",
                    link: function (scope, iElement, iAttr) {
                        //data 中 初始化  带入 模板类型（官网1，1-6）  模板ID（TemplateId，）  实例（活动/官网：Id）ID
                        //待确认   添加 是否显示举报按钮
                        scope.data = myFooterService.data;

                        //点击举报按钮   显示提示框
                        scope.reportfeedback = function () {
                            ionic.EventController.trigger("showFeedbackForm");
                        }
                    }
                };
            }
        ]
        );
});