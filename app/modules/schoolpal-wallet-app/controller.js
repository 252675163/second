"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/schoolpal-wallet-app/services"],
    function () {
        return angular.module("SchoolpalWalletApp.controllers", ["SchoolpalWalletApp.services"])
            .controller("SchoolpalWalletAppController", [
                "$scope", "$rootScope", "$window", "$timeout",
                function ($scope, $rootScope, $window, $timeout) {

                    function init() {

                    }
                    //��ȡ��վ·��
                    $scope.getIndexRouter = function (url) {
                        return window.server + "/home/index#/" + url;
                    }
                    //��ȡ����·��
                    $scope.getWithdrawRouter = function (url) {
                        return window.server + "/MicroShop/WalletRoute?p=" + url;
                    }
                    //�ر�loading����
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
                    init();


                }
            ]);
    });