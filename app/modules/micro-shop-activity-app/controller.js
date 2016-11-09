"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-shop-activity-app/services"],
    function () {
        return angular.module("MicroShopActivityApp.controllers", ["MicroShopActivityApp.services"])
            .controller("MicroShopActivityAppController", [
                "$scope", "$rootScope", "$window", "promptBarService", "commonNetService", "MicroShopActivityAppService", "$ionicPopup", "$timeout", "maskService",
                function ($scope, $rootScope, $window, promptBarService, commonNetService, MicroShopActivityAppService, $ionicPopup, $timeout, maskService) {
                    function init() {
                    }

                    init();


                }
            ]);
    });