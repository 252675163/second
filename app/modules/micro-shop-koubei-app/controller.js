"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-koubei-app/services"],
    function() {
        return angular.module("MicroShopKoubeiApp.controllers", ["MicroShopKoubeiApp.services"])
            .controller("MicroShopKoubeiAppController", [
                "$scope", "$rootScope", "$window", "MicroShopKoubeiAppService","$timeout", 
                function($scope, $rootScope, $window, MicroShopKoubeiAppService,  $timeout) {

                    //关闭loading动画
                    $scope.hideLoading = function () {
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        }
                        else {
                            $timeout(function () {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                    }
                    function init() {
                        //关闭loading动画
                        $scope.hideLoading();
                    }

                    init();


                }
            ]);
    });