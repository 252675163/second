/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template5_2.Service', []).
        factory('template5_2Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"校宝秀国际教育",
                description:['嗨！小伙伴们。\n我是Kevin邹凯乐，是一名小学三年级学生，在“校宝秀国际教育”学习快1年了。',"在这里，我已经取得了小小的“成就”，我的英语很棒哦！"],
                imageUrl: [window.resourceDoMain+'/app/img/acty7_pic1.jpg']
            }
            return service

        }]);
})