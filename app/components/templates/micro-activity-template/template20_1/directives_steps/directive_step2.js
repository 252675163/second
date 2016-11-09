"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template20_1/service"], function() {
    angular.module("Template20_1Step2.directives", ["Template20_1.Service"])
        .directive("template20by1Step2", [
                "$window", "$timeout", "$rootScope", "template20_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "userTermsService", function ($window, $timeout, $rootScope, template20_1Service, uploadImgService, maskService, promptBarService, commonNetService, userTermsService) {
                    return {
                        restrict: "EA",
                        //使用parent 的scope
                        scope: false,
                        templateUrl: "components/templates/micro-activity-template/template20_1/templates_steps/template_step2.html",
                        link: function(scope, iElement, iAttr) {
                            var defaultHeadImgUrl = window.resourceDoMain+"/app/img/grow_vegetables_1_photo.png";
                            //表单页用到的数据
                            scope.userInfo = {
                                name: "",
                                phone: "",
                                headImg: ""
                            };
                            //用户条款是否选中
                            scope.isCheckUserTerms = true;
                            function init() {
                                if(scope.status == "view"){
                                    //屏蔽朋友圈菜单
                                    if(!scope.isUseWeinxinShare){
                                        window.wx && window.wx.hideMenuItems({
                                            menuList: ["menuItem:share:timeline"]
                                        });
                                    }

                                }
                                if (scope.status != "view") {
                                    scope.userInfo = {
                                        name: "",
                                        phone: "",
                                        headImg: defaultHeadImgUrl
                                    };
                                    $timeout(function() {
                                        $(".lockMask-loading2").hide();
                                    }, 800);
                                } else {
                                    template20_1Service.getWeixinUserInfo().success(function(result) {
                                        if (result.status == 1) {
                                            scope.userInfo = {
                                                name: "",
                                                phone: "",
                                                headImg: result.data.HeadImgUrl || defaultHeadImgUrl
                                            };
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                            if(scope.userInfo.headImg.search(/wx.qlogo.cn/)>=0){
                                                var str = scope.userInfo.headImg;
                                                //使用微信的中等大小图
                                                scope.userInfo.headImg=str.slice(0,str.lastIndexOf("/")+1)+96;
                                            }

                                        $timeout(function() {
                                            $(".lockMask-loading2").hide();
                                        }, 800);
                                    });
                                }

                                //Warning disable  ionic  keyboard 
                                if (ionic.Platform.isIOS()) {
                                    ionic.keyboard.disable();
                                }
                            }

                            init();

                            scope.submitInfo = function() {
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
                                    Config: JSON.stringify({ headImg: scope.userInfo.headImg })
                                };

                                scope.isSubmit = true;
                                template20_1Service.saveInfo(date).then(function(result) {
                                    scope.isSubmit = false;
                                    if (result.data.status == 1 && scope.isNeedHelp) {


                                        if(scope.isUseWeinxinShare){
                                            //var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                            //var link = window.shareServer + "/CreativeView"+"/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                            var link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                            var config = commonNetService.getShareConfig();
                                            if (config) {
                                                config.link = link;

                                                //有助力分享信息
                                                if (scope.isNeedHelp) {
                                                    config.title = "【还差" + scope.templateModel.helperCount + "人】我的" + scope.templateModel.couponsAmount + "元学费代金券就激活啦~ ";
                                                    config.desc = "快来帮我激活学费代金券，优惠多少就看你的了！";
                                                }
                                                //无助力分享信息
                                                else {
                                                    config.title = scope.userInfo.name ? scope.userInfo.name + "送你一张学费代金券~" : config.title;
                                                    config.desc = "快来领取你的学费代金券，看看金额是多少！";
                                                }

                                                config.imgUrl = scope.userInfo.headImg||config.imgUrl;
                                            }

                                            maskService.showMask("",0,false,9);
                                            commonNetService.setShareMessageReception(config).then(function () {
                                                //用户分享或取消分享
                                                maskService.hideMask();
                                            }, function () {
                                                //set微信的link出错
                                                maskService.hideMask();
                                                promptBarService.showErrorBar("分享出错", 3000);
                                            });


                                        }else{
                                            //如果不使用微信的自定义分享
                                            //$rootScope.$state.go("activity.oldandnewview", { step: "1", oldUser: result.data.data },{reload:true});
                                            if(window.isAllowDirectShare){
                                                window.location.href=window.shareServer + "/CreativeView"+"/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + result.data.data;
                                            }else{
                                                $rootScope.$state.go("activity.oldandnewview", { step: "1", oldUser: result.data.data },{});
                                            }
                                        }

                                        scope.isHaveSubmit = true;
                                        scope.oldUserInfo = angular.copy(scope.userInfo);
                                    }
                                    //无助力无需分享 直接跳转到step3
                                    else if (result.data.status == 1 && !scope.isNeedHelp) {
                                        $rootScope.$state.go("activity.oldandnewview", { step: "3", oldUser: result.data.data },{});
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                }, null);
                            };

                            //表单校验
                            function validForm() {
                                var validState = template20_1Service.isValid(scope.userInfo.name, scope.userInfo.phone);
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


                            scope.upLoadHeadImgFinish = function(url) {
                                $timeout(function() {
                                    scope.$apply(function() {
                                        scope.userInfo.headImg = url;
                                    });
                                });
                            };
                            scope.updateHeadImg = function() {

                                uploadImgService.upLoadImg(template20_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });
                                

                            };
                            //显示用户条款弹窗
                            scope.showUserTerms = function () {
                                userTermsService.showUserTerms();
                            }

                            // 用户勾选用户条款 todo
                            scope.checkUserTerms = function () {
                                scope.isCheckUserTerms = !scope.isCheckUserTerms;
                            }
                        }

                    };
                }
            ]
        );
});