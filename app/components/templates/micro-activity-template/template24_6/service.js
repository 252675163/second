/**
 * 
 */
define(['ionic'], function () {
    return angular.module('Template24_6.Service', []).
        factory('template24_6Service', ['$http',   function ($http) {


            var service = {};
            service.model =
            {
                phone: "010-66666666",
                address:"北京市海淀区颐和园路5号",
                bgColor: "#fff",                              //背景色值
                radius: "5",                                  //圆角值
                titleColor: "red",                            //标题色值
                descriptionColor: "#333"                      //提示文案色值
            };

            return service;
        }
        ]);
});



