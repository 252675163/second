"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:32
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template21_1/service"], function () {
    angular.module("Template21_1Step3.directives", ["Template21_1.Service"])
        .directive("template21by1Step3", [
            "$window", "$timeout", "$rootScope", "template21_1Service", "uploadImgService", "promptBarService", "commonNetService", "userTermsService",
            function ($window, $timeout, $rootScope, template21_1Service, uploadImgService, promptBarService, commonNetService, userTermsService) {
                return {
                    restrict: "EA",
                    scope: true,
                    templateUrl: "components/templates/micro-activity-template/template21_1/templates_steps/template_step3.html",
                    link: function (scope, iElement, iAttr) {




                        function init() {
                            scope.ifReSign = false; //默认不是 重新报名
                            //屏蔽朋友圈菜单
                            if (!scope.isUseWeinxinShare) {
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:timeline"]
                                });
                            }

                            scope.active = template21_1Service.getActiveInfo();

                            var userId = $rootScope.$stateParams.oldUser;
                            if (userId) {   //非机构分享的情况下

                                scope.userInfo = template21_1Service.getUserInfo();

                                if (scope.userInfo.SelfActivityUserId != userId) {
                                    scope.userInfo = {
                                        name: "",
                                        phone: "",
                                        headImg: "",
                                        slogn: ""
                                    };
                                } else {
                                    scope.ifReSign = true;  //若当前用户ID 与URL中所带的UserID 相同 则为重新报名
                                }
                            } else {    //机构分享出的链接 重新报名
                                scope.userInfo = {
                                    name: "",
                                    phone: "",
                                    headImg: "",
                                    slogn: ""
                                };
                            }

                            //设置分享config
                            var config = commonNetService.getShareConfig();
                            //新用户需要个性设置分享标题和描述
                            if (config) {
                                //默认将已参加的自己的信息分享出去  若未参加，则设置链接人的
                                var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;

                                if (userId) {
                                    // template21_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                    //     scope.userinfo = result.data;

                                    config.title = scope.templateModel.name + "开始啦，快点来参加吧！";
                                    config.desc = config.desc;
                                    config.imgUrl = config.imgUrl;

                                    //使用用户上传的图片作为分享图片
                                    $rootScope.$state.current.shareImage = config.imgUrl;
                                    $rootScope.$state.current.title = config.title;

                                    //自定义分享 从第二步还是第三步 都是打开第一步
                                    //config.link = window.shareServer + "/VoteView" + "/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "") + "&step=1";
                                    var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                    config.link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "") + "&step=1";

                                    //2016.5.3 如果需要使用微信的jssdk 分享 设置shareConfig
                                    if (scope.isUseWeinxinShare) {
                                        commonNetService.setShareMessageReception(config).then(function () {
                                        }, function () {
                                            promptBarService.showErrorBar("分享信息设置出错", 3000);
                                        });
                                    } else {
                                        //如果不使用微信的自定义分享
                                        if (window.isAllowDirectShare) {
                                            //                    window.location.href=window.shareServer + "/VoteView" + "/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "") + "&step=1";
                                        } else {
                                            //                    $rootScope.$state.go("activity.oldandnewview", { step: "1", oldUser: result.data.data },{reload:true});
                                        }
                                    }
                                    //         })
                                }
                            }


                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                            }, 800);
                            scope.ifRight = false; //默认不可发布
                        }
                        init();

                        scope.ifSignin = false;
                        //用户条款是否选中
                        scope.isCheckUserTerms = true;
                        scope.placeholderheadimg = window.resourceDoMain + "/app/img/vote_default-bg.jpg";
                        scope.publish = function () {
                            // var ipt = document.querySelectorAll(".step3_input");
                            // var btn = document.querySelector("#btn");
                            // var timer = null;
                            // //angular.element(ipt).blur();

                            // for (var i = 0; i < ipt.length; i++) {
                            //     ipt[i].blur();
                            // }

                            // angular.element(btn).click();
                            // if (timer) {
                            //     clearTimeout(timer)
                            // } else {
                            //              timer = setTimeout(function () {
                            //如果已经提交过表单，判断提交信息是否有更改
                            if (scope.ifSignin == true) {
                                promptBarService.showErrorBar("请不要重复提交", 3000);
                                return;
                            }

                            //预览状态不校验信息
                            if (scope.status == "preview") {
                                promptBarService.showErrorBar("预览状态不保存信息！", 3000);
                                //不再跳转至下一页
                                //$rootScope.$state.go("activity.oldandnewpreview", { step: "4" });


                            } else if (scope.status == "view") {
                                if (validForm() && !scope.basic_form.$invalid) {

                                    var data = {
                                        name: scope.userInfo.name,
                                        phone: scope.userInfo.phone,
                                        Config: JSON.stringify({
                                            headImg: scope.userInfo.headImg,
                                            slogn: scope.userInfo.slogn,
                                        }),
                                        ActivityId: $rootScope.$stateParams.Id,
                                        ActivityUserId: scope.userType == "new" ? $rootScope.$stateParams.oldUser : "",
                                    }
                                    if(scope.ifReSign){//重新报名的情况下 添加一个参数 
                                        data.IsReEnroll = true;
                                    }
                                    scope.ifSignin = true;
                                    template21_1Service.addActivityUserInfo(data).then(function (result) {
                                        scope.ifSignin = false;
                                        if (result.data.status === 1) {
                                            $rootScope.$state.go("activity.oldandnewview", { step: "4", oldUser: result.data.data }, {});
                                        }else{
                                            promptBarService.showErrorBar("报名失败！", 3000);
                                        }
                                    });
                                } else {
                                    scope.ifSignin = false;

                                }
                            }
                            //                    }, 500);
                            //                   }
                        }

                        //表单校验
                        function validForm() {

                            var validState = template21_1Service.isValid(scope.userInfo.name, scope.userInfo.phone, scope.userInfo.slogn, scope.userInfo.headImg);
                            if (validState == 1) {
                                promptBarService.showErrorBar("请输入姓名！", 3000);
                                return false;
                            } else if (validState == 3) {
                                promptBarService.showErrorBar("请输入手机号码！", 3000);
                                return false;
                            } else if (validState == 4) {
                                promptBarService.showErrorBar("请输入真实的手机号码！", 3000);
                                return false;
                            } else if (validState == 5) {
                                promptBarService.showErrorBar("请输入参赛宣言！", 3000);
                                return false;
                            } else if (validState == 6) {
                                promptBarService.showErrorBar("请上传照片！", 3000);
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

                            uploadImgService.upLoadImg(template21_1Service.getConfigByAspectRatio(1), 1, scope.upLoadHeadImgFinish, '', { serviceType: "headerImg" });

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