/**
 * Created by dayday on 2015/11/24.
 */
define(["ionic"], function () {
    return angular.module("services.net.activityTemplate", []).
        factory("activityTemplateService", [
            "$http", "$q", function ($http, $q) {

                //带有推荐人用户信息
                function saveNewUser(date) {
                    return $http.post("/Activity/AddIntroduceUser", date);
                }

                //没有推荐人的用户信息saveOldUser
                function saveOldUser(user, isIntroduced) {
                    //isIntroduced 是否成为咨询记录
                    var data = {
                        user: user,
                        isIntroduced: isIntroduced || false
                    };
                    return $http.post("/Activity/AddUser", data);
                }
                //带推荐人的用户信息 
                function addAssistUser(user, isIntroduced) {
                    //isIntroduced 是否成为咨询记录
                    var data = {
                        user: user,
                        isIntroduced: isIntroduced || false
                    };
                    return $http.post("/Activity/AddAssistUser", data);
                }
                //添加活动用户 微拼团模板
                function addActivityUserByActivityId(data) {
                    return $http.post("/Activity/addActivityUserByActivityId", data);
                }
                //助力并添加活动记录 微拼团模板
                function helpAndAddConsult(data) {
                    return $http.post("/Activity/HelpAndAddConsult", data);
                }
                //获取活动助力详情列表 微拼团模板
                function getHelperList(activityUserId) {
                    return $http.post("/Activity/GetHelperList", { id: activityUserId });

                }
                //获取当前用户是否已经参加团 微拼团模板
                function getHelpUserInfo(activityUserId) {
                    return $http.post("/Activity/GetHelpUserInfo", { id: activityUserId });
                }
                //获取场景下的活动 微拼团模板 成团列表与未成团列表
                function getHelpersByActivityId(id, State, pageIndex, pageSize) {
                    var data = {
                        Filter: {
                            OriginId: id,
                            State: State
                        },
                       
                        Page: {
                            PageIndex: pageIndex,
                            PageSize: pageSize
                        }
                    };
                    return $http.post("/Activity/GetHelpersByActivityId", data);
                }
                //种草
                function updateScore(id, isFirstShare) {
                    return $http.post("/Activity/UpdateScore", { activityUserId: id, isTest: isFirstShare });
                }

                //投票
                function updateVoteScore(id, isFirstShare) {
                    return $http.post("/Activity/UpdateVoteScore", { activityUserId: id, isTest: isFirstShare, activityType: 4 });
                }

                //谁帮我中了草的用户信息列表
                function getGrassUserInfos(id, isFirstShare) {
                    return $http.post("/Activity/GetGrassUserInfos", { activityUserId: id, isTest: isFirstShare });
                }

                //新增分页形式 by xp 2015年12月9日 19:42:20
                function getGrassUserInfosByPage(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetGrassUserInfos", {
                        Page: { pageIndex: pageIndex, pageSize: 10 },
                        Filter: { activityUserId: id, isTest: isFirstShare }
                    });
                }

                //新种草排行榜  by xp 2015年12月5日 16:39:38
                function getGrassRanks(id, isFirstShare) {
                    return $http.post("/Activity/GetGrassRanks", { activityUserId: id, isTest: isFirstShare });
                }

                //获得用户昵称和用户头像相关信息,分数
                function getActivityUserInfo(userId, isFirstShare, activityType) {
                    //isFirstShare=true:userId为activityId;false,userId为activityUserId
                    activityType = activityType ? activityType : 0;
                    return $http.post("/Activity/GetActivityUserInfo", { activityUserId: userId, isTest: isFirstShare, activityType: activityType });

                    //var d = $q.defer();
                    ////发起者未激活
                    //a={
                    //    "status": 1,
                    //    "error": 0,
                    //    "message": "操作成功！",
                    //    "data": {
                    //        "Content": "{\"IsHelper\":true,\"HelperNum\":9,\"HelperAmount\":5.06}",
                    //        "Rank": 1,
                    //        "IsHaveGrow": false,
                    //        "Id": 652,
                    //        "ActivityId": 908,
                    //        "Name": "",
                    //        "Phone": "",
                    //        "Config": "",
                    //        "Score": 1,
                    //        "CreatedAt": "/Date(1458300184000)/",
                    //        "IsTest": true
                    //    }
                    //}
                    //d.resolve(a);
                    //return d.promise;
                }


                //获得当前用户的昵称和微信头像activity/GetWeixinUserInfo(头像使用oss上的地址，微信头像先上传到oss拿到url)
                function getWeixinUserInfo() {
                    return $http.post("/Activity/GetWeixinUserInfo");
                }
                //2016.4.29 获得当前用户的昵称和微信头像(微信头像使用微信的url)
                function getWeixinUserInfoByHeadImgUseWeixinUrl() {
                    return $http.post("/Activity/GetWeixinUserInfoByHeadImgUseWeixinUrl");
                }

                //圣诞活动 更新礼物数
                function updateChristmasScore(id, isFirstShare) {
                    return $http.post("/Activity/UpdateChristmasScore", { activityUserId: id, isTest: isFirstShare });
                }

                //谁帮挂了礼物的用户信息列表
                function getChristmasUserInfos(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetChristmasUserInfos", {
                        Page: { pageIndex: pageIndex, pageSize: 10 },
                        Filter: { activityUserId: id, isTest: isFirstShare }
                    });
                }

                //种菜游戏--种菜 
                //修改by yinglechao 2016.10.16 增加验证码参数

                function updateGrowVegetablesScore(id, isFirstShare, captchastr) {
                    return $http.post("/Activity/UpdateGrowVegetablesScore", { activityUserId: id, isTest: isFirstShare, captcha: captchastr });
                }

                //种菜游戏---谁帮我种菜了的用户列表 todo
                function getGrowVegetablesUserInfos(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetGrowVegetablesUserInfos  ", {
                        Page: { pageIndex: pageIndex, pageSize: 10 },
                        Filter: { activityUserId: id, isTest: isFirstShare }
                    });
                }
                //代金券 谁帮我助力了排行榜
                // /Activity/GetVoucherRank
                function getVoucherRankUserInfos(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetVoucherRank", {
                        Page: { pageIndex: pageIndex, pageSize: 10 },
                        Filter: { activityUserId: id, isTest: isFirstShare }
                    });
                }

                //代金券--获得刮奖金额 助力
                function voucherScratch(userId, isFirstShare) {
                    return $http.post("/Activity/VoucherScratch", { activityUserId: userId, isTest: isFirstShare });
                }

                //投票模板 获取票选列表 活动ID 分页信息
                function getVoteList(originid, page) {
                    return $http.post("/Activity/GetVoteList", { Filter: originid, Page: page })
                }

                //投票模板 带有验证码 
                function updateScorewithCaptcha(id, captchastr, isFirstShare) {
                    return $http.post("/Activity/UpdateVoteScore", { activityUserId: id, captcha: captchastr, isTest: isFirstShare, activityType: 4 });
                }

                //通用助力型---谁帮我助力了的用户列表 todo
                function getActivityInteractiveRecords(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetActivityInteractiveRecords  ", {
                        Page: { pageIndex: pageIndex, pageSize: 10 },
                        Filter: { activityUserId: id, isTest: isFirstShare, isCreatedAtOrder: true, OrderBy: "Desc" }
                    });
                }
                //通用助力型--助力 
                //修改by yinglechao 2016.10.16 增加验证码参数
                function updateActivityInteractiveRecords(id, isFirstShare, captchastr) {
                    var data = {
                        activityUserId: id,
                        isTest: isFirstShare,
                        captcha: captchastr
                    }
                    return $http.post("/Activity/UpdateActivityInteractiveRecords",data);
                }

                //微砍价---帮我砍价的用户列表 todo
                function getBargainHelperInfo(id, isFirstShare, pageIndex) {
                    return $http.post("/Activity/GetActivityInteractiveRecords", {
                        Page: { pageIndex: pageIndex, pageSize: 5 },
                        Filter: { activityUserId: id, isTest: isFirstShare, isCreatedAtOrder: true, OrderBy: "Desc" }
                    });
                }

                //微砍价---帮他砍价
                function microBargainPower(userId, isFirstShare) {
                    return $http.post("/Activity/MicroBargainPower", { activityUserId: userId, isTest: isFirstShare });
                }

                //微砍价--领取优惠
                function microBargainPreferential(userId, type, isFirstShare) {
                    return $http.post("/Activity/MicroBargainPreferential", { activityUserId: userId, stockType: type, isTest: isFirstShare });
                }

                return {
                    saveOldUser: saveOldUser,
                    saveNewUser: saveNewUser,
                    updateScore: updateScore,
                    updateVoteScore: updateVoteScore,
                    getGrassUserInfos: getGrassUserInfos,
                    getActivityUserInfo: getActivityUserInfo,
                    getWeixinUserInfo: getWeixinUserInfo,
                    getWeixinUserInfoByHeadImgUseWeixinUrl: getWeixinUserInfoByHeadImgUseWeixinUrl,
                    getGrassRanks: getGrassRanks,
                    getGrassUserInfosByPage: getGrassUserInfosByPage,
                    getChristmasUserInfos: getChristmasUserInfos,
                    updateChristmasScore: updateChristmasScore,
                    updateGrowVegetablesScore: updateGrowVegetablesScore,
                    getGrowVegetablesUserInfos: getGrowVegetablesUserInfos,
                    voucherScratch: voucherScratch,
                    addAssistUser: addAssistUser,
                    getVoucherRankUserInfos: getVoucherRankUserInfos,
                    getVoteList: getVoteList,
                    updateScorewithCaptcha: updateScorewithCaptcha,
                    getActivityInteractiveRecords: getActivityInteractiveRecords,
                    updateActivityInteractiveRecords: updateActivityInteractiveRecords,
                    getBargainHelperInfo: getBargainHelperInfo,
                    microBargainPower: microBargainPower,
                    microBargainPreferential: microBargainPreferential,
                    addActivityUserByActivityId: addActivityUserByActivityId,
                    helpAndAddConsult: helpAndAddConsult,
                    getHelperList: getHelperList,
                    getHelpUserInfo: getHelpUserInfo,
                    getHelpersByActivityId: getHelpersByActivityId
                };
            }
        ]
    );
})
