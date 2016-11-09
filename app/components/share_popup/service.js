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
                //����share image
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
                    //Container����С��СΪ��Ļ�Ĵ�С���޷���ȡ��Ļ�߶�ʱʹ��300*400
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
                //��ʾ����
                service.showSharePopup = function () {
                    service.config.isShow = true;
                };
                //�رյ���
                service.closeSharePopup = function () {
                    service.config.isShow = false;
                };
                //�رռ�ͷ��������
                service.closeMask = function () {
                    service.config.isShare = false;
                };
                //��ʾ����
                service.showMask = function () {
                    service.config.isShare = true;
                };
                return service;
            }
        ]);
});