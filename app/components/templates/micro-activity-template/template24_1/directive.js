"use strict";
/**
 * author :
 * time: 
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template24_4/service", "components/templates/micro-activity-template/template24_5/service"], function () {
    angular.module("Template24_1.directives", [])
        .directive("template24by1", [
            "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template24_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", "template24_4Service", "template24_5Service",
            function ($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template24_1Service, uploadImgService, maskService, promptBarService, commonNetService, template24_4Service, template24_5Service) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-activity-template/template24_1/template.html",
                    link: function (scope, iElement, iAttr) {

                        scope.getImageDoMain = function (url) {
                            return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                        };
                        scope.defaultHeadImg = scope.getImageDoMain('/default_avatar.png');; //默认的用户头像
                        scope.gifts = []; //表示已有多少个礼物
                        var defaultHeadBarTitle = "快来创建你";
                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        scope.renderGrassHat = function (score) {
                            scope.grassUrl = template24_1Service.getGrassUrlByGrassCount(score);
                            scope.grassClass = template24_1Service.getGrassClasByGrassCount(score);
                        };

                        function init() {
                            //屏蔽相关菜单
                            window.wx && window.wx.hideMenuItems({
                                menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                            });

                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(template24_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            //背景图片
                            var docEl = document.documentElement;
                            var clientWidth = docEl.clientWidth;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                            if ($rootScope.$stateParams.oldUser) {
                                scope.userType = "new";
                            } else {
                                scope.userType = "old";
                            }
                            scope.isHaveAddGrass = false;
                            scope.step = $rootScope.$stateParams.step || 1;
                            scope.userInfo1 = {};
                            scope.headBarTitle = scope.step == 2 ? defaultHeadBarTitle + scope.templateModel.headBarTitle : scope.templateModel.name + scope.templateModel.headBarTitle;
                            //如果是查看页面
                            if (scope.status == "view") {
                                //当前访问者（当前用户）的信息
                                scope.visitorInfo = {
                                    isSelfShare: false //是否是当前连接的分享者
                                };
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;

                                template24_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                    if (result.status == 1) {
                                        if (scope.userType == "new") {
                                            scope.userInfo1 = {
                                                name: result.data.Name || "",
                                                headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : scope.defaultHeadImg,
                                                grassCount: result.data.Score,
                                                rank: result.data.Rank
                                            };
                                        } else {
                                            scope.userInfo1 = {
                                                name: scope.templateModel.name,
                                                headImg: scope.templateModel.imageUrl[0] || scope.defaultHeadImg,
                                                grassCount: result.data.Score,
                                                rank: result.data.Rank
                                            };
                                        }
                                        scope.headBarTitle = scope.step == 2 ? defaultHeadBarTitle + scope.templateModel.headBarTitle : scope.userInfo1.name + scope.templateModel.headBarTitle;
                                        //当前访问者（当前用户）的信息
                                        scope.visitorInfo = {
                                            isSelfShare: result.data.IsSelfShare
                                        }
                                        //去生成礼物
                                        scope.groupGifUrl = result.data.Score > 0 ? '/active_gif.gif' : '';
                                        //warning 设置userInfo 至排行榜，数据互通 
                                        template24_5Service.setUserInfo(scope.userInfo1);
                                        //scope.renderGrassHat(scope.userInfo1.grassCount);
                                        scope.isHaveGrow = result.data.IsHaveGrow;
                                        scope.isHaveAddGrass = result.data.IsHaveGrow;
                                        var currentTitle = scope.templateExtConfig.shareConfigByVisitor[0].title;
                                        currentTitle = currentTitle.replace("{{shareUser.name}}", scope.userInfo1.name);
                                        if (scope.step == 1) {
                                            $rootScope.$state.current.title = currentTitle;
                                        }
                                        var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                        var link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id;
                                        if ($rootScope.$stateParams.oldUser) {
                                            link = link + "&oldUser=" + $rootScope.$stateParams.oldUser;
                                        }
                                        var config = commonNetService.getShareConfig();
                                        var shareTitle = scope.templateExtConfig.shareConfigByVisitor[0].title;
                                        if (config) {
                                            config.link = link;
                                            config.title = shareTitle.replace("{{shareUser.name}}", scope.userInfo1.name);;
                                            config.desc = scope.templateExtConfig.shareConfigByVisitor[0].discription;
                                            config.imgUrl = scope.templateExtConfig.shareConfigByVisitor[0].imgUrl || scope.userInfo1.headImg || config.imgUrl;
                                        }
                                        commonNetService.setShareMessageReception(config);

                                    }
                                });


                            }

                        }

                        init();

                        //图片上传
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                });
                            });
                        };
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return;
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(template24_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };

                        //选择草
                        scope.chooseGrassAction = function (index) {

                            //是否在种草请求中
                            if (scope.isAddGrassing == true) {
                                return;
                            }
                            var defaultGifUrl = "/template1_item1_gif.gif";
                            scope.itemGifUrl = defaultGifUrl;

                            //如果当前助力人数大于500人，需要输入验证码
                            if (scope.userInfo1.grassCount > 500) {
                                //显示验证码弹窗
                                scope.showVerify();
                            } else {

                                scope.isAddGrassing = true;
                                //旋转动画
                                scope.isGrow = true;
                                scope.isDance = false;
                                //1.5秒后动画消失
                                $timeout(function () {
                                    scope.isGrow = false;
                                }, 1500);

                                scope.isHideDddGrassButton = true;
                                scope.addGrass();

                            }

                        };
                        scope.addGrass = function () {
                            if (scope.status == "preview") {
                                scope.isHaveAddGrass = true;
                                scope.isDance = true;
                            } else {
                                scope.isAddGrassing = true;
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$stateParams.Id;
                                template24_1Service.updateChristmasScore(userId, scope.userType, scope.captcha).success(function (result) {
                                    scope.isAddGrassing = false;
                                    if (result.status == 1) {
                                        scope.isHideDddGrassButton = true;
                                        scope.isHaveAddGrass = true;
                                        scope.userInfo1.grassCount++;
                                        //如果输入过验证码，重新做动画效果
                                        if (scope.captcha) {
                                            //旋转动画1.5秒
                                            scope.isGrow = true;
                                            scope.isDance = false;
                                            $timeout(function () {
                                                scope.isGrow = false;
                                            }, 1500)
                                                .then(function () {
                                                    scope.isDance = true;
                                                })
                                            //关闭验证码弹窗
                                            scope.closeVerify();
                                        } else {
                                            scope.isDance = true;

                                        }

                                    } else {
                                        scope.isGrow = false;
                                        //promptBarService.showErrorBar(result.message);
                                        if (result.error == 7) {
                                            //重复助力
                                            scope.isHideDddGrassButton = true;
                                            promptBarService.showErrorBar(result.message, 3000);

                                        } else {

                                            scope.isHideDddGrassButton = false;


                                            if (result.error == 10002) {
                                                promptBarService.showErrorBar("验证码过期！", 3000);
                                            } else if (result.error == 10003) {
                                                promptBarService.showErrorBar("验证码错误！", 3000);
                                            } else if (result.error == 10001) {
                                                if (scope.isShowVerify) {
                                                    promptBarService.showErrorBar("验证码为空！", 3000);
                                                }
                                            } else {
                                                promptBarService.showErrorBar(result.message, 3000);
                                            }
                                            if (result.error == 10002 || result.error == 10001 || result.error == 10003) {
                                                scope.showVerify();
                                                scope.captcha = "";
                                            }

                                        }
                                    }
                                });
                            }
                        };

                        //关闭验证码
                        scope.closeVerify = function () {
                            $ionicScrollDelegate.freezeAllScrolls(false);

                            //关闭弹窗
                            scope.isShowVerify = false;

                        }
                        scope.showVerify = function () {
                            $ionicScrollDelegate.scrollTop();
                            $ionicScrollDelegate.freezeAllScrolls(true);
                            //关闭旋转动效
                            scope.isGrow = false;
                            scope.isShowVerify = true;
                            scope.reGetVerifyCode();
                        }
                        //点击验证码的助力
                        scope.cilckVerifyConfirm = function () {
                            //是否正在助力请求
                            if (scope.isAddGrassing == true) {
                                return;
                            } else if (!scope.captcha) {
                                promptBarService.showErrorBar("验证码为空！", 3000);
                            } else {
                                scope.addGrass();
                            }


                        }
                        //跳转到信息填写页面
                        scope.goForm = function () {
                            if (scope.isEdit) {
                                return;
                            }

                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, {
                                    step: "2"
                                });
                            } else if (scope.status == "view") {
                                if (scope.visitorInfo.isSelfShare) {
                                    //如果该链接是自己分享出来的话出遮罩，引导分享
                                    //todo 图片替换
                                    return;
                                }
                                $rootScope.$state.go("activity.oldandnewview", {
                                    step: "2"
                                });
                            }
                        };

                        //todo
                        //超过500的处理情况
                        //超过五百票的处理情况
                        //1.显示弹出层
                        //2.调用验证码接口  拿到验证码图片
                        //scope.voteThisandcheck = function () {

                        //    if (!d.IsHaveGrow && scope.status == "view") {
                        //        scope.captcha = "";
                        //        //iElement.find("#captcha")[0].focus();
                        //        scope.isShowVerify = true;
                        //        scope.voteddata = d;
                        //        scope.reGetVerifyCode();
                        //    } else {
                        //        if (!d.IsHaveGrow && scope.status == "preview") {
                        //            d.Score++;
                        //            d.IsHaveGrow = true;
                        //        }

                        //    }
                        //}
                        ////弹出层的投票接口   
                        ////
                        ////2.匹配则调用投票接口 ,校验验证码，匹配是否一致，一致则关闭弹出层，不一致则显示错误
                        //// 控制前台  按钮是否能点击
                        //scope.ifSubmit = false;
                        //scope.voteTothis = function (d) {
                        //    if (scope.ifSubmit) {
                        //        promptBarService.showErrorBar("别点的太快啦", 3000);
                        //        return;
                        //    }
                        //    scope.ifSubmit = true;

                        //    template21_1Service.voteToSBwithStr(d.Id, currentuserID, scope.captcha).then(function (result) {
                        //        scope.ifSubmit = false;
                        //        console.log(result);
                        //        if (result.data.status == 1) {
                        //            scope.isShowVerify = false;
                        //            d.Score = result.data.data;
                        //            d.IsHaveGrow = true;
                        //            promptBarService.showSuccessBar("投票成功！", 3000);
                        //        }
                        //        else {
                        //            if (result.data.error == 10004) {
                        //                promptBarService.showErrorBar(result.data.message, 3000);
                        //            }
                        //            else {
                        //                scope.reGetVerifyCode();
                        //                scope.captcha = "";
                        //                if (result.data.error == 10002) {
                        //                    promptBarService.showErrorBar("验证码过期！", 3000);
                        //                } else if (result.data.error == 10003) {
                        //                    promptBarService.showErrorBar("验证码错误！", 3000);
                        //                } else if (result.data.error == 10001) {
                        //                    promptBarService.showErrorBar("验证码为空！", 3000);
                        //                } else {
                        //                    promptBarService.showErrorBar(result.data.message, 3000);
                        //                }
                        //            }
                        //        }
                        //    });
                        //}
                        //重新获取验证码
                        scope.reGetVerifyCode = function () {
                            scope.imgurl = "/Common/Captcha" + "?v=" + new Date().getTime();
                        }



                    }
                };
            }
        ]);
});