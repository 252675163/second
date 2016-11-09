"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:21:42
 * description:新微官网前台模块（无鉴权）
 */

define(["slip", "ionic", "modules/new-microsite-view-app/services", "services/net/common","components/footer/service"],
    function() {
        return angular.module("NewMicroSiteViewApp.controllers", ["NewMicroSiteViewApp.services", "services.net.common","MyFooter.Service"])
            .controller("NewMicroSiteViewAppController", [
                "$scope", "$rootScope", "NewMicroSiteViewAppService","newSiteNavService", "webSite", "commonNetService","myFooterService",
                function($scope, $rootScope, newMicroSiteViewAppService,newSiteNavService, webSite, commonNetService,myFooterService) {

                    $scope.getTemplateClassByStyleId = function(styleId){
                        return "newSite_tem"+styleId;//每套风格需要统一的命名规则
                    };
                    //隐藏导航栏
                    $scope.hideNav = function(){
                        newSiteNavService.hideNav();
                    };


                    $scope.init = function() {
                        $scope.data = webSite;
                        $scope.ifShowFeedback = false;

                        if (webSite.Config == null || webSite.Config == "") {
                            console.log("出错");
                            window.location.href = "/Common/error?mark=NewMicroSiteViewAppController_init_webSite.Config_IsNullOrEmpay";
                        } else {
                            $scope.siteModel = JSON.parse($scope.data.Config);
                           // $scope.siteModel.currentPageIndex = $rootScope.$stateParams.currentPageIndex ? $rootScope.$stateParams.currentPageIndex : 0;
                        }
                        //可用的模块
                        $scope.usableModules = $scope.siteModel.modules.filter(function(data){
                            return data.isDisabled==false;
                        });

                        ionic.EventController.on("showFeedbackForm", function(evt) {
                            $scope.ifShowFeedback = !$scope.ifShowFeedback;
                        });

                        //新增需求，页面title可自定义 2015年10月19日 20:52:21
                        if ($scope.data.ShareConfig) {
                            var config = angular.fromJson($scope.data.ShareConfig);
                            //将当前页面的title改成自定义之后的title
                            $scope.$state.current.title = config.title;
                            //新增需求：分享链接中的图片缩略图可被更改 by xp 2015年10月30日 20:42:41
                            $scope.$state.current.shareImg = config.imgUrl ? config.imgUrl : newMicroSiteViewAppService.getTemplateDefaultTitle($scope.data.TemplateId,$scope.siteModel.style).imgUrl;

                            //更新微信的分享链接为当前的url 2015.11.30 by yinglechao
                            config.link = window.shareServer + "/Home" + location.pathname.slice(0, -1) + "Route?p=" + location.hash.slice(2);
                            //新增需求，微信自定义分享链接
                            //微信自定义分享
                            commonNetService.setShareMessageReception(config);
                        }
                        var tmpobj = {
                            templateType: 1, //代表微官网
                            originId: $scope.data.Id,       //活动ID
                            formType:'report'           //举报类型
                        }
                        $scope.feedbackData = tmpobj;
                        myFooterService.setFooterandObj($scope.data.Footer, tmpobj);
                        $scope.templateStyleClass = $scope.getTemplateClassByStyleId($scope.siteModel.style);
                        $scope.praiseCount = $scope.data.PraiseCount;
                        $scope.isPraise = $scope.data.IsPraise;
                        //只开放微信的发送给朋友和发送到朋友圈这两个功能
                        window.wx && window.wx.hideOptionMenu();
                        window.wx && window.wx.showMenuItems({
                            menuList: ["menuItem:share:appMessage","menuItem:share:timeline"]
                        });

                    };
                    $scope.init();


                }
            ]);
    });