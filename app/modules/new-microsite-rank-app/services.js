"use strict";
/**
 * author :
 * time:
 * description:
 */


define(["ionic","services/net/new-site-rank"], function () {
    return angular.module("MicroSiteRankApp.services", ["services.net.newSiteRank"])
        .service("microSiteRankAppService", [
            "$rootScope","$filter","newSiteRankNetService",
            function ($rootScope,$filter, newSiteRankNetService) {
                var service = {};
                //$filter('date')(date, format, timezone)
                var today = $filter("date")(new Date(),"M月d日");
                service.defaultLogo = window.resourceDoMain+"/app/img/user_center_default_photo.png";
                service.GetPraise = function (pageIndex, pageSize,isShareView,websiteId) {
                    return newSiteRankNetService.getRankList(pageIndex,pageSize,isShareView,websiteId);
                };
                service.getShareConfigByRankView = function(targetWebsiteInfo){
                    var shareConfig = {};
                    if(targetWebsiteInfo){
                        shareConfig ={
                            "title": "校宝秀微官网风云榜（"+today+"）",
                            "desc": "我们"+targetWebsiteInfo.Title+"入选微官网风云榜啦，目前排名"+targetWebsiteInfo.Rank+"，速来膜拜！",
                            "imgUrl": targetWebsiteInfo.Logo||service.defaultLogo,
                            "link":window.activityServer +"/Home/ShareRoute?p=newsite/siterank?isShareView=true&websiteId="+targetWebsiteInfo.WebsiteId
                        };
                    }else{
                        shareConfig ={
                            "title": "校宝秀微官网风云榜（"+today+"）",
                            "desc": "NB的培训机构原来都在这里，长见识了！",
                            "imgUrl": service.defaultLogo,
                            "link":window.activityServer +"/Home/ShareRoute?p=newsite/siterank?isShareView=true&websiteId=0"
                        };
                    }

                    return shareConfig
                };

                return service;
            }
        ]);
});


