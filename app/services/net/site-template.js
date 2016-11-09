/**
 * Created by dayday on 2015/11/24.
 */
define(['ionic'], function () {
    return angular.module('services.net.siteTemplate', []).
        factory('siteTemplateNetService', ['$http', function ($http) {

            //微官网
            function saveUserBySite(date){
                return $http.post("/NewWebsite/AddUser",date);
            }
            //根据websiteId获取二维码 todo 不使用该接口
            function getQrCodeImgUrlByWebsiteId(websiteId){
                return $http.post("/NewWebsite/GetQrCodeById",{id:websiteId});
            }
            //根据链接、logo、和style获取二维码
            function getQrCodeImgUrlByConfig(link,logo,style){
                return $http.post("/NewWebsite/GetQrCode",{link:link,logo:logo,style:style});
            }
            //新官网点赞或取消赞
            function updatePraise(websiteId){
                return $http.post("/NewWebsite/EnterPraise",{id:websiteId});
            }
            return {
                saveUserBySite: saveUserBySite,
                getQrCodeImgUrlByWebsiteId:getQrCodeImgUrlByWebsiteId,
                getQrCodeImgUrlByConfig:getQrCodeImgUrlByConfig,
                updatePraise:updatePraise
            }

        }
        ]
    )
})