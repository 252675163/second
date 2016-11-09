/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("ScratchCard.Service", []).
        factory("scratchCardService", [
            "$http", "$timeout", "$q",function($http, $timeout,$q) {

                var scratchCardService = {};
                scratchCardService.scratchData = {
                    isShow:true
                }
                scratchCardService.hide = function () {
                    scratchCardService.scratchData.isShow = false;
                }

                return scratchCardService;
            }
        ]);
});