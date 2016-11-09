/**
 * Created by xj
 */
define(["ionic"], function() {
    return angular.module("MultiTextInput.service", []).
        factory("multiTextInputService", [
            "$http", "$timeout", "$q",function($http, $timeout,$q) {

                var multiTextInputService = {};
                multiTextInputService.data = {
                    isShow: true,
                    isDiff: false,
                    viewList: {}
                    /*viewList{
                    currentValue,
                    maxLength,
                }
                */
                };

                multiTextInputService.showTextInput = function (viewList, callBack, charType) {
                    multiTextInputService.data.isShow = true;
                    multiTextInputService.data.viewList = viewList;
                    multiTextInputService.data.callBack = callBack;
                    multiTextInputService.data.isDiff = charType.isDiff;

                    multiTextInputService.reRender();
                };

                multiTextInputService.getCurrentValue = function () {
                    return multiTextInputService.data.viewList;
                }

                return multiTextInputService;
            }
        ]);
});