/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("MyAudio.Service", []).
        factory("myAudioService", [
            "$http", "$timeout", "$q",function($http, $timeout,$q) {

                var footerService = {};
                return footerService;
            }
        ]);
});