"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动-首页
 */


define([
    "ionic",
    "modules/micro-activity-index-app/directive",
    "modules/micro-activity-index-app/controller",
    "services/net/common"
], function () {

    return angular.module("MicroActivityIndexApp", [
        "ionic",
        "MicroActivityIndexApp.directives",
        "MicroActivityIndexApp.controllers",
        "services.net.common"

    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('activity.index', {
                    title: '我的场景',
                    cache: false,
                    url: '/index?id',
                    templateUrl: 'modules/micro-activity-index-app/micro-activity-index-app.html',
                    controller: 'MicroActivityIndexAppController'

                });

            }
        ]);
});
