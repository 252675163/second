"use strict";
/**
 * author :yinglechao
 * time: 2015年9月15日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("MicroOldNewTemplate4.directives", ["ionic"])
        .directive("microOldNewTemplate4", [
                "$window", "$timeout", "microOldNewTemplate4Service", "$ionicModal", "$rootScope", "$ionicScrollDelegate", "maskService", "promptBarService", "commonNetService", function($window, $timeout, microOldNewTemplate4Service, $ionicModal, $rootScope, $ionicScrollDelegate, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template4/template_4.html",
                        link: function(scope, iElement, iAttr) {

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            scope.userInfo =
                            {
                                activityId: "",
                                name: "",
                                phone: "",
                                content: ""
                            };

                            function init() {
                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(microOldNewTemplate4Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                //是否在编辑状态
                                scope.isEdit = scope.status == "edit" ? true : false;

                                //背景图片
                                iElement[0].getElementsByClassName("section")[0].style.backgroundImage = " url" + "(\"" + scope.sectionModel.backgroundImage + "\")";
                                iElement[0].getElementsByClassName("section")[0].style.backgroundSize = "100% 100%";
                                scope.$watch("sectionModel.backgroundImage", function(newValue, oldValue, scope) {
                                    if (newValue != oldValue) {
                                        iElement[0].getElementsByClassName("section")[0].style.backgroundImage = "url" + "(\"" + scope.sectionModel.backgroundImage + "\")";
                                    }
                                });
                                //userType old/new
                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }
                            }

                            init();
                            scope.submitInfo = function() {
                                if (scope.isEdit) {
                                    return;
                                }
                                //scope.isSubmit是否在提交中
                                if (scope.isSubmit == true) {
                                    return;
                                }
                                //表单校验
                                if (!validForm()) {
                                    return;
                                }
                                if (scope.status != "view") {
                                    promptBarService.showErrorBar("预览页面无法保存数据", 3000);
                                    return;
                                }
                                //如果已经提交过表单，判断提交信息是否有更改
                                if (scope.isHaveSubmit == true) {
                                    if (angular.equals(scope.oldUserInfo, scope.userInfo)) {
                                        promptBarService.showErrorBar("请不要重复提交", 3000);
                                        return;
                                    }
                                }

                                //保存数据
                                var date = {
                                    ActivityUserId: scope.userType == "new" ? $rootScope.$stateParams.oldUser : "",
                                    ActivityId: $rootScope.$stateParams.Id,
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    Content: scope.userInfo.content
                                };

                                scope.isSubmit = true;
                                microOldNewTemplate4Service.saveInfo(date, scope.userType).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {
                                        if (scope.userType == "old") {
                                            //分享遮罩

                                            maskService.showMask("", 0, true, 2).then(function() {
                                                //$rootScope.$state.go("activity.oldandnewview", { oldUser: result.data.data }, { reload: true });
                                                var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                                commonNetService.setShareMessageLink(link).then(function () {
                                                    //用户分享或取消分享
                                                    maskService.hideMask();
                                                }, function () {
                                                    //set微信的link出错
                                                    maskService.hideMask();
                                                    promptBarService.showErrorBar("分享出错", 3000);
                                                });
                                            });
                                        } else {
                                            //新用户提示成功信息
                                            maskService.showMask("", 0, true, 2).then(function() {
                                                //$rootScope.$state.go("activity.oldandnewview", { oldUser: result.data.data }, { reload: true });
                                                var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                                commonNetService.setShareMessageLink(link).then(function() {
                                                    //用户分享或取消分享
                                                    maskService.hideMask();
                                                }, function() {
                                                    //set微信的link出错
                                                    maskService.hideMask();
                                                    promptBarService.showErrorBar("分享出错", 3000);
                                                });
                                            });
                                            scope.isHaveSubmit = true;
                                            scope.oldUserInfo = angular.copy(scope.userInfo);

                                        }
                                    } else {
                                        //错误提示
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }

                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                var validState = microOldNewTemplate4Service.isValid(scope.userInfo.name, scope.userInfo.phone);
                                if (validState == 1) {
                                    promptBarService.showErrorBar("请输入姓名！", 3000);
                                    return false;
                                } else if (validState == 3) {
                                    promptBarService.showErrorBar("请输入手机号码！", 3000);
                                    return false;
                                } else if (validState == 4) {
                                    promptBarService.showErrorBar("请输入真实的手机号码！", 3000);
                                    return false;
                                }
                                return true;
                            }


                        }

                    };
                }
            ]
        );
});