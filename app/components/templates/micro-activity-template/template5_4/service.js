/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template5_4.Service', []).
        factory('template5_4Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {
                title:"校宝秀国际教育",
                description:"上课时，老师经常带动我们在愉快的气氛中进行英文对话的学习。在这里，我不仅收获了知识，还拥有了幸福快乐的时光。",
                imageUrl: [window.resourceDoMain+'/app/img/acty7_pic4.jpg']
            }
            return service

        }]);
})