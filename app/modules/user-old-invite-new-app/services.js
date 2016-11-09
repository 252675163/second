"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic", "services/net/user-center"], function () {
    return angular.module("UserOldInviteNewApp.services", ["Services.net.userCenter"])
        .service("OldInviteNewAppService", [
            "$rootScope", "userCenterNetService",
            function ($rootScope, uerCenterNetService) {
                var service = {};
                service.DefaultShareModel = {
                    shareTitle: "送您30天校宝秀VIP会员兑换资格，赶紧领走！",
                    desc: "我用校宝秀招生，效果很棒！推荐你也来用哦！",
                    imageUrl:""
                }

                service.getInviteQRcode = function (id,isshare) {
                    if (id && isshare == undefined) {
                        return uerCenterNetService.InvitationUser(id);
                    } else {
                        return uerCenterNetService.GetInvitationInfo();
                    }
                }

                service.shareConfigModel = function (title, desc, link, imgUrl, type, dataUrl) {
                    return {
                        title: title ? title : "",
                        desc: desc ? desc : "",
                        link: link ? link : "",
                        imgUrl: imgUrl ? imgUrl : "",
                        type: type ? type : "",
                        dataUrl: dataUrl ? dataUrl : ""
                    };
                };
                //service.getUserInfoByUserId = function () {
                //    return userCenterNetService.getUserInfoByUserId();
                //};
                //service.removeSchoolPalLink = function(){
                //    return userCenterNetService.removeSchoolPalLink();
                //};

                return service;
            }
        ]);
});


