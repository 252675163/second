/**
 * Created by dayday on 2015/9/11.
 */
define(["ionic"], function() {
    return angular.module("Combobox.Service", []).
        factory("comboboxService", [
            "$http", "$timeout", "$q",function($http, $timeout,$q) {

               var comboboxService = {};
               comboboxService.comboboxData = {
                    isShow: false,
                    currentValue:{},
                    viewList: {},
                    info:{}
               };
                //���飬��ʼֵ��������ʾ��Ϣ
               comboboxService.showCombobox = function (dataList, currentValue, info,callBack) {
                   comboboxService.comboboxData.isShow=true;     
                   comboboxService.comboboxData.currentValue= currentValue;
                   comboboxService.comboboxData.viewList= dataList;
                   comboboxService.comboboxData.info= info;
                   comboboxService.comboboxData.callBack= callBack;
               };
                //�ر�����
               comboboxService.hideCombobox = function () {
                   $timeout(function () {
                       comboboxService.comboboxData.isShow = false;
                   }, 0)
               };
                return comboboxService;
            }
        ]);
});