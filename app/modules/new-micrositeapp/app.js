"use strict";
/**
 * author :小潘
 * time: 2015年12月1日 15:26:17
 * description: 新微官网主模块
 */


define([
    "ionic",
    //"modules/new-micrositeapp/directive",
    "modules/new-micrositeapp/controller",

    //挂载微官网子模块
    // "modules/new-microsite-edit-app/app",
    // "modules/new-microsite-preview-app/app",
    // "modules/new-microsite-view-app/app",
    // "modules/new-microsite-publish-app/app",//发布
    // "modules/new-microsite-mode-app/app",//切换模式,
    // "modules/new-microsite-style-app/app",//风格选择
    // "modules/new-microsite-rank-app/app",//排行榜,
    // "modules/new-microsite-statistics-app/app",
    // "modules/new-microsite-consultbook-app/app",
    // "components/upload_img/app",
    // "components/mask/app",
    // "components/site_form/app",
    // "components/footer/app",
    // "components/new_site_nav/app",
    // "components/user_terms/app",

], function () {

    return angular.module("NewMicroSiteApp", [
        "ionic",
        //"NewMicroSiteApp.directives",
        "NewMicroSiteApp.controllers",
        //挂载微官网子模块
        // "NewMicroSiteEditApp",
        // "NewMicroSitePreviewApp",
        // "NewMicroSiteViewApp",
        // "NewMicroSitePublishApp",
        // "MicroSiteModeApp",
        // "NewMicroSiteStyleApp",
        // "MicroSiteRankApp",
        // "NewMicroSiteStatisticsApp",
        // "NewMicrositeConsultBookApp",
        // "Mask",
        // "SiteForm",
        // "MyFooter",
        // "NewSiteNav",
        // "UserTerms"
    ])
        .config([
            '$stateProvider',
            function ($stateProvider) {

                $stateProvider.state('newsite', {
                    abstract: true,
                    url: '/newsite',
                    cache: false,
                    templateUrl: 'modules/new-micrositeapp/new-micrositeapp.html',
                    controller: 'NewMicroSiteAppController'

                });

            }
        ]);
});
