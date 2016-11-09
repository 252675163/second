"use strict";
/**
 * author :yinglechao
 * time: 2015年12月2日
 * description:
 */


define(["ionic","components/site_form/service"], function() {
    angular.module("SiteForm.directive", [ "SiteForm.Service"])
        .directive("siteForm", [
                "$window", "$timeout", "$rootScope", "siteFormService", "promptBarService", "maskService", "commonNetService", function($window, $timeout, $rootScope, siteFormService, promptBarService, maskService, commonNetService) {
                    return {
                        restrict: "EA",
                        //继承父作用域
                        scope: true,
                        templateUrl: "components/site_form/template.html",
                        link: function(scope, iElement, iAttr) {
                            //scope.siteForm = siteFormService.siteForm;
                            scope.siteFormData = siteFormService.siteFormData;
                            scope.userInfo = {
                                name: "",
                                phone: ""
                            };
                            scope.hideForm = function() {
                                scope.siteFormData.isShow = false;
                                scope.userInfo = {
                                    name: "",
                                    phone: ""
                                };
                            };


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
                                if (scope.siteFormData.status != "view") {
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
                                //组装数据
                                var content = [];

                                if(scope.siteFormData.from=='course'){
                                    content.push({ name: "意向课程", value: scope.siteFormData.viewList[scope.siteFormData.currentIndex].courseType.name + "-" + scope.siteFormData.viewList[scope.siteFormData.currentIndex].course.name });
                                }else if(scope.siteFormData.from=='campus'){
                                    content.push({ name: "校区", value: scope.siteFormData.viewList[scope.siteFormData.currentIndex].campusName });
                                }

                                if (siteFormService.siteFormData.content) {
                                    content.push(siteFormService.siteFormData.content);
                                }
                                var date = {
                                    WebsiteId: $rootScope.$stateParams.id,
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    Content: JSON.stringify(content)
                                };


                                scope.isSubmit = true;
                                siteFormService.saveInfo(date).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1) {
                                        promptBarService.showSuccessBar("您的预约已提交，请等待机构联络！", 3000, function() {
                                            scope.hideForm();
                                        });
                                        scope.isHaveSubmit = true;
                                        scope.oldUserInfo = angular.copy(scope.userInfo);

                                    } else {
                                        //错误提示
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }

                                }, null);
                            };


                            //表单校验
                            function validForm() {
                                var validState = siteFormService.isValid(scope.userInfo.name, scope.userInfo.phone);
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


                            //路由发生变化，裁剪框消失
                            var stateChangeStart = $rootScope.$on("$stateChangeStart",
                                function(event, toState, toParams, fromState, fromParams) {
                                    scope.hideForm();
                                });

                            //销毁rootScope上的事件
                            scope.$on("$destroy", function() {
                                //destroy the ui.router [stateChageStart] event  
                                stateChangeStart();
                            });
                        }

                    };
                }
            ]
        );
});