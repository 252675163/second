"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic","components/templates/micro-activity-template/template20_2/service","components/templates/micro-activity-template/template20_3/service","components/templates/micro-activity-template/template20_4/service"], function () {
    angular.module("Template20_1.directives", [])
        .directive("template20by1", [
                "$window", "$timeout", "$rootScope", "$q", "$ionicScrollDelegate", "template20_1Service","uploadImgService", "maskService", "promptBarService", "commonNetService","template20_3Service", "template20_4Service","template20_2Service",
            function ($window, $timeout, $rootScope, $q, $ionicScrollDelegate, template20_1Service, uploadImgService, maskService, promptBarService, commonNetService,template20_3Service,template20_4Service,template20_2Service) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template20_1/template.html",
                        link: function (scope, iElement, iAttr) {

                            scope.defaultHeadImg = window.resourceDoMain + "/app/img/grow_vegetables_1_photo.png"; //默认的用户头像
                            //有助力状态
                            scope.isNeedHelp = true;

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）

                            function init() {
                                //屏蔽相关菜单
                                window.wx && window.wx.hideMenuItems({
                                    menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:QZone"]
                                });

                                //默认使用微信分享 模板预览不传入，始终使用自定义分享
                                scope.isUseWeinxinShare = angular.isUndefined(scope.isUseWeinxinShare)?true:scope.isUseWeinxinShare;
                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(template20_1Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }
                                template20_1Service.setDataOfTempaletModel(scope.templateModel);
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;

                                //背景图片
                                var docEl = document.documentElement;
                                iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }

                                scope.step = $rootScope.$stateParams.step || 1;
                                //2016.5.4 by yinglechao 如果不是第一次进入页面，则显示第一步  解决直接分享表单页，打开的是表单页bug
                                //if(!scope.isAllowDirectShare&&scope.step!=1&&template20_1Service.isFirst){
                                //    //手动关闭loading
                                //    $timeout(function () {
                                //        $(".lockMask-loading2").hide();
                                //        $rootScope.$broadcast('hideLoading');
                                //        $rootScope.isFirstLoad = true;
                                //    }, 1833);
                                //    scope.step = 1;
                                //}
                                //template20_1Service.isFirst=false;


                                //区分是否是助力页面
                                if (scope.templateModel.helperCount == 0) {
                                    scope.isNeedHelp = false;
                                }

                                //预览查看页面无助力，直接领券
                                if (scope.templateModel.helperCount == 0 && !scope.isEdit && scope.step != "3") {
                                    scope.step = 2;
                                }
                                


                                //默认预览页刮奖部分显示状态3
                                scope.case = 3;

                                //默认不是刮完状态   刮完状态带有animation2动画
                                scope.finishScratch = false;

                                //默认不是激活状态
                                scope.activated = false;

                                //预览页面剩余助力人数
                                scope.leftHelper = scope.templateModel.helperCount;

                                //使用条件文案
                                scope.usageInfo = template20_2Service.getUsageInfo();

                                //预览页面初始进度条百分比
                                scope.percentagePreview = 0;

                                //如果是查看页面
                                if (scope.status == "view") {
                                    // 打开微信的分享菜单
                                    commonNetService.showOptionMenu();
                                    //请求
                                    var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                    template20_1Service.getActivityUserInfo(userId, scope.userType).success(function (result) {
                                        if (result.status == 1) {
                                            
                                            if (scope.userType == "new") {
                                                
                                                var content = JSON.parse(result.data.VoucherConfig);
                                                if (!angular.equals(content, null)) {
                                                    //发起者相关信息
                                                    scope.userInfo1 = {
                                                        name: result.data.Name || "",
                                                        headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : scope.defaultHeadImg,
                                                        //已助力人数
                                                        helperNum: content.HelperNum
                                                    };
                                                    //登录者信息
                                                    scope.userInfo2 = {
                                                        //是否是助力人 waring
                                                        isHelper: content.IsHelper,
                                                        //助力金额
                                                        helperAmount: content.HelperAmount,
                                                        //是否助力过
                                                        isHaveGrow: result.data.IsHaveGrow
                                                    };
                                                }
                                                else {
                                                    scope.userInfo1 = {
                                                        name: result.data.Name || "",
                                                        headImg: result.data.Config ? JSON.parse(result.data.Config).headImg : scope.defaultHeadImg,
                                                    };
                                                }
                                                
                                            } else {

                                                var content = JSON.parse(result.data.VoucherConfig);
                                                if (!angular.equals(content, null)) {
                                                    scope.userInfo1 = {
                                                        name: scope.templateModel.name,
                                                        headImg: scope.templateModel.imageUrl[0] || scope.defaultHeadImg,
                                                        //已助力人数
                                                        helperNum: content.HelperNum
                                                    };
                                                    //登录者信息
                                                    scope.userInfo2 = {
                                                        //是否是助力人
                                                        isHelper: content.IsHelper,
                                                        //助力金额
                                                        helperAmount: content.HelperAmount,
                                                        //是否助力过
                                                        isHaveGrow: result.data.IsHaveGrow
                                                    };
                                                }
                                                else {
                                                    scope.userInfo1 = {
                                                        name: scope.templateModel.name,
                                                        headImg: scope.templateModel.imageUrl[0] || scope.defaultHeadImg
                                                    };
                                                }
                                            }

                                            var content = JSON.parse(result.data.VoucherConfig);
                                            //如果是有助力页面
                                            if (!angular.equals(content, null)) {
                                                //100元已激活
                                                if (scope.userInfo1.helperNum >= scope.templateModel.helperCount) {
                                                    scope.case = 1;
                                                }
                                                    //发起者看到未激活100元
                                                else if (!scope.userInfo2.isHelper && scope.userInfo1.helperNum < scope.templateModel.helperCount) {
                                                    scope.case = 2;
                                                }
                                                    //助力者未刮 未激活
                                                else if (!scope.userInfo2.isHaveGrow && scope.userInfo2.isHelper && scope.userInfo1.helperNum < scope.templateModel.helperCount) {
                                                    scope.case = 3;
                                                }
                                                    //助力者已挂 未激活
                                                else if (scope.userInfo2.isHaveGrow && scope.userInfo2.isHelper && scope.userInfo1.helperNum < scope.templateModel.helperCount) {
                                                    scope.case = 4;
                                                }

                                                //查看页面进度条初始化
                                                scope.percentageView = (scope.userInfo1.helperNum / scope.templateModel.helperCount) * 100;
                                            }else{
                                                scope.userInfo2 ={
                                                    isHelper:true,
                                                    isHaveGrow:0,
                                                    helperNum:0
                                                };
                                            }

                                            //设置config
                                            var config = scope.setConfigInfo();
                                            //自定义分享 从第二步还是第三步 都是打开第一步
                                            //config.link = window.shareServer + "/CreativeView"+"/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser||""+"&step=1");
                                            var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                            config.link = window.shareServer + "/" + shareRouter + "?p=activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser || "" + "&step=1");
                                            //2016.5.3 如果需要使用微信的jssdk 分享 设置shareConfig
                                            if(scope.isUseWeinxinShare){
                                                commonNetService.setShareMessageReception(config).then(function () {
                                                }, function () {
                                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                                });
                                            }else{
                                                //只set微信朋友
                                                //更改页面title  首页或者是无助力的表单页
                                                if(scope.step==1||(scope.step==2&&!scope.isNeedHelp)){
                                                    $rootScope.$state.current.title = config.title;
                                                }
                                                commonNetService.setShareAppMessageReception(config).then(function () {
                                                }, function () {
                                                    promptBarService.showErrorBar("分享信息设置出错", 3000);
                                                });
                                            }

                                            if (scope.userInfo1.headImg.search(/wx.qlogo.cn/) >= 0) {
                                                var str = scope.userInfo1.headImg;
                                                //使用微信的默认图
                                               // scope.userInfo.headImg = str.slice(0, str.lastIndexOf("/") + 1) + 96;
                                                $rootScope.$state.current.shareImage = str.slice(0, str.lastIndexOf("/") + 1) + 0;
                                            } else {
                                                $rootScope.$state.current.shareImage = scope.userInfo1.headImg;
                                            }

                                            //设置机构介绍和联系方式模块是否显示
                                            renderOtherPage(!scope.userInfo2.isHelper,scope.step,scope.userInfo2.isHaveGrow);
                                        }
                                        scope.isFinishPost = true;

                                        // 2016.5.3 如果不使用微信的自定义分享 如果进入页面的人是发起者，状态为助力中，进入的页面是第一步（保存代金券页面不提示）loading结束后出现两秒分享遮罩  by yinglechao
                                        if(!scope.isUseWeinxinShare&&scope.userInfo2.isHelper==false&&scope.step==1&&(scope.userInfo1.helperNum<scope.templateModel.helperCount)){
                                            scope.$on("hideLoading", function () {
                                                maskService.showMask("",2000,false,4);
                                            });
                                        }
                                    });



                                }else if(scope.status == "preview"){
                                    renderOtherPage(false,scope.step,false);
                                }
                            }

                            init();

                            //发起者喊人激活代金券
                            scope.sayForHelp = function () {
                                //2016.5.3 如果不使用微信自定义分享，2s遮罩再消失  yinglechao
                                if(!scope.isUseWeinxinShare){
                                    maskService.showMask("", 2000, false, 4);
                                    return;
                                }
                                var config = scope.setConfigInfo();

                                maskService.showMask("", 0, false, 9);
                                commonNetService.setShareMessageReception(config).then(function () {
                                    //用户分享或取消分享
                                    maskService.hideMask();
                                }, function () {
                                    //set微信的link出错
                                    maskService.hideMask();
                                    promptBarService.showErrorBar("分享出错", 3000);
                                });
                            };

                            //有助力完成后跳转到保存图片页面
                            scope.goSaveImg = function () {
                                if(window.isAllowDirectShare){
                                    window.location.href = window.shareServer + "/CreativeView"+"/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser||"")+"&step=3";
                                }else{
                                    $rootScope.$state.go("activity.oldandnewview", { step: "3" });
                                }
                            };
                            //设置机构介绍和联系方式模块是否显示
                            function renderOtherPage(isSharer,step,isHaveGrow){
                                //isSharer 当前用户是否是该页面的分享者
                                if(isSharer||step=="2"||isHaveGrow){
                                    //其他方案：使用禁止滚动，假装只有一页
                                    template20_3Service.setUiConfigOfIsShow(true);
                                    template20_4Service.setUiConfigOfIsShow(true);
                                    scope.isShowDownBtn = true;

                                }else{
                                    template20_3Service.setUiConfigOfIsShow(false);
                                    template20_4Service.setUiConfigOfIsShow(false);
                                    scope.isShowDownBtn = false;

                                }


                            }
                            //设置config 用于非正常途径存储和发起人喊人激活
                            scope.setConfigInfo = function() {
                                var config = commonNetService.getShareConfig();
                                //新用户需要个性设置分享标题和描述
                                if (config) {
                                    //有助力分享信息
                                    if (scope.isNeedHelp) {
                                        //助力完成后描述
                                        if (scope.userInfo1.helperNum == scope.templateModel.helperCount) {
                                            config.title = "感谢你们，帮我激活了" + scope.templateModel.couponsAmount + "元学费代金券~";
                                            config.desc = "点开链接，看看你是不是手气王？";
                                        }
                                        else {
                                            config.title = "【还差" + (scope.templateModel.helperCount - scope.userInfo1.helperNum) + "人】我的" + scope.templateModel.couponsAmount + "元学费代金券就激活啦~ ";
                                            config.desc = "快来帮我激活学费代金券，优惠多少就看你的了！";
                                        }
                                    }
                                    //无助力分享信息
                                    else {
                                        config.title = scope.userInfo1.name ? scope.userInfo1.name + "送你一张学费代金券~" : config.title;
                                        config.desc = "快来领取你的学费代金券，看看金额是多少！";
                                    }

                                    config.imgUrl = scope.userInfo1.headImg || config.imgUrl;

                                    return config;
                                }
                            };

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
                                uploadImgService.upLoadImg(template20_1Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                            };

                            //跳转到信息填写页面
                            scope.goForm = function () {
                                if (scope.isEdit) {
                                    return;
                                }
                                if (scope.status == "preview") {

                                    var stateName = scope.isAuth ? "activity.preview" : "activity.oldandnewpreview";

                                    $rootScope.$state.go(stateName, { step: "2"});
                                } else if (scope.status == "view") {
                                    if(window.isAllowDirectShare){
                                        window.location.href = window.shareServer + "/CreativeView"+"/activity/oldandnewview?Id=" + $rootScope.$stateParams.Id + "&oldUser=" + ($rootScope.$stateParams.oldUser||"")+"&step=2";
                                    }else{
                                        $rootScope.$state.go("activity.oldandnewview", { step: "2"});
                                    }

                                }
                            };

                        }
                    };
                }
        ]
        );
});