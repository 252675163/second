"use strict";
/**
 * author :yinglechao
 * time: 2015年10月20日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic"], function() {
    angular.module("Template13_5.directives", [])
        .directive("template13by5", [
                "$window", "$timeout", "$rootScope", "template13_5Service",  "maskService", "promptBarService", "commonNetService", function($window, $timeout, $rootScope,template13_5Service,  maskService, promptBarService, commonNetService) {
                    return {
                        restrict: "EA",
                        templateUrl: "components/templates/micro-activity-template/template13_5/template.html",
                        link: function (scope, iElement, iAttr) {
                            scope.defaultHeadImg = window.resourceDoMain+"/app/img/header_default1.png";
                            scope.defaultHeadImg2 = window.resourceDoMain+"/app/img/header_default2.png";

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
                                    template13_5Service.getGrassRanks(userId, scope.userType).success(function (result) {
                                        if (result.status == 1) {
                                            scope.rankList = result.data;
                                            angular.forEach(scope.rankList, function(rank) {
                                                rank.HeadImg = rank.Config && (angular.fromJson(rank.Config).headImg != scope.defaultHeadImg2) ? angular.fromJson(rank.Config).headImg : scope.defaultHeadImg;
                                            });

                                            $timeout(function() {
                                                scope.userInfo = template13_5Service.getUserInfo();
                                            });
                                            
                                        } else {
                                            promptBarService.showErrorBar(result.message, 3000);
                                        }
                                    });
                                }
                            }
                            template13_5Service.setRenderCallback(init);

                            init();


                        }

                    };
                }
            ]
        );
});