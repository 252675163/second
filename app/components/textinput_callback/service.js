/**
 * Created by xj
 */
define(["ionic"], function() {
    return angular.module("TextInputCallback.service", []).
        factory("textInputCallbackService", [
            "$http", "$timeout", "$q",function($http, $timeout,$q) {

                var textInputCallbackService = {};
                textInputCallbackService.data = {
                    isShow: false,
                    currentValue: "",
                    isDiff: false,
                    maxLength: 30,
                    type:"other",
                };

                textInputCallbackService.showTextInput = function (currentValue, callBack, charType) {
                    textInputCallbackService.data.isShow = true;
                    textInputCallbackService.data.currentValue = currentValue;
                    textInputCallbackService.data.callBack = callBack;
                    textInputCallbackService.data.isDiff = charType.isDiff;
                    textInputCallbackService.data.maxLength = charType.maxLength;
                    textInputCallbackService.data.type = charType.type;
                    textInputCallbackService.data.placeholder = charType.placeholder;

                    textInputCallbackService.reRender();
                };

                textInputCallbackService.getCurrentValue = function () {
                    return textInputCallbackService.data.currentValue;
                }


                return textInputCallbackService;
            }
        ]);
});