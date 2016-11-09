"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template18_1/service"], function () {
    angular.module("Template18_1Step1.directives", ['Template18_1.Service'])
        .directive("template18by1Step1", [
            "$window", "$timeout", "$rootScope", "template18_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template18_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: 'EA',
                    scope: {
                        templateModel: "=",
                        isEnd: "=",
                        status: "=",
                        userInfoOfReference: "="
                    },
                    templateUrl: "components/templates/micro-activity-template/template18_1/directive_step1/template_step1.html",
                    link: {
                        pre: function preLink(scope, iElement, iAttr) {
                            function init() {
                                iElement[0].getElementsByClassName("ChenBg_1")[0].style.background = "url('" + window.resourceDoMain + "/app/img/body_bg_24_1.jpg') no-repeat center center";
                                iElement[0].getElementsByClassName("ChenBg_1")[0].style.backgroundSize = "100% 100%";

                                iElement[0].getElementsByClassName("ChenBg_2")[0].style.background = "url('" + window.resourceDoMain + "/app/img/body_bg_24-2_1.jpg') no-repeat center center";
                                iElement[0].getElementsByClassName("ChenBg_2")[0].style.backgroundSize = "100% 100%";

                                scope.isEdit = scope.status == "edit" ? true : false;
                                if (scope.status != "view") {
                                    scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(scope.templateModel.couplet);
                                } else {
                                    if(scope.userInfoOfReference&&scope.userInfoOfReference.couplet&&(!angular.equals(scope.userInfoOfReference.couplet,[]))){
                                        scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(scope.userInfoOfReference.couplet);
                                    }

                                    //scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(scope.userInfoOfReference.couplet);
                                }

                                scope.isShowView1 = !scope.isEdit;
                                if (!scope.isEdit) {
                                    //loading效果隐藏后后执行动画
                                    scope.$on("hideLoading", function () {
                                        scope.isAnimation = true;
                                    });
                                }
                                //编辑状态下监听templateModel的变化，默认对联使用特殊字体
                                if (scope.isEdit) {
                                    scope.$watch('templateModel.couplet', function (newValue, oldValue, scope) {
                                        if (newValue != oldValue) {
                                            scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(newValue);
                                        }
                                    }, true);
                                }else{
                                    scope.$watch('userInfoOfReference.couplet', function (newValue, oldValue, scope) {
                                        if (newValue != oldValue) {
                                            scope.isUseStylizedFont = template18_1Service.coupletIsInDefaultCouplet(newValue);
                                        }
                                    }, true);
                                }


                            }

                            init();

                            scope.showView2 = function () {
                                scope.isShowView1 = false;
                                scope.isHaveCoupletsAnimation = true;
                            };
                            scope.goStep2 = function () {
                                if (scope.isEdit) {
                                    return;
                                }
                                if (scope.status == "preview") {
                                    $rootScope.$state.go("activity.oldandnewpreview", {step: "2"});
                                } else if (scope.status == "view") {
                                    $rootScope.$state.go("activity.oldandnewview", {step: "2"});
                                }
                            };

                            //图片比例
                            scope.imgAspectRatio = [1, 1];
                            scope.upLoadFinish = function (url) {
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.templateModel.imageUrl[scope.imgIndex] = url;
                                    })
                                });
                            };
                            scope.updateImg = function (imgIndex) {
                                if (!scope.isEdit) {
                                    return
                                }
                                scope.imgIndex = imgIndex;
                                uploadImgService.upLoadImg(template18_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                            };

                        }
                    }
                }
            }]
    )

});

