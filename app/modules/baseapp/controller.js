"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/baseapp/services"],
    function () {
        return angular.module("BaseApp.controllers", ["BaseApp.services"])
            .controller("BaseAppController", [
                "$scope", "$rootScope", "BaseAppService",
                function ($scope, $rootScope, baseAppService) {
                    

                }
            ]);
    });
