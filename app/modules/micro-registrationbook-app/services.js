"use strict";
/**
 * author :
 * time: 
 * description:
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function() {
    return angular.module("MicroRegistrationBookApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
            function($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                var service = {};

                //全部列表筛选页选中的场景进度类型，场景类型和场景id
                //由于跳出咨询本路由后，筛选条件需要置空，因此放在$scope里
                /*service.filterCondition = {
                    statusList: [],
                    typeList: [],
                    sceneIdList: [],
                    interests: [],
                    salesMan: [],
                    searchTags: [],
                    searchCollect: '',
                    orderBy: 'Desc',
                    orderByField: 'EditDate'
                }*/
                service.searchCondition = "";
                service.ScheduleDate = "";

                service.isShowNotice = function(configKey) {
                    return registrationBookNetService.isShowNotice(configKey);
                }
                //筛选条件
                /*
                service.getFilterCondition = function() {
                    return service.filterCondition;
                }  
                service.setFilterCondition = function(filterCondition) {
                        service.filterCondition = angular.copy(filterCondition);
                }*/
                //保存搜索条件
                service.getSearchCondition = function() {
                    return service.searchCondition;
                }

                service.setSearchCondition = function(searchCondition) {
                    service.searchCondition = angular.copy(searchCondition);
                }

                //保存日程日期信息
                service.getScheduleDate = function() {
                    return service.ScheduleDate;
                }
                //更新是否第一次进入咨询本
                service.updateUserConfig = function(configKey, configValue) {
                    return registrationBookNetService.updateUserConfig(configKey, configValue);
                }
                service.setScheduleDate = function(ScheduleDate) {
                        service.ScheduleDate = angular.copy(ScheduleDate);
                    }
                    //     //用户权限信息
                    // service.getErpUserInfo = function() {
                    //     return registrationBookNetService.getErpUserInfo();
                    // }
                return service;
            }
        ]);
});