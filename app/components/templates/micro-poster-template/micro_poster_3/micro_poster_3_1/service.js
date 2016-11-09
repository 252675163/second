/**
 * 
 */
define(['ionic', 'services/net/activity-template'], function () {
    return angular.module('MicroPoster3_1.Service', ['services.net.activityTemplate']).
        factory('microPoster3_1Service', ['$http', 'activityFormService', 'activityTemplateService', 'activityViewNetService',"$location",
            function ($http, activityFormService, activityTemplateService, activityViewNetService,$location) {
                var service = {};
                service.model =
                    {
                        name: "校宝秀"
                    };

                var indexTag = {};
                service.setIndexTag = function (tag) {
                    indexTag.tag = tag;
                }
                service.getIndexTag = function () {
                    return indexTag;
                }

                var userinfo = {};
                service.setUserInfo = function (info) {
                    userinfo = info;
                }
                service.getUserInfo = function () {
                    return userinfo;
                }

                var content = {};
                service.setlocContent = function (info) {
                    content.info = info;
                }
                service.getlocContent = function () {
                    return content;
                }

                service.isValid = function (name, phone, content) {
                    if (!name) {
                        return "请输入姓名！";            //名字不正确
                    }
                    if (phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                        //      console.log(phoneRegexp.test(phone));
                        if (!phoneRegexp.test(phone))
                            return "请输入真实的手机号码！";           //号码不正确
                    }
                    else
                        return "请输入手机号！";               //号码为空
                    if (!content) {
                        return "请输入祝福语！";            //名字不正确
                    }
                    return 0;                  //格式正确
                };

                service.saveInfo = function (data) {
                    //不添加介绍人信息
                    return activityFormService.saveOldUser(data, true);
                };

                service.GetActivityUserInfo = function (userId) {
                    return activityViewNetService.GetActivityUserInfo(userId);
                };

                service.getContent = function(){
                    if($location.$$search.content){
                        return this.indeeddecodeURIComponent($location.$$search.content).replace(/%0A/g,'<br/>').replace(/ /g, "&nbsp;");
                    }else{
                        return 0;
                    }
                }
                //修复多次刷新造成URL多次编码的BUG
                service.indeeddecodeURIComponent = function(content){
                    var count = 10;
                    while(content.match(/%[0-9a-zA-Z]{2}%/)==null&&count){
                        content = decodeURIComponent(content);
                        count--;
                    }
                    if(content.match(/%0A/)){
                        content = decodeURIComponent(content);
                    }
                    return decodeURIComponent(content);
                }


                return service;

            }]);
});



