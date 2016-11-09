/**
 * 
 */
define(["ionic"], function () {
    return angular.module("Template24_3.Service", []).
        factory("template24_3Service", [
            "$http",  function ($http) {

                var service = {};
                service.model =
                {
                    title: "游戏规则",
                    description: "1、如何邀请朋友帮你捕鱼？",
                    bgColor: "#fff",                              //背景色值
                    radius: "5",                                  //圆角值
                    titleColor: "red",                            //标题色值
                    descriptionColor: "#333"                      //提示文案色值
                };
         
                return service;
            }
        ]);
});