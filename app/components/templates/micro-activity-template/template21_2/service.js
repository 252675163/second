/**
 * author :chenxuedong
 * time: 2016-05-17 23:25:43
 * description: templateModel就是该模板创建的结构，自定义
 */
define(['ionic'], function () {
    return angular.module('Template21_2.Service', []).
        factory('template21_2Service', ['$http',function ($http) {


            var service = {};
            var d = new Date();
            var defaultdate = new Date(d.getFullYear(),d.getMonth(),d.getDate()+7,0,0,0);
            service.model =
                {
                    title:["活动规则","活动奖励","截止时间"],
                    description: ["1.如何参加投票活动？点击「我也要参加」，填写信息后再点击「发布」，分享给好友，让Ta来给你投票吧！\n2.活动期间，每个微信账号只能给同一个参赛者投一票，可以投多个参赛者。\n3.如一经发现有恶意刷票者，将取消其参赛资格。\n",
                                  "第一名： \n第二名： \n第三名： \n",
                                  defaultdate]
                };

                //用于预览时数据显示
                var activeInfo = {};
                
                //外部获得活动信息
                service.getActiveInfo = function () {
                    return activeInfo;
                };
                //保存当前的活动信息
                service.setActiveName = function (info) {
                    activeInfo = info;
                }
                
                
                var data = {};
                service.getTemplateModel = function(){
                    return data;
                };
                service.setDataOfTempaletModel = function(templateModel){
                    data.templateModel = templateModel;
                };

                

            
            return service

        }]);
});



