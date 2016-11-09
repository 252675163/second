"use strict";
/**
 * author :LTD
 * time: 2015年9月11日 15:03:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-view-app/services", "services/net/common"],
    function() {
        return angular.module("MicroActivityOldAndNewViewApp.controllers", ["MicroActivityOldAndNewViewApp.services", "services.net.common"])
            .controller("MicroActivityOldAndNewViewAppController", [
                "$scope", "$window", "$rootScope", "MicroActivityOldAndNewViewAppService", "webSite", "$sce", "commonNetService","myFooterService","promptBarService","activityBusinessService",
                function ($scope, $window, $rootScope, microActivityOldAndNewViewAppService, webSite, $sce, commonNetService, myFooterService, promptBarService,activityBusinessService) {
                    $scope.isOpen = true;
                    $scope.isBottom = false;
                    $scope.ifShowFeedback = false;

                    $scope.$watchGroup(["siteModel.currentSectionIndex", "siteModel.currentPageIndex"], function(nv, ov) {
                        if (nv === ov) {
                            return;
                        }
                        //如果新的currentIndex是显示的section的最后一个索引值是新的currentSectionIndex，说明没有下一个可显示的section，显示页脚
                        if($scope.sectionIndexListForShow[$scope.sectionIndexListForShow.length-1]== nv[0]){
                        //if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length == nv[0] + 1) {
                            $scope.isBottom = true;
                        } else {
                            $scope.isBottom = false;
                        }
                    }, true);

                    //控制音乐开关
                    $scope.closeAndOpenMusic = function() {
                        $scope.isOpen = !$scope.isOpen;
                        if ($scope.isOpen) {
                            $scope.audioHandle.play();
                        } else {
                            $scope.audioHandle.pause();
                        }
                    };


                    $scope.openView = function() {
                        window.open($scope.data.Footer);
                    };
                    ionic.EventController.on("showFeedbackForm", function(evt) {
                        $scope.ifShowFeedback = !$scope.ifShowFeedback;
                    });
                  
                  

                    $scope.init = function() {
                        $scope.audioHandle = {};
                        $scope.data = webSite;
                        $scope.templateId = $scope.data.TemplateId;
                        //2016.4.21 增加模板的扩展配置信息（title是否写死，是否使用页脚，是否使用滑动组件……）by yinglechao
                        $scope.templateExtConfig = activityBusinessService.parseJsonToObjForTemplateExtConfig(webSite.UiConfig);
                        $scope.templateCode =webSite.TemplateCode;
                        $scope.activityType=webSite.ActivityType;
                        $scope.isUseWeinxinShare = webSite.ShareMode == 0 ? true : false;
                        //2016.6.27 可由指令修改的场景配置信息 里面的字段对应数据库中的字段
                        var activityExtConfig = {};
                        try {
                            activityExtConfig = JSON.parse(webSite.ExtConfig);
                        } catch (err) {
                            activityExtConfig = {};
                        }
                        $scope.activityOtherConfig = {
                            activityExtConfig: activityExtConfig,//场景(活动)扩展配置信息
                            endDate: webSite.EndDate//场景(活动)截止日
                        }
                        //如果当前连接不允许直接分享，则使用微信的自定义分享
                        if(!window.isAllowDirectShare){
                                $scope.isUseWeinxinShare=true;
                        }
                        //(如果没有引进微信js文件），那么使用直接分享
                        if (!window.wx) {
                            $scope.isUseWeinxinShare = false;
                        }

                        //默认跳到第n屏
                        if ($scope.$stateParams.defaultCurrentIndex) {
                            $scope.defaultCurrentIndex = parseInt($scope.$stateParams.defaultCurrentIndex);
                        } else {
                            $scope.defaultCurrentIndex = 0;
                        }
                        //根据配置获取背景音乐位置
                        $scope.audioPosClass = activityBusinessService.getBgAudioPosClassName($scope.templateExtConfig);
                        $scope.isEnd = $scope.data.IsEnd;
                        if (webSite.Config == "" || webSite.Config == null) {
                            //location.href = "/Common/Error";
                            //return;
                            //warning 查看页面没有Config结构，不在创建默认数据  2015年11月18日 14:27:25
//                            $scope.siteModel = microActivityOldAndNewViewAppService.makeNewModel(webSite.OrgName, $scope.stateParams.templateId);
                        } else {
                            //$scope.siteModel = JSON.parse($scope.data.Config);
                            //modelToUiModel by yinglechao 2016.6.6
                            $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse($scope.data.Config));
                        }

                        //新增需求，页面title可自定义 2015年10月19日 20:52:21 
                        if ($scope.data.ShareConfig) {
                            var config = angular.fromJson($scope.data.ShareConfig);
                            //将当前页面的title改成自定义之后的title
                            //2016.1.29 春节活动title写死 by yinglechao
                            if($scope.templateId==18){
                                $scope.$state.current.title = "送春联，拜大年";
                                //如果是二次分享 使用默认的摘要，不使用机构匹配置的摘要
                                //if($scope.$stateParams.oldUser){
                                    config.desc = microActivityOldAndNewViewAppService.getTemplateDefaultTitle($scope.data.TemplateId).desc;
                                //}
                            }else if($scope.templateId==19){
                                //种菜title写死 2016.3.9 by yinglechao
                                $scope.$state.current.title = "快来农场帮我种菜，收成就靠你了";
                            }else if($scope.templateExtConfig.titleConfig.isHardcoded){
                                //2016.4.21 title根据数据库中的template的templateExtConfig渲染挑剔 by yinglechao
                                $scope.$state.current.title=$scope.templateExtConfig.titleConfig.titleContent;
                            } else{
                                $scope.$state.current.title = config.title;
                            }
                            //新增需求：分享链接中的图片缩略图可被更改 by xp 2015年10月30日 20:42:41
                            $scope.$state.current.shareImg = config.imgUrl ? config.imgUrl : microActivityOldAndNewViewAppService.getTemplateDefaultTitle($scope.data.TemplateId).imgUrl;

                            //更新微信的分享链接为当前的url 2015.11.30 by yinglechao
                            //warning 对新种草和圣诞活动 做特殊逻辑 by xp 2015年12月15日 02:09:46 
                            if ($scope.templateId == 13 || $scope.templateId == 14|| $scope.templateId == 18) {
                                config.link = window.shareServer + "/CsngShare?p=" + location.hash.slice(2);
                            } else if ($scope.templateId == 19) {
                                //种菜路由或模板类型是助力
                                var shareRouter = window.creativeViewShareRouter + Math.random().toString(36).substr(2) + "Share";
                                config.link = window.shareServer + "/" + shareRouter + "?p=" + location.hash.slice(2);
                            }else if($scope.activityType==3){
                                config.link =location.href;
                            }else if($scope.activityType==4){
                                config.link =location.href;
                            }else {
                                //config.link = window.activityServer  + "/Home" + location.pathname.slice(0, -1) + "Route?p=" + location.hash.slice(2);
                                //2016.10.2  无鉴权的路由直接分享使用随机路由
                                config.link = window.activityServer + "/Activity" + Math.random().toString(36).substr(2) + "ShareRoute?p=" + encodeURIComponent(location.hash.slice(2));
                            }
                            
                            //新增需求，微信自定义分享链接
                            //微信自定义分享
                            //2016.5.3 是否使用微信自定义分享可运营后台设置
                            if($scope.isUseWeinxinShare){
                                commonNetService.setShareMessageReception(config);
                            }else{
                                // 只设分享给朋友的shareConfig
                                commonNetService.setShareAppMessageReception(config);

                            }
                        }
                        var  tmpobj = {
                            templateType:$scope.data.TemplateType, //代表微官网
                            originId:$scope.data.Id,       //活动ID
                            formType:'report'
                        }

                        $scope.feedbackData = tmpobj;

                        myFooterService.setFooterandObj($scope.data.Footer,tmpobj);
                        $scope.musicUrl = $sce.trustAsResourceUrl($scope.siteModel.pages[0].backgroundAudio);
                        //$scope.myaudio = document.getElementById("myaudio");
                        //setTimeout(function () {
                        //    $scope.myaudio.load();
                        //    //hack ios下不能循环播放  by xp 2015年11月28日 16:17:52
                        //    $scope.myaudio.addEventListener("ended", function () {
                        //        //等待500毫秒
                        //        setTimeout(function () { $scope.myaudio.play(); }, 500);
                        //    }, false);
                        //    $scope.myaudio.play();
                        //}, 0);


                        //处理该实例是否超过截止日  目前只作用于新种草活动和圣诞活动 templateId 13   templateId  14
                        
                        if ($scope.templateId == 13 || $scope.templateId == 14 || $scope.templateId == 18|| $scope.templateId == 19 ||$scope.templateExtConfig.isOpenDeadingFunction) {
                            if ($scope.isEnd) {
                                promptBarService.showErrorBar2("抱歉，您来晚了，活动已结束！");
                            }
                            
                        }
                        //在view状态显示的section索引值列表  2016.5.24
                        $scope.sectionIndexListForShow = [];
                        //渲染模板指令
                        angular.forEach($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections, function (section, sectionIndex) {
                            if (section.isHideInView!==true) {
                                $scope.sectionIndexListForShow.push(sectionIndex);
                            };
                        });
                        $scope.currentSectionIndex=$scope.sectionIndexListForShow[0];

                        //如果只有一个section在view页面显示，将isBottom置为true
                        if ($scope.sectionIndexListForShow.length == 1) {
                            $scope.isBottom = true;
                        }
                    };
                    $scope.init();

                    //$scope.$on("$stateChangeStart", function() {
                    //    document.getElementById("myaudio").pause();
                    //    document.getElementById("myaudio").setAttribute("src", "");
                    //});
                }
            ]);
    });