/**
 * author :
 * time: 
 * description: 新报名本
 */
define(['ionic'], function () {
    return angular.module('services.net.registrationBook', []).
        factory('registrationBookNetService', ['$http', '$q', function ($http, $q) {
            function getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy) {
                var filter = {
                    RegBookUserListType: regBookUserListType, FollowUpStatusList: followUpStatusList, RegBookTemplateTypeList: regBookTemplateTypeList, SceneIdList: sceneIdList, Interests: interests, SalesMan: salesMan, SearchTags: searchTags, SearchCollect: searchCollect, OrderBy: orderBy, OrderByField: orderByField
                }
                return $http.post("/RegistrationBook/GetRegBookUserList", { page: { pageIndex: pageIndex, pageSize: pageSize }, Filter: filter }, { timeout: 10000 });
            }

            //获取某日的日程列表
            function getScheduleList(pageIndex, pageSize, dTime) {
                var filter = {
                    dt:dTime
                }
                return $http.post("/RegistrationBook/GetScheduleList", { Page: { PageIndex: pageIndex, PageSize: pageSize }, Filter: filter }, { timeout: 5000 });
            }

            //获取某段时间未处理沟通记录数量
            function getCommuRemindCount(startTime, endTime) {
               var filter = {
                    StartTime: startTime,
                    EndTime : endTime
                } 
               return $http.post("/RegistrationBook/GetCommuRemindCount", { Filter: filter }, { timeout: 5000 });
            }

            function markTop(regUserId, isTop) {
                return $http.post("/RegistrationBook/UpdateRegBookUserTopStatus", { Id: regUserId, IsTop: isTop });
            }

            function setContent(regUserId, content) {
                return $http.post("/RegistrationBook/UpdateRegBookUserContent", { Id: regUserId, Content: content });
            }

            function markAsRead(regUserId) {
                return $http.post("/RegistrationBook/UpdateRegBookUserActiveStatus", { Id: regUserId});
            }

            // function getNewUserNum() {
            //     return $http.post("/RegistrationBook/GetRegBookUserActiveCount");
            // }

            function getRegBookUserById(userId) {
                return $http.post("/RegistrationBook/GetRegBookUserById", { id: userId });
            }

            function updateRegBookUser(data) {
                return $http.post("/RegistrationBook/UpdateRegBookUser", { rawRegBookUserModel: data });
            }

            function GetRegistrationBookSceneList(pageIndex, pageSize) {
                return $http.post("/RegistrationBook/GetRegistrationBookSceneList", { page: { pageIndex: pageIndex, pageSize: pageSize } });
            }

            function getRegbookUserRecordByRegBookUserId(userId, pageIndex, pageSize) {
                var data = {
                    Filter: { Id: userId },
                    Page: { pageIndex: pageIndex, pageSize: pageSize }
                }
                return $http.post("/RegistrationBook/GetRegbookUserRecordByRegBookUserId", data);
            }

            function isShowNotice(configKey) {
                return $http.post("/Home/GetUserConfig", { configKey: configKey });
            }

            function updateUserConfig(configKey, configValue) {
                return $http.post("/Home/UpdateUserConfig", { configKey: configKey, configValue: configValue });
            }

            // function setVisitTime(regUserId, RecentVisitAt, type) {

            //     return $http.post("/RegistrationBook/UpdateRegBookUserRecentVisitAt", { id: regUserId, RecentVisitAt: RecentVisitAt, type: type });
            // }

            //搜索
            function getSearchResult(search, pageSize) {
                var data = {
                    Filter: { Type:0, ExistsCount:3,Value:search },
                    Page: { PageIndex: 1, PageSize: pageSize }
                }
                return $http.post("/RegistrationBook/GetRegBookUserListByFirstLoaded", data, { timeout: 5000 });
            }

            //搜索加载更多
            function getMoreSearchResult(type, search, pageIndex, pageSize) {
                var data = {
                    Filter: { Type: type, ExistsCount: 3, Value: search },
                    Page: { PageIndex: pageIndex, PageSize: pageSize }
                }
                return $http.post("/RegistrationBook/GetRegBookUserListByModuleLoaded", data);
            }

            // function getCurrentUserInfo() {
            //     return $http.post("/Home/GetUserInfo");
            // }

            function createCommu(regUserId, content, remindDate, isRemind) {
                return $http.post("/RegistrationBook/CreateCommu", { StuInfoId: regUserId, CommuContent: content, RemindDate: remindDate, IsRemind: isRemind });
            }
            
            // function getCommuList(regUserId,pageIndex,pageSize) {
            //     return $http.post("/RegistrationBook/GetCommuList", { filter: { id: regUserId }, page: { pageIndex: pageIndex, pageSize: pageSize } });
            // }
            function getSaleManList() {
            return $http.post("/RegistrationBook/GetSaleManList", {});
            }
            function scheduleDone(commuId,isDone) {
            return $http.post("/RegistrationBook/ScheduleDone", {"commuId":commuId,"isDone":isDone});
            }
            function getConsultFollowingUp(pageIndex,pageSize,id){
                return $http.post("/RegistrationBook/GetConsultFollowingUp", {"Page":{"PageIndex":pageIndex,"PageSize":pageSize},"Filter":{"Id":id}});
            }

            //快速新增咨询
            function fastCreateConsult(res) {
                return $http.post("/RegistrationBook/FastCreateConsult", { StuName: res.name, MotherTel: res.phone, WeChatId: res.wechat, });
            }

            //分配销售
            function allotSalesMan(saleManName,regUesrs) {
                return $http.post("/RegistrationBook/AllotSalesMan", {saleManName:saleManName,stuIds:regUesrs});
            }

            function getLesson(){
                return $http.post("/RegistrationBook/GetLesson");
            }
            //获取用户权限等信息
            function getErpUserInfo(){
                return $http.post("/User/GetErpUserInfo");
            }
            return {
                getRegBookUserList: getRegBookUserList,
                // getNewUserNum: getNewUserNum,
                getRegBookUserById: getRegBookUserById,
                updateRegBookUser: updateRegBookUser,
                markTop: markTop,
                setContent: setContent,
                markAsRead: markAsRead,
                GetRegistrationBookSceneList: GetRegistrationBookSceneList,
                getRegbookUserRecordByRegBookUserId: getRegbookUserRecordByRegBookUserId,
                isShowNotice: isShowNotice,
                updateUserConfig: updateUserConfig,
                // setVisitTime: setVisitTime,
                getSearchResult: getSearchResult,
                getMoreSearchResult: getMoreSearchResult,
                // getCurrentUserInfo: getCurrentUserInfo,
                createCommu: createCommu,
                // getCommuList: getCommuList,
                getScheduleList: getScheduleList,
                getCommuRemindCount: getCommuRemindCount,
                getSaleManList:getSaleManList,
                scheduleDone:scheduleDone,
                getConsultFollowingUp:getConsultFollowingUp,

                fastCreateConsult: fastCreateConsult,
                allotSalesMan: allotSalesMan,
                getLesson:getLesson,
                getErpUserInfo:getErpUserInfo

            }

        }]);
})