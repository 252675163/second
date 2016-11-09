"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroSpellgroup1_6.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microSpellgroup1by6", [
            "$window", "$timeout", "$ionicScrollDelegate", "$rootScope", "microSpellgroup1_6Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService", "$compile", function ($window, $timeout,$ionicScrollDelegate, $rootScope, microSpellgroup1_6Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService, $compile) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_6/template.html",
                    link: function (scope, iElement, iAttr) {
                        //scope.activityExtConfig = {
                        //    NeedHelpCount:3
                        //}
                        scope.spellGroupList = [];
                        scope.defaultHeadImg = window.resourceDoMain + "/app/img/spellgroup_User_default.jpg";

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microSpellgroup1_6Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;

                            scope.activityExtConfig = scope.activityOtherConfig.activityExtConfig;

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
                                scope.spellGroupList = scope.spellGroupList.concat(list);
                            } else {
                                scope.spellGroupList = list;
                            }
                            $timeout(function () {
                                $ionicScrollDelegate.resize();
                            }, 200);
                        };

                        //滚动加载
                        scope.loadMore = function () {
                            //获取未参团列表 todo
                            microSpellgroup1_6Service.getHelpersByActivityId($rootScope.$stateParams.Id, true, scope.page.currentIndex + 1).success(function (result) {
                                // scope.$broadcast("scroll.infiniteScrollComplete");
                                console.log(result);
                                if (result.status == 1) {
                                    scope.renderDataList(result.data.list, "add");
                                    scope.renderListData = result.data.list;
                                    scope.page = result.data.page;
                                    //scope.page.currentIndex++;
                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                                // $ionicScrollDelegate.scrollBottom();
                            });
                        };

                        scope.goDetail = function (spellGroup) {
                            //跳转 todo 后端参数
                            microSpellgroup1_6Service.getHelperList(spellGroup.ActivityUserId).success(function (result) {
                                scope.spellgroupDefaultUserList = result.data.list;
                                
                                var template = "<micro-spellgroup1by6by1></micro-spellgroup1by6by1>"
                                    
                                var el = $compile(template)(scope);
                                maskService.initModal(el);
                                maskService.showModal();

                            })
                        }

                        if (scope.status == "view") {
                            init();

                        }

                    }

                }
            }]
        )

});

