/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("ErrorRemind.Service", []).
        factory("errorRemindService", [
            "$http", "commonNetService",function($http,commonNetService) {

                var errorRemindService = {};

                return errorRemindService;
            }
        ]);
})