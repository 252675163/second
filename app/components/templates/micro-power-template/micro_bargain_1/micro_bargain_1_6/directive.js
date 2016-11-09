"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("MicroBargain1_6.directives", [])
        .directive("microBargain1by6", [
                "$window", "$timeout", "$rootScope","$ionicScrollDelegate", "microBargain1_6Service", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope,$ionicScrollDelegate, microBargain1_6Service, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_6/template.html",
                        link: function (scope, iElement, iAttr) {
                            scope.defaultHeadImg = window.resourceDoMain+"/app/img/header_default1.png";
                            scope.defaultName = "XXX";
                            scope.page = {
                                totalCount: 0,
                                currentIndex: 0,
                                itemCount: 0
                            };
//                             //新增renderListData字段，用来判断分页组件是否渲染
                            scope.renderListData = [];

//                             //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            function init() {
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;
                                //userType old/new
                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }
                                // scope.userType = "old";
                                scope.renderListByInit();
                            }

                            scope.renderListByInit = function() {  
                                if (scope.isView && ($rootScope.$state.params.step != "2")) {
                                    scope.userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                    // scope.userId="961";
                                    microBargain1_6Service.getChristmasUserInfos(scope.userId, scope.userType, 1).success(function (result) {
                                        if (result.status == 1) {
                                            scope.renderDataList(result.data);
                                            scope.renderListData = result.data;
                                            scope.page.currentIndex++;
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                    });
                                }
                            }; //数据渲染
                            scope.renderDataList = function(list, renderType) {
                                //renderType:"reset"/"add"
                                //renderType默认为“reset”
                                if (!renderType) {
                                    renderType = "reset";
                                }
                                if (renderType == "add") {
                                    scope.bargaininfoList = scope.bargaininfoList.concat(list);
                                } else {
                                    scope.bargaininfoList = list;
                                }
                            };

//                             //滚动加载
                            scope.loadMore = function() {
                                microBargain1_6Service.getChristmasUserInfos(scope.userId, scope.userType, scope.page.currentIndex + 1).success(function (result) {
                                    // scope.$broadcast("scroll.infiniteScrollComplete");
                                    if (result.status == 1) {
                                        scope.renderDataList(result.data, "add");
                                        scope.renderListData = result.data;
                                        //                                        scope.page = result.data.page;
                                        scope.page.currentIndex++;
                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }
                                    $ionicScrollDelegate.scrollBottom();
                                });
                            };

                            microBargain1_6Service.setRenderCallback(scope.renderListByInit);
                            init();

                        }

                    };
                }
            ]
        );
});