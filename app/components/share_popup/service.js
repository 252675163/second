/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function () {
    return angular.module("SharePopup.Service", []).
        factory("sharePopupService", [
            "$http", "$timeout", "$q", function ($http, $timeout, $q) {

                var service = {};
                service.config = {
                    shareModel: {},
                    saveCallback: function () {

                    },
                    shareCallback: function () {

                    },
                    isShow: false,
                    isShare: false
                }
                //更改share image
                service.imgConfig = {
                    aspectRatio: 1 / 1,
                    autoCropArea: 0.7,
                    strict: true,
                    guides: false,
                    center: true,
                    highlight: false,
                    dragCrop: false,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    zoom: -0.2,
                    checkImageOrigin: true,
                    background: false,
                    //Container的最小大小为屏幕的大小，无法获取屏幕高度时使用300*400
                    minContainerHeight: document.documentElement ? document.documentElement.clientHeight ? document.documentElement.clientHeight : 400 : 400,
                    minContainerWidth: document.documentElement ? document.documentElement.clientWidth ? document.documentElement.clientWidth : 300 : 300
                };

                //
                service.setSharePopupConfig = function (config) {
                    service.config.shareModel = config.shareModel;
                    service.config.saveCallback = config.saveCallback;
                    service.config.shareCallback = config.shareCallback;
                };
                //
                service.getShareModel = function () {
                    return service.config.shareModel;
                };
                //显示弹窗
                service.showSharePopup = function () {
                    service.config.isShow = true;
                };
                //关闭弹窗
                service.closeSharePopup = function () {
                    service.config.isShow = false;
                };
                //关闭箭头分享弹窗·
                service.closeMask = function () {
                    service.config.isShare = false;
                };
                //显示弹窗
                service.showMask = function () {
                    service.config.isShare = true;
                };
                return service;
            }
        ]);
});