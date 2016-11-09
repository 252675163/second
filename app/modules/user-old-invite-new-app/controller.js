"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/user-old-invite-new-app/services", "services/net/common"],
    function() {
        return angular.module("UserOldInviteNewApp.controllers", ["UserOldInviteNewApp.services", "services.net.common"])
            .controller("OldInviteNewController", [
                "$scope", "$rootScope", "promptBarService", "commonNetService", "OldInviteNewAppService", "$ionicPopup", "$timeout","$location",
                function ($scope, $rootScope, promptBarService, commonNetService, OldInviteNewAppService, $ionicPopup, $timeout, $location) {
                    
                    $scope.goVIPOderList = function () {
                        $scope.$state.go("VIPOrderList", {}, { reload: true });
                    };

                    $scope.goOrderList = function () {
                        $scope.$state.go("userOrderList", { comeFrom: 2 }, { reload: true });
                    }

                    $scope.showLink = "http://mp.weixin.qq.com/s?__biz=MzIxNDA5MTcyOQ==&mid=408105356&idx=1&sn=0928289d71435aaeb5cf9da02694d8cf";


                    $scope.goSecond_step = function () {
                        //$scope.fisrt_step = false;
                        //$scope.$state.go('OldInviteNew', { share: true });
                        //$scope.$state.params.share = true;
                        //console.log($location.path());
                        $location.search('id', $scope.UserInfo.Id);
                        
                    }

                

                    function init() {
                        //如果没有id参数，则认为是后台页面需要记录该模块
                        if (!$scope.$state.params.id) {
                            commonNetService.addBackgroundOperationLog("Invitation");
                        }
                       

                        var id = $scope.$state.params.id;
                        var isshare = $scope.$state.params.isshare;

                        //是否是打印页
                        $scope.isCutPage = $scope.$state.params.iscutpage;

                        OldInviteNewAppService.getInviteQRcode(id,isshare).then(function (result) {
                            if (result.data.status == 1) {
                                $scope.fisrt_step = true;
                                $scope.UserInfo = result.data.data;
                                if (id) {
                                    $scope.UserInfo.Id = id;
                                    $scope.fisrt_step = false;
                                    $scope.$state.current.title = "校宝秀-微信招生神器";
                                }
                                share($scope.UserInfo.Id);
                                
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }


                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                            if (!$rootScope.isFirstLoad) {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1833);
                            } else {
                                $timeout(function () {
                                    $(".lockMask-loading2").hide();
                                    $rootScope.isFirstLoad = true;
                                }, 1000);
                            }

                            if (ionic.Platform.isAndroid()) {
                                $scope.isWebChatQrcode = true;
                            }
                        });
                        //commonNetService.showOptionMenu();
                    }

                    init();

                    function share(id) {
                        var baseUrl = "";
                        baseUrl = window.activityServer + "/Home/InvitationRoute?p=oldinvitenew?id=" + id;


                        var defaultShareModel = OldInviteNewAppService.DefaultShareModel;

                        var showShareTitlePopModel = {
                            shareTitle: ($scope.UserInfo.NickName || $scope.UserInfo.Phone) + defaultShareModel.shareTitle,
                            imageUrl: $scope.UserInfo.HeadImgUrl,
                            desc: defaultShareModel.desc,
                            link: baseUrl,
                        };

                        var shareConfig = OldInviteNewAppService.shareConfigModel(showShareTitlePopModel.shareTitle, showShareTitlePopModel.desc, showShareTitlePopModel.link, showShareTitlePopModel.imageUrl);
                        //console.log(shareConfig);
                        commonNetService.setShareMessage(shareConfig).then(function () {
                            //console.log('111111');
                            //$scope.renderList().then(function () {
                            //$scope.$state.go('userCenter', { reload: true });
                            //});

                        });
                    }


                }
            ]);
    });