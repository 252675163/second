"use strict";
/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/templates/micro-activity-template/template21_1/service", "components/templates/micro-activity-template/template21_2/service"], function () {
    angular.module("Template21_1Step1.directives", ['Template21_1.Service'])
        .directive("template21by1Step1", [
            "$window", "$timeout", "$rootScope", "template21_1Service", "template21_2Service", "maskService", "promptBarService", "$filter", "commonNetService",
            function ($window, $timeout, $rootScope, template21_1Service, template21_2Service, maskService, promptBarService, $filter, commonNetService) {
                return {
                    restrict: 'EA',
                    scope: false,
                    templateUrl: "components/templates/micro-activity-template/template21_1/templates_steps/template_step1.html",
                    link: function (scope, iElement, iAttr) {
                        var currentuserID = "";
                        var enddate = "";

                        //分页信息初始化
                        scope.page = {
                            totalCount: "",
                            currentIndex: ""
                        };
                        //拿到当前活动ID
                        scope.activeid = $rootScope.$stateParams.Id;
                        var originid = {
                            OriginId: scope.activeid
                        };
                        //截止时间

                        scope.placeimg_small = window.resourceDoMain + "/app/img/vote_";


                        function init() {
                            var contentHeight = window.document.documentElement.clientHeight - parseInt(document.documentElement.style.fontSize) * 2.43 + 6 + "px";
                            //var contentHeight = window.document.documentElement.clientHeight - $(iElement).find("#bottom_btn")[0].offsetHeight + "px";
                            $(iElement).find(".content-adjust")[0].style.height = contentHeight;
                            scope.ifVerifyShow = false;


                            if (scope.status == "view") {
                                //屏蔽朋友圈菜单
                                if (!scope.isUseWeinxinShare) {
                                    window.wx && window.wx.hideMenuItems({
                                        menuList: ["menuItem:share:timeline"]
                                    });
                                }


                            }

                            // //背景图片
                            // var docEl = document.documentElement;
                            // iElement[0].getElementsByClassName("bgPan3")[0].style.height = "" + docEl.clientHeight + "px";



                            

                            //默认弹窗不显示
                            //scope.ifshowInfo = false;

                            //scope.isEdit= scope.status=="edit"?true:false;

                            if (scope.status == "view") { //正式界面拉取正常内容
                                scope.info = template21_2Service.getTemplateModel().templateModel;//拿到活动信息  本屏主要是截止时间
                                if (scope.activityOtherConfig.endDate == "/Date(253402185600000+0800)/") {
                                    enddate = new Date(scope.info.description[2])
                                } else {
                                    enddate = new Date($filter("formatJsonDate2")(scope.activityOtherConfig.endDate, "yyyy/MM/dd HH:mm:ss"));
                                }
                                scope.enddate = enddate;
                                var now = new Date();
                                if (now > enddate) {
                                    scope.ifPass = true;
                                } else {
                                    scope.ifPass = false;
                                }




                                scope.page = {
                                    PageIndex: 1,
                                    PageSize: 4
                                }
                                scope.ifSignIn = false;
                                template21_1Service.getvoteList(originid, scope.page).success(function (result) {

                                    if (result.status == 1) {
                                        scope.voteinfo = result.data;

                                        scope.votelist = {};

                                        scope.votelist = scope.voteinfo.list;
                                        scope.page = scope.voteinfo.page;
                                        // //首页拉取8条数据 之后每次4页 影响了分页的总页数 和当前页数，在数据大于8的情况下 前台计算分页情况
                                        // if (scope.page.itemCount > 8) {
                                        //     scope.page.currentIndex = 2;
                                        //     scope.page.totalCount = Math.ceil(scope.page.itemCount / 4);
                                        // }

                                        console.log(scope.page);

                                        //获取是否已参加
                                        currentuserID = scope.voteinfo.info;
                                        if (currentuserID == "") {
                                            scope.ifSignIn = false;// 代表未参加 我也要参加
                                        } else {
                                            scope.ifSignIn = true;// 代表已参加 我的报名
                                        }
                                    }
                                    else {
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }
                                }).then(function () {

                                    //设置分享config
                                    var config = commonNetService.getShareConfig();
                                    //新用户需要个性设置分享标题和描述
                                    if (config) {
                                        //默认将已参加的自己的信息分享出去  若未参加，则设置链接人的
                                        var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;

                                        if (userId) {
                                            //    template21_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                            //        scope.userinfo = result.data;

                                            config.title = scope.templateModel.name + "开始啦，快点来参加吧！";
                                            //        config.desc = config.desc;
                                            //        config.imgUrl = config.imgUrl;

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
                                                //只set微信朋友
                                                //更改页面title  首页或者是无助力的表单页
                                                if (scope.step == 1 || scope.step == 3) {
                                                    //                 $rootScope.$state.current.title = config.title;
                                                }
                                                commonNetService.setShareAppMessageReception(config).then(function () {
                                                }, function () {
                                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                                });
                                            }
                                            //   })
                                        } else {
                                            $rootScope.$state.current.title = scope.templateModel.name + "开始啦，快点来参加吧！";
                                        }
                                    }
                                });




                            } else {

                                //预览与编辑页面使用假列表数据
                                scope.votelist = template21_1Service.getVoterList();
                                //将截止时间显示出来
                                scope.info = template21_2Service.getTemplateModel().templateModel;//拿到活动信息  本屏主要是截止时间
                                if (scope.info) {
                                    scope.enddate = new Date(scope.info.description[2])
                                } else {
                                    scope.enddate = new Date();
                                }

                            }
                        }

                        init();

                        //点击头像 调至此人的 投票页面
                        scope.gothisone = function (d) {
                            if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "4", oldUser: d.Id });
                            } else {
                                if (scope.status == "preview") {

                                    //将选择的ID 设置进缓存中 废用
                                    //localStorage.setItem("Id", d.Id);

                                    //使用方法保存
                                    template21_1Service.setSelectId(d.Id);
                                    var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                    $rootScope.$state.go(stateName, { step: "4" });
                                }

                            }
                        }
                        //跳到自己的界面
                        scope.goItSelf = function () {
                            if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "4", oldUser: currentuserID });
                            } else {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "4" });

                            }
                        }
                        scope.gonext = function () {
                            //未参加状态下 参加投票 跳至填写报名信息界面
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "3" });
                            } else if (scope.status == "view") {
                                if (scope.ifPass) {
                                    promptBarService.showErrorBar("活动已结束！", 3000);
                                } else {
                                    $rootScope.$state.go("activity.oldandnewview", { step: "3", oldUser: '' });
                                }
                            }
                        }
                        scope.gostep4 = function () {
                            //参加状态下 跳至自己的投票界面
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "4" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "4", oldUser: currentuserID });
                            }
                        }
                        //点击投票
                        scope.voteThis = function (d) {
                            if (scope.ifPass) {
                                promptBarService.showErrorBar("活动已结束！", 3000);
                            } else {
                                if (scope.status == "view") {
                                    !d.IsHaveGrow &&
                                        template21_1Service.voteToSB(d.Id)
                                            .then(function (result) {
                                                if (result.data.status == 1) {
                                                    if (!d.IsHaveGrow) {
                                                        d.Score++;
                                                    }
                                                    d.IsHaveGrow = true;

                                                } else {
                                                    if (result.data.error == 10004||1000) {
                                                        promptBarService.showErrorBar(result.data.message, 3000);
                                                    } else {
                                                        promptBarService.showErrorBar("投票失败！请重新投票", 3000);
                                                        scope.ifVerifyShow = true;
                                                        scope.voteddata = d;
                                                        scope.reGetVerifyCode();
                                                    }

                                                }
                                            });
                                } else {
                                    if (scope.status == "preview") {
                                        if (!d.IsHaveGrow) {
                                            d.Score++;
                                        }
                                        d.IsHaveGrow = true;
                                    }

                                }
                            }


                        }
                        //scope.ifShowMask = true;
                        scope.toggle = function () {
                            if (scope.status != "edit") {
                                scope.$parent.ifshowInfo = !scope.$parent.ifshowInfo;
                                // scope.ifShowMask = !scope.ifShowMask;
                            }
                        }

                        //超过五百票的处理情况
                        //1.显示弹出层
                        //2.调用验证码接口  拿到验证码图片
                        scope.voteThisandcheck = function (d) {
                            if (scope.ifPass) {
                                promptBarService.showErrorBar("活动已结束！", 3000);
                            } else {
                                if (!d.IsHaveGrow && scope.status == "view") {
                                    scope.captcha = "";
                                    //iElement.find("#captcha")[0].focus();
                                    scope.ifVerifyShow = true;
                                    scope.voteddata = d;
                                    scope.reGetVerifyCode();
                                } else {
                                    if (!d.IsHaveGrow && scope.status == "preview") {
                                        d.Score++;
                                        d.IsHaveGrow = true;
                                    }

                                }
                            }
                        }
                        //弹出层的投票接口   
                        //
                        //2.匹配则调用投票接口 ,校验验证码，匹配是否一致，一致则关闭弹出层，不一致则显示错误
                        // 控制前台  按钮是否能点击
                        scope.ifSubmit = false;
                        scope.voteTothis = function (d) {
                            if(scope.ifSubmit){
                                promptBarService.showErrorBar("别点的太快啦", 3000);
                                return;
                            }
                            scope.ifSubmit = true;

                            template21_1Service.voteToSBwithStr(d.Id, currentuserID, scope.captcha).then(function (result) {
                                scope.ifSubmit = false;
                                console.log(result);
                                if (result.data.status == 1) {
                                    scope.ifVerifyShow = false;
                                    d.Score = result.data.data;
                                    d.IsHaveGrow = true;
                                    promptBarService.showSuccessBar("投票成功！",3000);
                                }
                                else {
                                    if (result.data.error == 10004) {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                    else {
                                        scope.reGetVerifyCode();
                                        scope.captcha = "";
                                        if (result.data.error == 10002) {
                                            promptBarService.showErrorBar("验证码过期！", 3000);
                                        } else if (result.data.error == 10003) {
                                            promptBarService.showErrorBar("验证码错误！", 3000);
                                        }else if(result.data.error == 10001){
                                            promptBarService.showErrorBar("验证码为空！", 3000);
                                        }else{
                                            promptBarService.showErrorBar(result.data.message, 3000);
                                        }
                                    }
                                }
                            });
                        }
                        //重新获取验证码
                        scope.reGetVerifyCode = function () {
                            scope.imgurl = "/Common/Captcha" + "?v=" + new Date().getTime();
                        }

                        scope.closeCheckBox = function () {
                            scope.ifVerifyShow = false;
                        }




                        //打开首页
                        scope.gostep1 = function () {
                            if (scope.status == "preview") {
                                var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";
                                $rootScope.$state.go(stateName, { step: "1" });
                            } else if (scope.status == "view") {
                                $rootScope.$state.go("activity.oldandnewview", { step: "1" });
                            }
                        }

                        //滚动加载方法
                        scope.loadMore = function () {
                            template21_1Service.getvoteList(originid, { PageIndex: scope.page.currentIndex + 1, PageSize: 4 }).success(function (result) {
                                scope.$broadcast("scroll.infiniteScrollComplete");
                                if (result.status == 1) {
                                    if (result.data.list.length > 0) {
                                        scope.votelist = scope.votelist.concat(result.data.list);
                                    }
                                    scope.page = result.data.page;

                                } else {
                                    promptBarService.showErrorBar(result.message, 3000);
                                }
                            });
                        }
                    }
                }
            }]
        )

});

