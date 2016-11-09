"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function () {
    angular.module("ConsultItem.directive", [])
        .directive("consultItem", [
            "$window", "$compile", "$timeout", "$ionicScrollDelegate", "$location"
            , function ($window, $compile, $timeout, $ionicScrollDelegate, $location) {
                return {
                    restrict: "E",
                    scope: {
                        consultData: "=",
                        consultTemplate: "="
                    },
                    templateUrl: "components/consult_item/template.html",
                    link: function (scope, iElement, iAttr) {
                        //var consultData = {
                        //    activityTitle:"场景名称",//场景名称
                        //    content:'[{"name":"班级","value":"xxxx"},{"name":"年龄","value":"XXXX"}]',//JSONOrString 备注字段
                        //    introducerName:"介绍人姓名",//介绍人姓名
                        //    introducerPhone:"介绍人电话",//介绍人电话
                        //    amount:"助力行模板得到的助力数",//助力行模板得到的助力数
                        //    otherInfo:{
                        //        activityInfo:"",
                        //        rank:""//排行
                        //    }
                        //};


                        //var consultTemplate ="在<em>{{consultData. activityTitle}}</em>免费预约<br/>"+
                        //    "<consult-content ><consult-content><br/>"+
                        //    "<span ng-show='consultData.introducerName'>介绍人：<em>{{consultData.introducerName}},{{consultData.introducerPhone}}</em></span>";
                        scope.consultData = scope.consultData;
                        scope.consultTemplate = scope.consultTemplate;

                        //处理备注 兼容老数据
                        try {
                            if (angular.isNumber(angular.fromJson(scope.consultData.content))) {
                                scope.consultData.content = [{ "name": "", value: scope.consultData.content }];
                            } else {
                                scope.consultData.content = angular.fromJson(scope.consultData.content);
                            }
                        } catch (err) {
                            scope.consultData.content = [{ "name": "", value: scope.consultData.content }];
                        }
                        var templateDirective = "<div>" + scope.consultTemplate + "</div>";
                        // $compile.loadBeforeCompile(scope.consultTemplate, (function ($compile, templateDirective,  iElement) {
                        //     return function () {
                                var el = $compile(templateDirective)(scope);
                                iElement.append(el);
                        //     }
                        // })($compile, templateDirective,  iElement));
                    }

                };
            }
        ]
        )
});