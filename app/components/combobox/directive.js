"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年4月20日
 * description:
 */


define(["ionic"], function() {
    angular.module("Combobox.directive", [])
        .directive("combobox", [
                "$window", "$timeout", "$rootScope", "comboboxService", "promptBarService", "maskService", "commonNetService", function($window, $timeout, $rootScope, comboboxService, promptBarService, maskService, commonNetService) {
                    return {
                        restrict: "EA",
                        //继承父作用域
                        scope: true,
                        templateUrl: "components/combobox/template.html",
                        link: function(scope, iElement, iAttr) {
                            scope.comboboxData = comboboxService.comboboxData;

                            scope.chooseCombobox = function (item) {
                                scope.comboboxData.currentValue = item.name;
                            scope.comboboxData.callBack(item);
                            scope.comboboxData.isShow = false;
                            }

                           scope.hideCombobox = function () {
                               scope.comboboxData.isShow = false;
                            };
                            //路由发生变化，裁剪框消失
                        var stateChangeStart = $rootScope.$on("$stateChangeStart",
                            function (event, toState, toParams, fromState, fromParams) {
                                scope.hideCombobox();
                            });

                            //销毁rootScope上的事件
                        scope.$on("$destroy", function () {
                                //destroy the ui.router [stateChageStart] event  
                             stateChangeStart();
                            });
                        }
                    };
                }
        ]
        );
});