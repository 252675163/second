"use strict";
/**
 * author :LTD
 * time: 2015年9月14日 15:35:48
 * description: 微活动老带新预览
 */


define([
    "ionic",
    "modules/micro-activity-oldandnew-preview-app/controller",
    "modules/micro-activity-oldandnew-preview-app/directive",
    //微官网模板组件
    // "components/templates/micro-activity-template/app",
     //微助力模板组件
    // "components/templates/micro-power-template/app",
    //微传单模板组件
    // "components/templates/micro-leaflet-template/app",
    "services/permission",
    "services/net/common",
    "modules/micro-activity-oldandnew-preview-app/leaflet-download-service"

], function() {
    return angular.module("MicroActivityOldAndNewPreviewApp", [
        "ionic",
        "MicroActivityOldAndNewPreviewApp.controllers",
        "MicroActivityOldAndNewPreviewApp.directives",
        // "MicroActiveOldAndNewTemplate",
        // "MicroPowerTemplate",
        // "MicroLeafletTemplate",
        "services.permission",
        "services.net.common",
        "LeafletDownload.services"
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("activity.oldandnewpreview", {
                    cache: false,
                    title: "校宝秀，秀出精彩活动~",
                    url: "/oldandnewpreview?templateId&activityId&isHold&isVip&step",
                    templateUrl: "modules/micro-activity-oldandnew-preview-app/micro-activity-oldandnew-preview-app.html",
                    controller: "MicroActivityOldAndNewPreviewAppController",
                    resolve: {
                        webSite: [
                            "activityPreviewNetService", "$stateParams", "$rootScope", "commonNetService","$timeout",
                            function(activityPreviewNetService, $stateParams, $rootScope, commonNetService, $timeout) {
                                //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                $(".lockMask-loading2").show();
                                return activityPreviewNetService.getActivity($stateParams.activityId, $stateParams.templateId).then(function (result) {

                                    var webSite = result.data;
                                    //数据统计
                                    commonNetService.saveBackLog({ OriginId: webSite.Id, Type: "Activity", Operation: "Preview" }).then(function(res) {
                                        //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13
                                        //如果是种草的表单页面，loading在种草指令里控制
                                        if($stateParams.step=='2'){

                                        }else if (!$rootScope.isFirstLoad) {
                                            $timeout(function () {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.$broadcast('hideLoading');
                                                $rootScope.isFirstLoad = true;
                                            }, 1833);
                                        } else {
                                            $timeout(function () {
                                                $(".lockMask-loading2").hide();
                                                $rootScope.$broadcast('hideLoading');
                                                $rootScope.isFirstLoad = true;
                                            }, 1000);
                                        }
                                    });
                                    return webSite;
                                });

                            }
                        ],
                        permission: [
                            "permissionService", "$stateParams", function(permissionService, $stateParams) {
                                return permissionService.hasPermission();
                            }
                        ]
                    }

                });

            }
        ]);
});