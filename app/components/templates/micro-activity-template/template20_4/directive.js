"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template20_3/service"], function() {
    angular.module("Template20_4.directives", ["Template20_1.directives"])
        .directive("template20by4", [
            "$window", "$timeout", "$rootScope", "template20_4Service", "template20_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService",
            function($window, $timeout, $rootScope, template20_4Service, template20_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template20_4/template.html",
                    link: function(scope, iElement, iAttr) {
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/header_default1.png";
                        scope.defaultName = "XXX";
                        scope.page = {
                            totalCount: 0,
                            currentIndex: 0,
                            itemCount: 0
                        };
                        //新增renderListData字段，用来判断分页组件是否渲染
                        scope.renderListData = [];

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            //userType old/new
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.renderListByInit();
                            scope.uiConfig = template20_4Service.getUiConfig();
                            scope.template20_1Model = template20_1Service.getTemplateModel();

                        }

                        scope.renderListByInit = function() {
                            if (scope.isView || (scope.template20_1Model && scope.template20_1Model.helperCount > 0)) {
                                scope.userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                template20_4Service.getVoucherRankUserInfos(scope.userId, scope.userType, 1).success(function(result) {
                                    if (result.status == 1) {
                                        scope.renderDataList(result.data.list);
                                        scope.renderListData = result.data.list;
                                        scope.ticketIsActivited = result.data.isActive;
                                        //                                            scope.page = result.data.page;
                                        scope.page.currentIndex++;
                                    } else {
                                        if (result.error == 1003) {
                                            return;
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
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
                            //如果头像是微信普片，使用微信的小图片  排行记录的图片都来自oss，for循环可删
                            for (var i = 0; i < list.length; i++) {
                                var headImg = list[i].HeadImgUrl;
                                if (headImg.search(/wx.qlogo.cn/) >= 0) {
                                    //使用微信的小图
                                    headImg = headImg.slice(0, headImg.lastIndexOf("/") + 1) + 132;
                                    list[i].HeadImgUrl = headImg;
                                }
                            }
                            if (renderType == "add") {
                                scope.grassRecordList = scope.grassRecordList.concat(list);
                            } else {
                                scope.grassRecordList = list;
                            }
                        };

                        //滚动加载
                        scope.loadMore = function() {
                            if (!(scope.isView || (scope.template20_1Model && scope.template20_1Model.helperCount > 0))) {
                                return;
                            }
                            template20_4Service.getVoucherRankUserInfos(scope.userId, scope.userType, scope.page.currentIndex + 1).success(function(result) {
                                scope.$broadcast("scroll.infiniteScrollComplete");
                                if (result.status == 1) {
                                    scope.renderDataList(result.data.list, "add");
                                    scope.renderListData = result.data.list;
                                    scope.ticketIsActivited = result.data.isActive;
                                    //                                        scope.page = result.data.page;
                                    scope.page.currentIndex++;
                                } else {
                                    if (result.error == 1003) {
                                        return;
                                    } else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }

                                }

                            });
                        };

                        template20_4Service.setRenderCallback(scope.renderListByInit);
                        init();
                    }

                };
            }
        ]);
});