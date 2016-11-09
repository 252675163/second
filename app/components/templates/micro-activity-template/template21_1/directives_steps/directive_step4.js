"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:26
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template21_1/service", "components/templates/micro-activity-template/template21_2/service"], function () {
    angular.module("Template21_1Step4.directives", ["Template21_1.Service"])
        .directive("template21by1Step4", [
            "$window", "$rootScope", "$timeout", "template21_1Service", "template21_2Service", "promptBarService", "commonNetService",
            function ($window, $rootScope, $timeout, template21_1Service, template21_2Service, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    scope: true,
                    templateUrl: "components/templates/micro-activity-template/template21_1/templates_steps/template_step4.html",
                    link: function (scope, iElement, iAttr) {

                        var currentuserID = "";
                        function init() {

                            scope.ifVerifyShow = false;
                            //console.log($(iElement).find(".bottom_btn")[0].offsetHeight);
                            //屏蔽相关菜单
                            if (!scope.isUseWeinxinShare) {
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:timeline"]
                                });
                            }




                            scope.placeholderheadimg = window.resourceDoMain + "/app/img/vote_big_1.jpg";

                            if (scope.status == "view") {
                                var userId = $rootScope.$stateParams.oldUser;
                                //var userId = "992"
                                template21_1Service.getActivityUserInfo(userId, scope.userType).then(function (result) {
                                    //console.log(result);
                                    //获取当前人信息
                                    scope.userinfo = result.data.data;
                                    //已删除人员的处理方式 本人则常显示错误 非本人则跳转错误
                                    if(scope.userinfo.IsDeleted){
                                        if(scope.userinfo.SelfActivityUserId==scope.userinfo.Id){
                                            promptBarService.showErrorBar2("您的参赛情况涉嫌违规，请联系主办方机构！");
                                        }else{
                                            location.href = "/Common/Error?mark=template21by1Step4_getActivityUserInfo_scope.userinfo.IsDeleted_NoEqual_True";
                                        }
                                    }
                                    //console.log(scope.userinfo);
                                    //头像及宣言
                                    scope.config = JSON.parse(result.data.data.Config);
                                    //是否给当前人投过票

                                    scope.ifVote = result.data.data.IsHaveGrow;

                                    //设置选择人信息
                                    var info = {
                                        name: scope.userinfo.Name,
                                        phone: scope.userinfo.Phone,
                                        headImg: scope.config.headImg,
                                        slogn: scope.config.slogn,
                                        SelfActivityUserId: scope.userinfo.SelfActivityUserId
                                    }
                                    template21_1Service.setUserInfo(info);

                                    //判断是否是自己
                                    //拿到当前登录人的ID currentuserID
                                    currentuserID = result.data.data.SelfActivityUserId;
                                    //若currentuserID 与当前界面人物信息ID相同  则为自己  否则 为别人
                                    if (currentuserID == "") {
                                        scope.ifSignIn = false;// 代表未参加 我也要参加
                                    } else {
                                        scope.ifSignIn = true; //代表已参加  我的报名
                                        if (currentuserID == parseInt($rootScope.$stateParams.oldUser)) {
                                            scope.ifSelf = true;    //代表当前是自己
                                        } else {
                                            scope.ifSelf = false;   //代表是别人
                                        }
                                    }

                                    //设置分享config
                                    var config = commonNetService.getShareConfig();
                                    //新用户需要个性设置分享标题和描述
                                    if (config) {
                                        //默认将已参加的自己的信息分享出去  若未参加，则设置链接人的
                                        //var userId = $rootScope.$stateParams.oldUser;
                                        //var link = window.shareServer + "/VoteView" + "/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "" )+ "&step=4";
                                        var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                        var link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "") + "&step=4";
                                        //if (userId) {
                                        //template21_1Service.getActivityUserInfo(userId, scope.userType).then(function (result) {
                                        //scope.userinfo1 = result.data.data;
                                        //头像及宣言
                                        //scope.config1 = JSON.parse(result.data.data.Config);

                                        config.title = "友谊的小船不会翻，快来帮" + scope.userinfo.Name + "投一票吧！";
                                        config.desc = scope.userinfo.Name + "正在参加" + scope.templateModel.name + "，快来给Ta投一票吧！";
                                        config.imgUrl = scope.config.headImg;
                                        //自定义分享
                                        config.link = link;

                                        //使用用户上传的图片作为分享图片
                                        $rootScope.$state.current.shareImage = config.imgUrl
                                        $rootScope.$state.current.title = config.title;



                                        //2016.5.3 如果需要使用微信的jssdk 分享 设置shareConfig
                                        if (scope.isUseWeinxinShare) {
                                            commonNetService.setShareMessageReception(config).then(function () {
                                            }, function () {
                                                promptBarService.showErrorBar("分享信息设置出错", 3000);
                                            });
                                        } else {
                                            //只set微信朋友
                                            //更改页面title  首页或者是无助力的表单页
                                            if (scope.step == 4) {
                                                $rootScope.$state.current.title = config.title;
                                            }
                                            commonNetService.setShareAppMessageReception(config).then(function () {
                                            }, function () {
                                                promptBarService.showErrorBar("分享信息设置出错", 3000);
                                            });
                                        }
                                        //   })
                                        // }
                                    }
                                })
                            } else {
                                //预览状态加载假数据
                                var votelist = template21_1Service.getVoterList();
                                //从缓存中取出选中人的ID 废用
                                //var id = localStorage.getItem("Id");

                                //从方法中取出
                                var id = template21_1Service.getSelectId() || 1;
                                //清空缓存
                                //localStorage.clear();
                                //占位图片
                                scope.placeimg_small = window.resourceDoMain + "/app/img/vote_";
                                //数据绑定至前台
                                scope.userinfo = votelist[id - 1];
                            }


                            scope.info = template21_2Service.getTemplateModel().templateModel;//拿到活动信息  本屏主要是截止时间
                            //判断截止时间与当前时间  确定是否已过期
                            var enddate = new Date(scope.info.description[2]);
                            enddate.setMinutes(0);
                            enddate.setSeconds(0);
                            var now = new Date();
                            if (now > enddate) {
                                scope.ifPass = true;
                            } else {
                                scope.ifPass = false;
                            }
                            //console.log(enddate);
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                            }, 800);
                        }
                        init();


                        //返回首页
                        scope.gostep1 = function () {
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "1" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "1", oldUser: currentuserID }, {});
                            }
                        }
                        //第一次报名
                        scope.gostep3 = function () {
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "3" });
                            } else if (scope.status == "view") {
                                if (scope.ifPass) {
                                    promptBarService.showErrorBar("活动已结束！", 3000);
                                } else {
                                    $rootScope.$state.go("activity.oldandnewview", { step: "3" });
                                }

                            }
                        }
                        //查看自己的报名信息
                        scope.gonext = function () {
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "4" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "4", oldUser: currentuserID });
                            }
                        }
                        //给某人投票
                        scope.voteToSomeone = function () {
                            if (scope.status == "view") {
                                if (scope.ifPass) {
                                    promptBarService.showErrorBar("活动已结束！", 3000);
                                } else {
                                    var userid = scope.userinfo.Id;
                                    !scope.ifVote && template21_1Service.voteToSB(userid).then(function (result) {

                                        if (result.data.status == 1) {
                                            //console.log(result);
                                            //重新获取此人信息
                                            template21_1Service.getActivityUserInfo(userid, scope.userType).then(function (result) {
                                                scope.userinfo = result.data.data;
                                                scope.config = JSON.parse(result.data.data.Config);
                                                scope.ifVote = result.data.data.IsHaveGrow;
                                            });
                                        } else {
                                            if (result.data.error == 10004||1000) {
                                                promptBarService.showErrorBar(result.data.message, 3000);
                                            } else {
                                                scope.ifVerifyShow = true;
                                                scope.reGetVerifyCode();
                                                promptBarService.showErrorBar("投票失败！请重新投票", 3000);
                                            }
                                        }

                                    })
                                }

                            } else {

                            }
                        }

                        //超过五百票的处理情况
                        //1.显示弹出层
                        //2.调用验证码接口  拿到验证码图片
                        scope.voteThisandcheck = function () {
                            if (scope.ifPass) {
                                promptBarService.showErrorBar("活动已结束！", 3000);
                            } else {
                                if (!scope.ifVote) {
                                    //document.querySelector("#captcha").focus();
                                    scope.captcha = "";
                                    scope.ifVerifyShow = true;
                                    scope.reGetVerifyCode();
                                }
                            }
                        }
                        //弹出层的投票接口
                        //1.调用校验验证码接口，匹配是否一致
                        //2.匹配则调用投票接口，并关闭弹出层
                        scope.voteTothis = function () {
                            template21_1Service.voteToSBwithStr(scope.userinfo.Id, currentuserID, scope.captcha).then(function (result) {
                                console.log(result);
                                if (result.data.status == 1) {
                                    scope.ifVerifyShow = false;     //关闭弹出层
                                    scope.userinfo.Score = result.data.data;//更新票数
                                    scope.ifVote = true;//设置投票按钮状态
                                    promptBarService.showSuccessBar("投票成功！",3000);
                                } else {
                                    if (result.data.error == 10004) {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    } else {
                                        scope.reGetVerifyCode();
                                        scope.captcha = "";
                                        if (result.data.error == 10002) {
                                            promptBarService.showErrorBar("验证码过期！", 3000);
                                        } else if (result.data.error == 10003) {
                                            promptBarService.showErrorBar("验证码错误！", 3000);
                                        } else if (result.data.error == 10001) {
                                            promptBarService.showErrorBar("验证码为空！", 3000);
                                        } else {
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                    }

                                }
                            })
                        }
                        //重新获取验证码
                        scope.reGetVerifyCode = function () {
                            scope.imgurl = "/Common/Captcha" + "?v=" + new Date().getTime();
                        }

                        scope.closeCheckBox = function () {
                            scope.ifVerifyShow = false;
                        }

                        //预览状态投票
                        scope.voteToSomeonefake = function (d) {
                            promptBarService.showErrorBar("投票效果仅供参考！", 2000);
                            d.IsHaveGrow = true;
                            d.Score++;
                        }

                        scope.toggle = function () {
                            if (scope.status != "edit") {

                                scope.$parent.$parent.ifshowInfo = !scope.$parent.$parent.ifshowInfo;
                            }
                        }


                    }


                };
            }
        ]
        );
});