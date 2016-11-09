/**
 * author :小潘
 * time: 2015年11月5日 16:43:29
 * description: 校宝秀首页 数据接口集合
 */
define(["ionic"], function() {
    return angular.module("services.net.index", []).
        factory("indexNetService", [
            "$http", function($http) {

                //获取单个微官网信息
                function getWebSiteModel(webSiteId) {
                    return $http.post("/WebSite/GetWebsite", { id: webSiteId });
                }

                //保存单个官网
                function saveWebSite(obj) {
                    return $http.post("/WebSite/Save", { website: obj });
                }


                //获取单个微活动
                function getActivityModel(activityId) {
                    return $http.post("/Activity/GetDetail", { activityId: activityId });
                }


                //保存微活动
                function saveActivity(obj) {
                    return $http.post("/Activity/Save", { activity: obj });
                }

                //获取列表 （type 0官网 1活动 2全部）
                function getSummaries(pageIndex, pageSize, type) {
                    var data = {

                    };
                    return $http.post("/Home/GetSummaries", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: { Type: type } });
                }

                //获取用户场景列表（type 0 全部 1 微官网 2 微活动 3 微助力 4 微投票 5 微传单）
                function getUserScenes(pageIndex, pageSize, type) {
                    return $http.post("/Home/GetUserScenes", { Page: { PageIndex: pageIndex, PageSize: pageSize }, Filter: { TemplateType: type } });
                }


                //更新分享结构
                function updateShareConfig(id, shareConfig, activityOrWebSite) {
                    //userSign,userId todo 需要废除
                    //更新shareConfig的时候更新Title字段 2016.6.27
                    var title = "";
                    try {
                        var shareConfigObj = angular.fromJson(shareConfig);
                        title = shareConfigObj.title;
                    } catch (err) {
                        title = "";
                    }

                    if (activityOrWebSite == "webSite") {
                        return $http.post("/WebSite/UpdateShareConfig", { id: id, ShareConfig: shareConfig,Title: title });
                    } else {
                        return $http.post("/Activity/UpdateShareConfig", { id: id, shareConfig: shareConfig,Title: title });
                    }
                }


                //获取当前用户信息
                function getUserInfo() {
                    return $http.post("/Home/GetUserInfo", {});
                }

                //删除官网或者活动
                function delModel(id, type) {
                    return $http.post("/Home/Delete", { id: id, type: type });
                }


                
                //前端拿不到完整的UIModel，那么就需要后端的复制接口，前端会传递新的ShareConfigModel还有当前要复制的ID（活动|官网）
                function copy(id, shareConfig, type) {
                    return $http.post("/Home/Copy", { id: id, shareConfig: shareConfig, type: type });
                }

                //新增新种草活动的复制接口 
                function copyNewGrass(id, shareConfig) {
                    return $http.post("/Home/CopyNewGrass", { id: id, shareConfig: shareConfig });
                }

                //更新截止日期，目前仅开放新种草活动 templateId 13  by xp 2015年12月8日 11:50:46
                function updateEndDate(activityId, endDate) {
                    return $http.post("/Activity/UpdateEndDate", { activityId: activityId, endDate: endDate });
                }
                //获取公告栏的配置
                function getNoticeConfig(){
                    return $http.post("/Home/GetNoticeConfig");
                }
                //获取公告栏是否要显示
                function isShowNotice(configKey) {
                    return $http.post("/Home/GetUserConfig", { configKey: configKey });
                }

                //关闭公告栏后更新状态
                function updateUserConfig(configKey, configValue) {
                    return $http.post("/Home/UpdateUserConfig", { configKey: configKey, configValue: configValue });
                }

                return {
                    getWebSiteModel: getWebSiteModel,
                    saveWebSite: saveWebSite,
                    getActivityModel: getActivityModel,
                    saveActivity: saveActivity,
                    updateShareConfig: updateShareConfig,
                    getSummaries: getSummaries,
                    getUserInfo: getUserInfo,
                    delModel: delModel,
                    copy: copy,
                    updateEndDate: updateEndDate,
                    copyNewGrass: copyNewGrass,
                    getNoticeConfig:getNoticeConfig,
                    isShowNotice:isShowNotice,
                    updateUserConfig: updateUserConfig,
                    getUserScenes: getUserScenes
                };
            }
        ]);
})