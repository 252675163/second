/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("NewSiteNav.Service", []).
        factory("newSiteNavService", [
            "$http", "$timeout", "$q","templatesModelService",function($http, $timeout,$q,templatesModelService) {

                var service = {};
                service.navData = {
                    isHideNavBox:false
                };
                service.setFooter = function(footer){
                    service.data.footer = footer;
                };
                service.getIsUseableModulesByModeId= function(modeId){
                   return  templatesModelService.getIsUseableModulesByModeId(modeId);
                };
                service.hideNav = function(){
                    $timeout(function(){
                        service.navData.isHideNavBox = true;
                    },0)
                };


                return service;
            }
        ]);
});