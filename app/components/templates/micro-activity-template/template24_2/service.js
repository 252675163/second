/**
 * 
 */
define(['ionic'], function () {
    return angular.module('Template24_2.Service', []).
        factory('template24_2Service', ['$http', function ($http) {


            var service = {};
            service.model =
           {
               "title": "活动详情",
               "description": "1、满天星教育夏招活动开始啦！",
               "bgColor": "#fff",
               "radius": "5",//以640的设计稿为准
               "titleColor": "red",
               "descriptionColor": "#333"
           };







            return service

        }]);
});



