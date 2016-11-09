"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic","services/net/templatesmodel"], function () {
    return angular.module("MicroSiteModeApp.services", ["services.net.templatesModel"])
        .service("microSiteModeAppService", [
            "$rootScope", "templatesModelService",
            function ($rootScope, templatesModelService) {
                var microSiteModeAppService = {};

                microSiteModeAppService.makeNewModel = function (modeId) {
                    return templatesModelService.makeNewWebsiteNewModel(modeId);
                };
                microSiteModeAppService.updteModules = function(modeId,oldModules){
                    return templatesModelService.updateWebsiteModulesByMode(modeId,oldModules);
                };

                return microSiteModeAppService;
            }
        ]);
});


