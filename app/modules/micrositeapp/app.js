"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:22:48
 * description: 微官网主模块
 */


define([
    "ionic",
    "modules/micrositeapp/directive",
    "modules/micrositeapp/controller",

    //挂载微官网子模块
    //    "modules/microsite-index-app/app",
    //"modules/microsite-edit-app/app",
    //"modules/microsite-back-app/app",
    //"modules/microsite-add-app/app",
    //"modules/microsite-preview-app/app",
    //"modules/new-microsite-mode-app/app",//切换模式
    //"modules/microsite-publish-app/app",
    //"modules/microsite-view-app/app",
    //"modules/microsite-statistics-app/app",
    //"components/upload_img/app",
    //"components/mask/app"

], function() {

    return angular.module("MicroSiteApp", [
            "ionic",
            "MicroSiteApp.directives",
            "MicroSiteApp.controllers",
            //挂载微官网子模块
            //"MicroSiteIndexApp",
            //"MicroSiteEditApp",
            //"MicroSiteBackApp",
            //"MicroSiteAddApp",
            //"MicroSitePreviewApp",
            //"newsite.chooseMode",
            //"MicroSitePublishApp",
            //"MicroSiteViewApp",
            //"MicroSiteStatisticsApp",
            //"Mask"
        ])
        .config([
            '$stateProvider',
            function($stateProvider) {

                $stateProvider.state('site', {
                    abstract: true,
                    url: '/site',
                    templateUrl: 'modules/micrositeapp/micrositeapp.html',
                    controller: 'MicroSiteAppController'

                });

            }
        ]);
});