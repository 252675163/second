"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/new-microsite-rank-app/services"],
    function () {
        return angular.module("MicroSiteRankApp.controllers", ["MicroSiteRankApp.services", "services.net.grass"])
            .controller("microSiteRankAppController", [
                "$scope", "$rootScope","$window","microSiteRankAppService", "promptBarService", "permissionService","maskService","commonNetService",
                function ($scope, $rootScope ,$window, microSiteRankAppService, promptBarService,permissionService,maskService,commonNetService) {
                    //活动说明的链接
                    $scope.showLink = "http://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=404774767&idx=2&sn=47ae0dabea22e63a70ce16b0b6636a52#wechat_redirect";
                    //场景无logo时使用的默认图片 todo
                    $scope.defaultLogo =microSiteRankAppService.defaultLogo;

                    var pageSize = 10;
                    $scope.page = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };

                    $scope.goWebsiteView = function (data) {
                        // view页面需要鉴权
                        //$scope.$state.go("newsite.view", { id: data.WebsiteId })
                        var link = window.shareServer + "/Home/ShareRoute?p=newsite/view?id=" + data.WebsiteId;
                        $window.location.href = link;
                    };
                    //滚动加载
                    $scope.loadMore = function () {
                        microSiteRankAppService.GetPraise($scope.page.currentIndex + 1, pageSize,$scope.isShareView,$scope.websiteId).success(function (result) {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                            if (result.status == 1 ) {
                                $scope.renderDataList(result.data.list, "add");
                                $scope.page = result.data.page;
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }

                        });
                    };

                    //数据渲染
                    $scope.renderDataList = function (list, renderType) {
                        //renderType:"reset"/"add"
                        //renderType默认为“reset”
                        if (!renderType) {
                            renderType = "reset";
                        }
                        
                        if (renderType == "add") {
                            $scope.list = $scope.list.concat(list);
                        } else {
                            $scope.list = list;
                        }
                        //数据列表为空显示引导页面 by xp 2015年10月27日 12:13:20
                        //if ($scope.data.length === 0) {
                        //    $(".active_add_empty").show();
                        //} else {
                        //    $(".active_add_empty").hide();
                        //}
                    };


                    function init(){
                        if($scope.$stateParams.isShareView=='true'){
                            $scope.isShareView = true;
                            $scope.websiteId = $scope.$stateParams.websiteId;

                        }else{
                            $scope.isShareView = false;
                            $scope.websiteId = 0;
                        }
                        microSiteRankAppService.GetPraise(1, pageSize,$scope.isShareView,$scope.websiteId).success(function (result) {
                            if (result.status == 1) {
                                $scope.userWebsiteInfo = result.data.info.TotalData;//加入风云榜的官网信息
                                $scope.isHaveWebsite = result.data.info.IsHaveWebsite;
                                $scope.renderDataList(result.data.list, "reset");
                                $scope.page = result.data.page;
                                //设置微信shareConfig
                                var shareConfig =microSiteRankAppService.getShareConfigByRankView($scope.userWebsiteInfo);
                                commonNetService.setShareMessageReception(shareConfig);
                            } else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                        //控制微信右上角的菜单功能，只开放 发送给朋友和分享到朋友圈，不允许用浏览器打开、复制链接等等操作
                        //发送给朋友: "menuItem:share:appMessage"
                        //分享到朋友圈: "menuItem:share:timeline"
                        window.wx && window.wx.hideOptionMenu();
                        window.wx && window.wx.showMenuItems({
                            menuList: ["menuItem:share:appMessage","menuItem:share:timeline"]
                        });
                        ////hack安卓手机不隐藏菜单栏问题，再次隐藏微信菜单栏
                        //if (ionic.Platform.isAndroid()) {
                        //    window.wx.hideOptionMenu();
                        //}



                    }
                    init();

                }
            ]);
    });