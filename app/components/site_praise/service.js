/**
 * Created by dayday on 2016/1/6.
 */
define(["ionic","services/net/site-template"], function() {
    return angular.module("SitePraise.Service", ["services.net.siteTemplate"]).
        factory("sitePraiseService", [
            "$http", "$timeout", "$q","$rootScope","siteTemplateNetService",function($http, $timeout,$q,$rootScope,siteTemplateNetService) {

                var sitePraiseService = {};

                sitePraiseService.updatePraise = function(websiteId){
                    return siteTemplateNetService.updatePraise(websiteId);
                };

                return sitePraiseService;
            }
        ]);
});