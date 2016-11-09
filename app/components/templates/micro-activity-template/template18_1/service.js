/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'services/net/activity-template'], function () {
    return angular.module('Template18_1.Service', ['services.net.activityTemplate']).
        factory('template18_1Service', ['$http', 'activityFormService', 'activityTemplateService', function ($http, activityFormService, activityTemplateService) {

            var service = {};
            service.model =
            {
                name: 'XXX',
                otherInfo:'祝您新年快乐，万事如意',
                imageUrl: [window.resourceDoMain + "/app/img/header_default2.png", ''],//用户头像、机构logo
                couplet: ['新年天天好心情','发个红包行不行']//对联
            };

            service.couplet = [
                ['新年天天好心情','发个红包行不行'],
                ['好运天天追你跑', '红包滚滚进钱包'],
                ['红包给多少', '主要看气质'],
                ['大圣归来送祥瑞', '讨个红包过壕年'],
                ['辞旧迎新三羊开泰', '开门纳福六猴送安'],
                ['新春来到祝福也到','恭喜发财红包拿来']
            ];
            //第二部默认的对联
            service.defaultUserInfo =
            {
                name:"XXX",
                otherInfo:'祝您新年快乐，万事如意',//祝福语
                couplet:service.couplet[0]
            };

            var coupletCount =  service.couplet.length;
            //随机取对联
            service.getCoupletByRandom = function(){
                var  index =  Math.ceil(Math.random()*(coupletCount-1));
                return  angular.copy(service.couplet[index])
            };

            //判断某一对联是否是默认对联
            service.coupletIsInDefaultCouplet = function(couplet){
                for(var i = 0;i<service.couplet.length;i++){
                    if(couplet[0]==service.couplet[i][0]&&couplet[1]==service.couplet[i][1]){
                        return true;
                    }
                }
           
                return false
            };
            service.saveInfo = function (data) {
                return activityFormService.saveOldUser(data, false);
            };

            //获取用户信息
            service.getActivityUserInfo = function (userId, userType) {
                var isFirstShare = userType == "old" ? true : false;//是否是机构分享出来
                return activityTemplateService.getActivityUserInfo(userId, isFirstShare);
            };
            //获取当前用户的微信信息，微信头像和微信名称
            service.getWeixinUserInfo = function () {
                return activityTemplateService.getWeixinUserInfo();
            };

            service.getConfigByAspectRatio = function (aspectRatio) {
                return {
                    aspectRatio: aspectRatio ? aspectRatio : 16 / 9,
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
            };


            return service;
        }]);
});



