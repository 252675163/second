/**
 * author :小潘
 * time: 2015年9月9日 17:35:08
 * description: 网络服务基础模块
 */
define(["ionic"], function() {
    return angular.module("services.net.grass", []).
        factory("grassNetService", [
            "$http", function($http) {


                function getActivityMockInfo(userId, tid) {
                    //模拟数据
                    var data = {};
                    var Config = {};
                    Config.musicId ="http://cdn.schoolpal.cn/shiningstar/Activity/20151022174013-e09af.mp3";
                    Config.title = "满天星教育\n一棵草=1张学费抵扣券\n种草享优惠，还不赶紧试试";
                    data.Config = JSON.stringify(Config);
                    data.TemplateId = tid;
                    data.UserId = userId;
                    return data;
                }

                function getActivityInfoByStuId(stuid) {
                    //模拟数据
                    //向后端取数据
                    //return $http.post("/LabelService/SaveLabelRelation", { targetId: targetIds, targetType: 4, labelIds: labelIds })
                    return $http.post("/Activity/GetUserAndActivityInfo", { activityUserId: stuid });
                }

                function getDetail(activityId) {
                    return $http.post("/Activity/GetDetail", { activityId: activityId });
                }

                function save(obj) {
                    return $http.post("/Activity/Save", { activity: obj });
                }

                //修改需求 不再有新老用户区分 2015年10月20日 15:18:14 by xp
                function addUser(obj, flg) {
                    return $http.post("/Activity/AddUser", { user: obj, isIntroduced: true });
                }

                function updateScore(id) {
                    return $http.post("/Activity/UpdateScore", { activityUserId: id });
                }

                function getActivityById(tid) {
                    if (tid == null) {
                        window.location.href = "/Common/error?mark=grassNetService_tid_IsNull";
                    } else {
                        return $http.post("/Activity/GetActivity", { id: tid });
                    }
                }

                //获取音频
                function getMusic(templateId,pageIndex,pageSize,audioTag) {
                    var request = {
                        page:{
                            PageSize:pageSize,
                            PageIndex:pageIndex
                        },
                        filter:{
                            TemplateId:templateId,
                            AudioTag:audioTag
                        }
                    };
                    return $http.post("/Activity/GetAudioMaterials", request);
                }

                function updateShareConfig(id,shareConfig){
                    //更新shareConfig的时候更新Title字段 2016.6.27
                    var title = "";
                    try {
                        var shareConfigObj = angular.fromJson(shareConfig);
                        title = shareConfigObj.title;
                    } catch (err) {
                        title = "";
                    }
                    return $http.post("/Activity/UpdateShareConfig", { id: id, shareConfig: shareConfig, Title: title });
                }

                return {
                    getActivityMockInfo: getActivityMockInfo,
                    getActivityInfoByStuId: getActivityInfoByStuId,
                    getDetail: getDetail,
                    save: save,
                    addUser: addUser,
                    updateScore: updateScore,
                    getActivityById: getActivityById,
                    getMusic: getMusic,
                    updateShareConfig:updateShareConfig
                };
            }
        ]);
})