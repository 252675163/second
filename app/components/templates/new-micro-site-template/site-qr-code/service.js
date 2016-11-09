/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic','services/net/site-template'], function () {
    return angular.module('siteQrCode.Service', ["services.net.siteTemplate"]).
        factory('siteQrCodeService', ['activityFormService','siteTemplateNetService', function (activityFormService,siteTemplateNetService) {

            var service = {};
            service.model = {};
            service.defaultModel = {};

            service.qrcode = "";
            service.defaultWebsiteIdObj= {
                //'1'急速版，‘2’标准班，‘3’豪华版
                '1':['',1,2,3,4,5,6,7,8],
                '2':['',21,22,23,24,25,26,27,28],
                '3':['',31,32,33,34,35,36,37,38]
            };
            service.getDefaultWebsiteIdByModeAndStyle = function(styleId,modeId){
                return service.defaultWebsiteIdObj[modeId][styleId];
            };
            //获取已经保存的二维码图片
            service.getQrCodeImgUrlByWebsiteId = function(websiteId){
                return siteTemplateNetService.getQrCodeImgUrlByWebsiteId(websiteId);
            };
            //根据链接、logo、和style获取相应的二维码图片
            service.getQrCodeImgUrlByConfig = function(link,logo,style){
                return siteTemplateNetService.getQrCodeImgUrlByConfig(link,logo,style);
            };           
            return service;
                }]);
});