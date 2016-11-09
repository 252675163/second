

define(['ionic'], function () {
    return angular.module('MicroTemplate2.service', []).
        factory('microTemplate2Service', ['$http', function ($http) {

            var microTemplate2Service = {};
            microTemplate2Service.model = {
                theme: "课程介绍",
                title1:"吉他入门班",
                content1: "课程介绍：全面了解各种吉他风格、构造；掌握吉他基本演奏技法；基本乐理知识；民谣弹唱曲与和弦的学习；流行歌曲与经典老歌的学习。\n开课时间：9月27日\n上课时间：每周日19：00-21：00",
                title2:"乐理知识小班",
                content2: "课程介绍：C调MI型音阶；C调旋律曲；MI型音阶的应用；多声部合奏；六度音练习；简易多声部独奏曲；C调基本和弦；歌曲弹唱；基本和弦与小横按；变调夹与转调；古典名曲与其他调独奏曲；民谣合奏曲；吉他SOLO。"
            }
            return microTemplate2Service
        }]);
})

