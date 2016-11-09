"use strict";
/**
 * author :
 * time:
 * description:
 */

define(["ionic", "modules/micro-activity-new-app/services", "services/net/grass"],
    function() {
        return angular.module("MicroActivityNewApp.controllers", ["MicroActivityNewApp.services", "services.net.grass"])
            .controller("microActivityNewAppService", [
                "$scope", "$rootScope", "microActivityNewAppService", "promptBarService", "microActivityAppService", "grassNetService",
                function($scope, $rootScope, microActivityNewAppService, promptBarService, microActivityAppService, grassNetService) {

                    $scope.activityTemplateList = "";

                    //跳到预览
                    $scope.goPreview = function(acytivityTemlateId) {
                        if (acytivityTemlateId == 2) {
                            var defaultMsg = "\n     一棵草 = 1张学费抵扣券\n   种草享优惠，还不赶紧试试";
                            var preFix = "              ";
                            grassNetService.getDetail($rootScope.UserId, acytivityTemlateId, "").success(function(data) {
                                if (data) {
                                    if (!data.Config) {
                                        var a = {};
                                        a.title = preFix + data.OrgName + defaultMsg;
                                        a.musicId = "http://schoolpal.oss-cn-hangzhou.aliyuncs.com/shiningstar/Activity/20150918164321-6ad0d.mp3";
                                        data.Config = JSON.stringify(a);
                                    }
                                    if (data.UserId == 0 && data.TemplateId == 0) {
                                        data.TemplateId = acytivityTemlateId;
                                        data.UserId = $rootScope.UserId;
                                    }
                                    $scope.cacheData = data;
                                } else {
                                    //获取默认数据
                                    var temp = grassNetService.getActivityMockInfo($rootScope.UserId, acytivityTemlateId);
                                    $scope.cacheData = temp;
                                }
                                microActivityAppService.setGrassPreview($scope.cacheData);
                                $scope.$state.go("activity.grassindexb", { ispreview: true, stuid: 1 });
                            });

                        } else {
                            delete($rootScope.siteModel);
                            $rootScope.$state.go("activity.oldandnewpreview", { templateId: acytivityTemlateId });
                        }

                    };
                    //跳到编辑
                    $scope.goEditView = function (acytivityTemlateId) {
                        //hardCode 种草活动templateId为2
                        if (acytivityTemlateId === 2) {
                            $rootScope.$state.go("activity.grass", {
                                userId: $rootScope.UserId,
                                templateId: acytivityTemlateId
                            });
                        } else {
                            delete($rootScope.siteModel);
                            $rootScope.$state.go("activity.oldandnewedit", { templateId: acytivityTemlateId });
                        }


                    };

                    $scope.init = function() {
                        microActivityNewAppService.getActivityTemplate().then(function(result) {
                            if (result.status == 200) {
                                $scope.activityTemplateList = result.data;
                            } else {
                                promptBarService.showErrorBar("联系客服", 3000);
                            }


                        }, null);
                    };
                    $scope.init();


                }
            ]);
    });