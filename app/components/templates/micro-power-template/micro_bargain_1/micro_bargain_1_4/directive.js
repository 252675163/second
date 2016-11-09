"use strict";
/**
 * author :xujiawen
 * time: 2016年6月29日
 * description:砍价联系方式
 */


define(["ionic"], function () {
    angular.module("MicroBargain1_4.directives", [])
        .directive("microBargain1by4", [
                "$window", "$timeout", "$rootScope", "microBargain1_4Service", "uploadImgService", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, microBargain1_4Service, uploadImgService, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-power-template/micro_bargain_1/micro_bargain_1_4/template.html",
                        link: function (scope, iElement, iAttr) {

                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            function init() {        
                                scope.isEdit = scope.status == "edit" ? true : false;
                                scope.isView = scope.status == "view" ? true : false;
                                //userType old/new
                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }

                                if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                    scope.sectionModel.templateModel = angular.copy(microBargain1_4Service.model);
                                    scope.templateModel = scope.sectionModel.templateModel;
                                }

                               
                            }
                            
                            init();
                        }

                    };
                }
        ]
        );
});