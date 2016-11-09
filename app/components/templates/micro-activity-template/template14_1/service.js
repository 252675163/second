/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic', 'services/net/activity-template'], function() {
    return angular.module('Template14_1.Service', ['services.net.activityTemplate']).
    factory('template14_1Service', ['$http', 'activityFormService', 'activityTemplateService', function($http, activityFormService, activityTemplateService) {

        var service = {};
        service.model = {
            title: '满天星教育集团',
            description: '1个圣诞礼物=1张学费抵扣券<br/>礼物排行榜前10名将有机会获得神秘大礼',
            name: 'XXX',
            imageUrl: [window.resourceDoMain + "/app/img/xmas_head_normal.png"],
        };


        service.saveInfo = function(data) {
            return activityFormService.saveOldUser(data, true);
        };
        service.isValid = function(name, phone) {
            if (name == "") {
                return 1; //名字不正确
            }
            if (phone) {
                var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                //      console.log(phoneRegexp.test(phone));
                if (!phoneRegexp.test(phone))
                    return 4; //号码不正确
            } else
                return 3; //号码为空
            return 0; //格式正确
        };

        service.getContent = function(nameArr, valueArr) {
            var response = [];
            if (nameArr) {
                for (var i = 0; i < nameArr.length; i++) {
                    response.push({ name: nameArr[i] || "", value: valueArr[i] || "" });
                }
            }
            return response;
        };

        service.getConfigByAspectRatio = function(aspectRatio) {
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
        /*service.grassList = [
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift1_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift1_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift2_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift2_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift3_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift3_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift4_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift4_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift5_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift5_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift6_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift6_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift7_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift7_dance.gif"
            },
            {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift8_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift8_dance.gif"
            }, {
                grassGrowUrl: window.resourceDoMain+"/app/img/xmas_gift9_appear.gif",
                grassDanceUrl: window.resourceDoMain+"/app/img/xmas_gift9_dance.gif"
            }

        ];
        service.getGrassList = function(){
            return service.grassList;
        };*/
        service.getGrassUrl = function(index) {
            switch (index) {
                case 1:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift7_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift7_dance.gif",
                        className: "seven"
                    };
                    break;
                case 2:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift1_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift1_dance.gif",
                        className: "one"
                    };
                    break;
                case 3:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift8_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift8_dance.gif",
                        className: "eight"
                    };
                    break;
                case 4:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift3_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift3_dance.gif",
                        className: "three"
                    };
                    break;
                case 5:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift5_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift5_dance.gif",
                        className: "five"
                    };
                    break;
                case 6:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift6_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift6_dance.gif",
                        className: "six"
                    };
                    break;
                case 7:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift2_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift2_dance.gif",
                        className: "two"
                    };
                    break;
                case 8:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift9_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift9_dance.gif",
                        className: "nine"
                    };
                    break;
                case 9:
                    return {
                        grassGrowUrl: window.resourceDoMain + "/app/img/xmas_gift4_appear.gif",
                        grassDanceUrl: window.resourceDoMain + "/app/img/xmas_gift4_dance.gif",
                        className: "four"
                    };
                    break;
            }

        };

        service.getGrassUrlByGrassCount = function(score) {
            switch (score) {
                case 1:
                    return window.resourceDoMain + "/app/img/xmas_gift1_dance.gif";

                case 2:
                    return window.resourceDoMain + "/app/img/xmas_gift2_dance.gif";

                case 3:
                    return window.resourceDoMain + "/app/img/xmas_gift3_dance.gif";

                case 4:
                    return window.resourceDoMain + "/app/img/xmas_gift4_dance.gif";
                case 5:
                    return window.resourceDoMain + "/app/img/xmas_gift5_dance.gif";
                case 6:
                    return window.resourceDoMain + "/app/img/xmas_gift6_dance.gif";
                case 7:
                    return window.resourceDoMain + "/app/img/xmas_gift7_dance.gif";
                case 8:
                    return window.resourceDoMain + "/app/img/xmas_gift8_dance.gif";
                case 9:
                    return window.resourceDoMain + "/app/img/xmas_gift9_dance.gif";
                    //case 6:
                    //    return "/app/img/fivemoregrass.gif";
                    //default:
                    //    return window.resourceDoMain+"/app/img/fivemore.gif";
            }
        };

        service.getGrassClasByGrassCount = function(score) {
            switch (score) {
                case 1:
                    return "one";
                case 2:
                    return "two";
                case 3:
                    return "three";
                case 4:
                    return "four";
                case 5:
                    return "five";
                case 6:
                    return "six";
                case 7:
                    return "seven";
                case 8:
                    return "eight";
                case 9:
                    return "nine";
                    //default:
                    //    return "flowerpot";
            }
        };


        //种草
        service.updateScore = function(id, userType) {
            var isFirstShare = userType == "old" ? true : false;
            return activityTemplateService.updateScore(id, isFirstShare);
        };

        //更新礼物
        service.updateChristmasScore = function(id, userType) {
            var isFirstShare = userType == "old" ? true : false;
            return activityTemplateService.updateChristmasScore(id, isFirstShare);
        };

        //获取用户信息
        service.getActivityUserInfo = function(userId, userType) {
            var isFirstShare = userType == "old" ? true : false;
            return activityTemplateService.getActivityUserInfo(userId, isFirstShare);
        };
        //获取当前用户的微信信息，微信头像和微信名称
        service.getWeixinUserInfo = function() {
            return activityTemplateService.getWeixinUserInfo();
        };

        var userInfo = {};
        service.setUserInfo = function(info) {
            userInfo = info;
        }




        return service;

    }]);
});