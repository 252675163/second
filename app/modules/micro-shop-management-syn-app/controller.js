"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-management-syn-app/services"],
    function () {
        return angular.module("MicroShopManagementSynApp.controllers", ["MicroShopManagementSynApp.services"])
            .controller("MicroShopManagementSynAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService) {
                    //================================
                    //type类型说明
                    //1：微信公众号同步教程
                    //2：口碑授权开店教程
                    //3：口碑pc、移动端订购服务教程
                    //================================
                    $scope.choiceImg=function(){
                        var imgUrl;
                        switch (parseInt($scope.type)) {
                            case 1:
                                imgUrl = "/app/img/microshop-syn-introduction.jpg";
                                $rootScope.$state.current.title = "二维码授权";
                                break;
                            case 2:
                                imgUrl = "/app/img/microshop-koubei-sync-introduction.jpg";
                                $rootScope.$state.current.title = "口碑授权开店教程";
                                break;
                            case 3:
                                imgUrl = "/app/img/microshop-koubei-sync-pcMobile.jpg";
                                $rootScope.$state.current.title = "订购服务教程";
                                break;
                        }
                        $scope.introductionImg = window.resourceDoMain + imgUrl;
                    }

                    $scope.toSyn = function (type) {
                        $scope.$state.go("microshopmanagement.synqrcode", { type: type});
                    }

                    function init() {
                        //图片选择
                        $scope.type = $scope.$stateParams.type;
                        $scope.choiceImg();
                           


                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    
                    init();


                }
            ]);
    });