/**
 * Created by dayday on 2015/9/11.
 * 学习日记
 */
define(['ionic'], function () {
    return angular.module('Template12_7.Service', []).
        factory('template12_7Service', ['$http', function ($http) {

            var service = {};
            service.model = {
                title: "您还不知道什么是ELES？",
                description: '“ELES”即北美英文语言测试体系考试English Language Examination System的简称，是由北美高中联盟开设的英文语言测试体系考试，由美国权威高校提供各等级试题，专业认证测评师进行现场测评。取得考试认证的同学，申请去联盟认证体系内的各美国高中留学享有优先受理并最大限度保障录取资格，通过高级别考试者获免除联盟学校入学笔试资格，录取率高达99%。 ' ,
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

                }

            };
            return service

        }]);
});