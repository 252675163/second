"use strict";
/**
 * author :zhouhuijuan
 * time: 2016年6月29日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/multi_textinput/app", "components/textinput_callback/app"], function () {
    angular.module("MicroPoster1_6.directives", ["MultiTextInput", "TextInputCallback"])
        .directive("microPoster1by6", [
            "$window", "$timeout", "$rootScope", "microPoster1_6Service", "uploadImgService", "maskService", "promptBarService", "multiTextInputService", "textInputCallbackService", "commonNetService",
            function ($window, $timeout, $rootScope, microPoster1_6Service, uploadImgService, maskService, promptBarService, multiTextInputService, textInputCallbackService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-poster-template/micro_poster_1/micro_poster_1_6/template.html",
                    link: function (scope, iElement, iAttr) {

                        function init() {
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster1_6Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if (angular.equals(scope.templateModel.imageUrl, "") || angular.isUndefined(scope.templateModel.imageUrl)) {
                                scope.sectionModel.templateModel.imageUrl = angular.copy(microPoster1_6Service.model.imageUrl);
                                scope.templateModel.imageUrl = scope.sectionModel.templateModel.imageUrl;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            //背景图片
                            iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage = ' url' + '("' + scope.sectionModel.backgroundImage + '")';
                            iElement[0].getElementsByClassName("bgPan")[0].style.backgroundSize = "100% 100%";
                            scope.$watch('sectionModel.backgroundImage', function (newValue, oldValue, scope) {
                                if (newValue != oldValue) {
                                    iElement[0].getElementsByClassName("bgPan")[0].style.backgroundImage = 'url' + '("' + scope.sectionModel.backgroundImage + '")';
                                }
                            });
                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                        }
                        scope.upLoadHeadImgFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.sectionModel.templateModel.imageUrl = url;
                                });
                            });
                        };
                        scope.updateImg = function (index) {
                            scope.imgIndex = index;
                            if (!scope.isEdit) {
                                return
                            }
                            uploadImgService.upLoadImg(microPoster1_6Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish);
                           
                        };

                        scope.userInfo = {
                            phone: "",
                            name: ""
                        };
                        scope.submitInfo = function () {
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
                                Content: scope.userInfo.content,

                            };

                            scope.isSubmit = true;
                            microPoster1_6Service.saveInfo(date, scope.userType).then(function (result) {
                                if (!scope.isSubmit)
                                    return;
                                scope.isSubmit = false;
                                if (result.data.status == 1) {
                                    if (scope.userType == "old") {
                                        promptBarService.showSuccessBar("报名成功", 3000);
                                        var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                        commonNetService.setShareMessageLink(link).then(function () { }, function () {
                                            promptBarService.showErrorBar("分享出错", 3000);
                                        });
                                    } else {
                                        promptBarService.showSuccessBar("报名成功", 3000);
                                        var link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2)+ "ShareRoute?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                        commonNetService.setShareMessageLink(link).then(function () {
                                        }, function () {
                                            promptBarService.showErrorBar("分享出错", 3000);
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
                            var validState = microPoster1_6Service.isValid(scope.userInfo.name, scope.userInfo.phone);
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

                        init();
                        scope.inputconfig = [
                            {
                                width: 520,
                                height: 71,
                                fontSize: 36
                            }
                        ]
                    }

                }
            }]
        )

});

