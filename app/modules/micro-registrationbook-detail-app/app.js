"use strict";
/**
 * author :lv li、xu jie、jiawen xu、zhoudewei
 * update time: 2016/10/8
 * description:咨询本详情页
 */


define([
    "ionic",
    "modules/micro-registrationbook-detail-app/controller",
    "services/permission",
    "components/consult_item/app",
    "modules/micro-registrationbook-detail-app/filters"
], function() {
    return angular.module("MicroRegistrationbookDetailApp", [
            "ionic",
            "MicroRegistrationbookDetailApp.controllers",
            "services.permission",
            "ConsultItem",
            "MicroRegistrationbookDetailFilter"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('registrationbook.registrationbookdetail', {
                    title: '咨询详情',
                    cache: false,
                    url: '/registrationbookdetail?id&trace&showPage',
                    templateUrl: 'modules/micro-registrationbook-detail-app/micro-registrationbook-detail-app.html',
                    controller: 'microRegistrationbookDetailAppController',
                    resolve: {
                        permission: ["permissionService", "$stateParams", function(permissionService, $stateParams) {
                            //自定义跟踪页面
                            /*if (window._hmt) {
                                $stateParams.trace && window._hmt.push(['_trackPageview', "/" + $stateParams.trace]);
                                window._hmt.push(['_trackPageview', "/registrationbook/CRMdetails"]);
                            }*/

                            //统一增加后台页面的Loading效果 by xp 2015年11月13日 16:09:13

                            return permissionService.hasPermission();
                        }]
                    }

                });

            }
        ]);
});