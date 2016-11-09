"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/registration-book"], function () {
    return angular.module("MicroRegistrationbookSearchApp.services", ["services.net.registrationBook"])
        .service("microRegistrationbookSearchAppService", [
            "$rootScope", "registrationBookNetService", "promptBarService",
            function ($rootScope, registrationBookNetService) {
                var service = {};

                service.getSearchResult = function (search, pageSize) {
                    return registrationBookNetService.getSearchResult(search, pageSize);
                }

                service.getMoreSearchResult = function (type, search, pageIndex, pageSize) {
                    return registrationBookNetService.getMoreSearchResult(type, search, pageIndex, pageSize);
                }
                //uiModel转化
                service.parseBizModelToUiModel = function (bizModel) {
                    var searchModel = {
                        Id:0,
                        Name:"",
                        DistrictId: "",
                        FollowUpStatus: 1,
                        Interest: 0,
                        RecentModifiedAt: "",
                        EditDate: "",
                        Phone: "",
                        Content: "",
                        Enrolled: "",
                        EnrolledModel:"未报名",
                        FollowStatusModel: {
                            className: "",
                            content:"",
                        },
                        InterestClass: "consult_user_head1_icon4"
                    }
                    searchModel.Id = bizModel.Id;
                    searchModel.Name = bizModel.Name;
                    searchModel.DistrictId = bizModel.DistrictId;
                    searchModel.FollowUpStatus = bizModel.FollowUpStatus;
                    searchModel.Interest = bizModel.Interest;
                    searchModel.RecentModifiedAt = bizModel.RecentModifiedAt;
                    searchModel.EditDate = bizModel.EditDate;
                    searchModel.Phone = bizModel.Phone;
                    searchModel.Content = bizModel.CommuContent;
                    if (!angular.equals(searchModel.Content, null)) {
                        searchModel.Content = searchModel.Content.replace("<br />", " ");
                    }
                        
                    searchModel.Enrolled = bizModel.Enrolled;
                    if (bizModel.Enrolled) {
                        searchModel.EnrolledModel="已报名"
                    }
                    if (bizModel.FollowUpStatus == 1) {
                        searchModel.FollowStatusModel = {
                            className: "btn-yellow",
                            content: "待跟进"
                        }
                    }
                    else if (bizModel.FollowUpStatus == 2) {
                        searchModel.FollowStatusModel = {
                            className: "btn-blue",
                            content: "跟进中"
                        }
                    }
                    else if (bizModel.FollowUpStatus == 3) {
                        searchModel.FollowStatusModel = {
                            className: "btn-green",
                            content: "已成交"
                        }
                    }
                    else if (bizModel.FollowUpStatus == 4) {
                        searchModel.FollowStatusModel = {
                            className: "btn-darkgray",
                            content: "已失效"
                        }
                    }
                    else if (bizModel.FollowUpStatus == 5) {
                        searchModel.FollowStatusModel = {
                            className: "btn-red",
                            content: "已到访"
                        }
                    }
                    if (bizModel.Interest == 1) {
                        searchModel.InterestClass = "consult_user_head1_icon1";
                    }
                    else if (bizModel.Interest == 2) {
                        searchModel.InterestClass = "consult_user_head1_icon2";
                    }
                    else if (bizModel.Interest == 3) {
                        searchModel.InterestClass = "consult_user_head1_icon3";
                    }
                    else if (bizModel.Interest == 4) {
                        searchModel.InterestClass = "consult_user_head1_icon4";
                    }
                    return searchModel;

                }

                return service;
            }
        ]);
});


