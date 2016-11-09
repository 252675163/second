/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("UserTerms.Service", []).
        factory("userTermsService", [
            "$http", "$timeout", function($http, $timeout) {

                var service = {};
                service.termsModel = {
                    isShow: false,
                    isShowMicroshopUserTerms:false
                };
                service.showUserTerms = function () {
                    service.termsModel.isShow = true;
                }
                //显示微店用户条款
                service.showMicroshopUserTerms = function () {
                    service.termsModel.isShowMicroshopUserTerms = true;
                }
                return service;
            }
        ]);
});