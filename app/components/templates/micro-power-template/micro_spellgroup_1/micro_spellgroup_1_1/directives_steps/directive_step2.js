"use strict";
/**
 * author :
 * time:
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/service"], function () {
    angular.module("MicroSpellgroup1_1Step2.directives", ["MicroSpellgroup1_1.Service"])
        .directive("microSpellgroup1by1Step2", [
                "$window", "$timeout", "$rootScope", "microSpellgroup1_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "userTermsService", function ($window, $timeout, $rootScope, microSpellgroup1_1Service, uploadImgService, maskService, promptBarService, commonNetService, userTermsService) {
                    return {
                        restrict: "EA",
                        scope: false,
                        templateUrl: "components/templates/micro-power-template/micro_spellgroup_1/micro_spellgroup_1_1/templates_steps/template_step2.html",
                        link: function (scope, iElement, iAttr) {
                           
                            //用户条款是否选中
                            scope.isCheckUserTerms = true;
                          
                            scope.submitInfo = function () {


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

                                //保存数据
                                var date = {
                                    ActivityId: $rootScope.$stateParams.Id,//参团不需要此参数
                                    ActivityUserId: $rootScope.$stateParams.oldUser || "",//开团不需要此参数
                                    IntroducerUserId: $rootScope.$stateParams.introducerId || "",
                                    Name: scope.userInfo.name,
                                    Phone: scope.userInfo.phone,
                                    HeadImgUrl: scope.userInfo.headImg,
                                    Config: JSON.stringify({ headImg: scope.userInfo.headImg })//参团不需要此参数
                                };

                                scope.isSubmit = true;
                                if (scope.formType == 1) {
                                    //console.log("开团请求");
                                    //开团
                                    microSpellgroup1_1Service.addActivityUser(date).success(function (result) {
                                        scope.isSubmit = false;
                                        if (result.status == 1) {

                                            ////打开页面 todo
                                            //code：1：开团成功，2：已参加过该活动
                                            //activityUserId 活动用户Id
                                            //introducerUserId   咨询本Id
                                            if (result.data.Code == 1) {
                                                scope.closeAllPopup();
                                                microSpellgroup1_1Service.shareConfigCache = {
                                                    id: $rootScope.$stateParams.Id,
                                                    activityUserId: result.data.ActivityUserId,
                                                    introducerId: result.data.IntroducerUserId,
                                                    name: scope.userInfo.name,
                                                    headImg: scope.userInfo.headImg,
                                                    needHelp: scope.activityExtConfig.NeedHelpCount,
                                                    currntHelpCount: 1
                                                }
                                                $rootScope.$state.go("activity.oldandnewview", { Id: $rootScope.$stateParams.Id, oldUser: result.data.ActivityUserId, introducerId: result.data.IntroducerUserId });

                                                //toto 在service上记录信息

                                            } else {
                                                scope.closeAllPopup();
                                                scope.showPopup(3);
                                                scope.currentUser.introducerId = result.data.IntroducerUserId;
                                                scope.currentUser.activityUserId = result.data.ActivityUserId;
                                                //显示已参加过的团
                                                //promptBarService.showErrorBar("已参加过该活动");
                                            }
                                            //设置jsjdk
                                            scope.resetShareConfig(result.data.ActivityUserId, result.data.IntroducerUserId, scope.activityExtConfig.NeedHelpCount, 1, scope.userInfo.name, scope.userInfo.headImg)

                                        } else {
                                            promptBarService.showErrorBar(result.message);

                                        }
                                    }, null);
                                } else {
                                    //参团
                                    //console.log("参团请求");
                                    microSpellgroup1_1Service.helpAndAddConsult(date).success(function (result) {
                                        scope.isSubmit = false;
                                        console.log(result)
                                        if (result.status == 1) {
                                            //参团成功
                                            //code：1：参团成功，2：已参加过该活动
                                            //activityUserId 活动用户Id
                                            //设置jsjdk+动效
                                            if (result.data.Code == 1) {
                                                scope.currentUser.isApplyThisGroup = true;
                                                scope.closePopup(1);
                                                //动画
                                                scope.doHeaderAnimate().then(function () {
                                                    scope.spellgroupUserList.push({ HeadImgUrl: scope.userInfo.headImg, Name: scope.userInfo.name });
                                                    scope.resetShareConfig($rootScope.$stateParams.oldUser, result.data.IntroducerUserId, scope.activityExtConfig.NeedHelpCount, scope.spellgroupUserList.length, scope.userInfo.name, scope.userInfo.headImg)

                                                    if (scope.spellgroupUserList.length == scope.activityExtConfig.NeedHelpCount) {
                                                        //如果拼团满动画完成之后 拼团完成弹窗
                                                        scope.showPopup(4);
                                                    }

                                                });

                                                //设置jsjdk

                                            } else if (result.data.Code == 2) {
                                                //已参加过活动
                                                scope.closeAllPopup();
                                                scope.showPopup(3);
                                                scope.currentUser.introducerId = result.data.IntroducerUserId;
                                                scope.currentUser.activityUserId = result.data.ActivityUserId;
                                                //promptBarService.showErrorBar("您已参加过该活动！");
                                            }
                                        } else {
                                            //result.error 与后端约定好 1005：为此团已满
                                            if (result.error == 1005) {
                                                scope.closePopup(1);
                                                scope.showPopup(2);
                                                //重新渲染list
                                                scope.renderHelperList();
                                            } else {
                                                promptBarService.showErrorBar(result.message);
                                            }
                                        }
                                    }, null);
                                }
                            };

                            //表单校验
                            function validForm() {
                                var validState = microSpellgroup1_1Service.isValid(scope.userInfo.name, scope.userInfo.phone);
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
                                if (!scope.isCheckUserTerms) {
                                    promptBarService.showErrorBar("请同意用户条款！", 3000);
                                    return false;
                                }
                                return true;
                            }


                            scope.upLoadHeadImgFinish = function (url) {
                                $timeout(function () {
                                    scope.$apply(function () {
                                        scope.userInfo.headImg = url;
                                    });
                                });
                            };
                            scope.updateHeadImg = function () {

                                uploadImgService.upLoadImg(microSpellgroup1_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish);

                                //重写uploadImgService中upload方法，头像上传为小图 300* 300  by xp 2015年12月9日 21:12:43
                                uploadImgService.upload = function (fileName, content, usage) {
                                    return commonNetService.uploadHeadImg(fileName, content, usage);
                                };
                            };
                            //显示用户条款弹窗
                            scope.showUserTerms = function () {
                                userTermsService.showUserTerms();
                            }
                            // 用户勾选用户条款
                            scope.checkUserTerms = function () {
                                scope.isCheckUserTerms = !scope.isCheckUserTerms;
                            }
                        }

                    };
                }
        ]
        );
});