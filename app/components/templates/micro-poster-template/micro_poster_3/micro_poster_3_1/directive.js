"use strict";
/**
 * author :陈雪冬
 * time: 2016年8月12日14:49:41
 * description: 贺卡模板 1
 */


define(["ionic"], function () {
    angular.module("MicroPoster3_1.directives", [])
        .directive("microposter3by1", [
            "$window", "$timeout", "$interval", "$rootScope", "$q", "$filter", "$ionicScrollDelegate", "microPoster3_1Service", "uploadImgService", "maskService", "promptBarService", "commonNetService"
            , function ($window, $timeout, $interval, $rootScope, $q, $filter, $ionicScrollDelegate, microPoster3_1Service, uploadImgService, maskService, promptBarService, commonNetService) {
                return {
                    restrict: "EA",
                    templateUrl: "components/templates/micro-poster-template/micro_poster_3/micro_poster_3_1/template.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {

                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microPoster3_1Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }

                            scope.step = $rootScope.$stateParams.step || 1;

                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;

                            if (!scope.isEdit) {
                                var docEl = document.documentElement;
                                iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + (docEl.clientHeight +1) + "px";
                                if (scope.step == 3) {
                                    iElement[0].getElementsByClassName("poster3-footer")[0].style.top = "" + (docEl.clientHeight +1) + "px";
                                }
                            }

                        }

                        init();



                    }
                };
            }
        ]
        );
});