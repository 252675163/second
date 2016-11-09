"use strict"
/**
 * author :xu jie 
 * time: 
 * description:咨询本详情页
 */
define(['ionic'], function() {
    return angular.module('MicroRegistrationbookDetailFilter', [])

    .filter('Maxlength', [function(input, max) {

            return function(input, max) {
                if (!input) {
                    return;
                }
                if (input.length <= max) {
                    return input;
                } else {
                    return input.slice(0, max) + "...";
                }

            };
        }])
        //客户状态
        .filter('stateType', [function() {

            return function(code) {
                switch (code) {
                    case 1:
                        return "待跟进";
                    case 2:
                        return "跟进中";
                    case 3:
                        return "已成交";
                    case 4:
                        return "已失效";
                    case 5:
                        return "已到访";
                }

            };
        }])
        //性别
        .filter('sexType', [function() {

            return function(code) {
                switch (parseInt(code)) {
                    case 1:
                        return "男";
                    case 2:
                        return "女";
                }

            };
        }])
        //意向度
        .filter('intentionLevelType', [function() {

            return function(code) {
                switch (parseInt(code)) {
                    case 1:
                        return "低";
                    case 2:
                        return "中";
                    case 3:
                        return "高";
                    case 4:
                        return "高";
                }

            };
        }])
        //电话号码分隔
        .filter('phoneNumPart', [function() {
            return function(num) {
                if (num && num.length == 11) {
                    return (num.substring(0, 3) + "-" + num.substring(3, 7) + "-" + num.substring(7, 11))
                } else {
                    return num
                }
            };
        }])
})