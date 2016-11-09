"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroSpellgroup1_2.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microSpellgroup1by2", [
            "$window", "$timeout", "$rootScope", "$ionicScrollDelegate", "microSpellgroup1_2Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService",
            function ($window, $timeout, $rootScope,$ionicScrollDelegate, microSpellgroup1_2Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_2/template.html",
                    link: function (scope, iElement, iAttr) {
                        //scope.activityExtConfig = {
                        //    NeedHelpCount:3
                        //}
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/spellgroup_User_default.jpg";

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microSpellgroup1_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;

                            scope.activityExtConfig = scope.activityOtherConfig.activityExtConfig;
                            scope.templateData = {};
                            scope.templateData.spellGroupList = [];
                            microSpellgroup1_2Service.setTemplateData(scope.templateData);

                            scope.loadMore();


                        }
                        scope.page = {
                            totalCount: 0,
                            currentIndex: 0,
                            itemCount: 0
                        };
                        //数据渲染
                        scope.renderDataList = function (list, renderType) {
                            //renderType:"reset"/"add"
                            //renderType默认为“reset”
                            if (!renderType) {
                                renderType = "reset";
                            }
                            if (renderType == "add") {
                                scope.templateData.spellGroupList = scope.templateData.spellGroupList.concat(list);

                            } else {
                                scope.templateData.spellGroupList = list;
                            }
                            $timeout(function () {
                                $ionicScrollDelegate.resize();
                            },200);
                        };

                        //滚动加载
                        scope.loadMore = function () {
                            //获取未参团列表 todo
                            microSpellgroup1_2Service.getHelpersByActivityId($rootScope.$stateParams.Id, false, scope.page.currentIndex + 1).success(function (result) {
                                // scope.$broadcast("scroll.infiniteScrollComplete");
                                console.log(result);
                                if (result.status == 1) {
                                    scope.renderDataList(result.data.list, "add");
                                    scope.renderListData = result.data.list;
                                    scope.page = result.data.page;
                                    // scope.page.currentIndex++;
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                                // $ionicScrollDelegate.scrollBottom();
                            });
                        };

                        scope.goDetail = function (spellGroup) {
                            //跳转 如果跳转的是当前页，需要滚动到顶部
                            if ($rootScope.$stateParams.oldUser == spellGroup.ActivityUserId) {
                                $ionicScrollDelegate.scrollTop();
                            } else {
                                $rootScope.$state.go("activity.oldandnewview", { Id: $rootScope.$stateParams.Id, oldUser: spellGroup.ActivityUserId, introducerId: $rootScope.$stateParams.introducerId });
                            }

                        }

                        if (scope.status == "view") {
                            init();

                        }

                    }

                }
            }]
        )

});

