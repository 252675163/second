/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("showImageBig.Service", []).
        factory("showImageBigService", [
            "$http", "$timeout", function($http, $timeout) {

                var service = {};

                service.info = {
                    imageIndex: "",
                    isShow: false,
                    isEdit: '',
                    imageUrl: ''
                };
                service.setInfo = function (imageIndex, isShow,isEdit, imageUrl) {
                    service.info.imageIndex = imageIndex;
                    service.info.isShow = isShow;
                    service.info.isEdit = isEdit;
                    service.info.imageUrl = imageUrl;
                };


                return service;
            }
        ]);
});