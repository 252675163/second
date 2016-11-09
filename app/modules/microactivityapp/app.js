"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微活动主模块
 */


define([
    "ionic",
    "modules/microactivityapp/directive",
    "modules/microactivityapp/controller",
], function() {

    return angular.module("MicroActivityApp", [
            "ionic",
            "MicroActivityApp.directives",
            "MicroActivityApp.controllers",
            
        ])
        .config([
            "$stateProvider",
            function($stateProvider) {

                $stateProvider.state("activity", {
                    abstract: true,
                    url: "/activity",
                    cache: false,
                    templateUrl: "modules/microactivityapp/microactivityapp.html",
                    controller: "MicroActivityAppController"

                });

            }
        ]);
});