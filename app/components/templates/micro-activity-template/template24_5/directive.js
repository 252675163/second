"use strict";
/**
 * author :
 * time: 
 * description: 
 */


define(["ionic"], function () {
    angular.module("Template24_5.directives", [])
        .directive("template24by5", [
                "$window", "$timeout", "$rootScope", "template24_5Service", "maskService", "promptBarService", "commonNetService", function ($window, $timeout, $rootScope, template24_5Service, maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template24_5/template.html",
                        link: function (scope, iElement, iAttr) {
                            scope.getImageDoMain = function (url) {
                                return window.cdnDoMain + scope.templateExtConfig.imageFolderName + url;
                            }
                            //scope.defaultHeadImg = window.resourceDoMain + "/app/img/header_default1.png";
                            scope.defaultHeadImg = scope.getImageDoMain("/minor_default_avatar.png");
                            scope.defaultHeadImg2 = window.resourceDoMain + "/app/img/header_default2.png";

                            scope.isEdit = scope.status == "edit" ? true : false;
                            scope.isView = scope.status == "view" ? true : false;
                            //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                            function init() {
                                scope.rankList = [];
                                //userType old/new
                                if ($rootScope.$stateParams.oldUser) {
                                    scope.userType = "new";
                                } else {
                                    scope.userType = "old";
                                }

                                if (scope.isView && ($rootScope.$state.params.step != "2")) {
                                    var userId = $rootScope.$stateParams.oldUser || $rootScope.$state.params.Id;
                                    template24_5Service.getGrassRanks(userId, scope.userType).success(function (result) {
                                        if (result.status == 1) {
                                            scope.rankList = result.data;
                                            angular.forEach(scope.rankList, function (rank) {
                                                rank.HeadImg = rank.Config && (angular.fromJson(rank.Config).headImg != scope.defaultHeadImg2) ? angular.fromJson(rank.Config).headImg : scope.defaultHeadImg;
                                            });

                                            // warning 执行顺序 todo
                                            $timeout(function () {
                                                scope.userInfo = template24_5Service.getUserInfo();
                                            });

                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                    });
                                }
                            }
                            template24_5Service.setRenderCallback(init);

                            init();
                            

                        }

                    };

                }
        ]
        );
});