/**
 * author :yinglechao
 * time: 2016年1月5日
 * description: 新官网排行榜
 */
define(['ionic'], function () {
    return angular.module('services.net.newSiteRank', []).
        factory('newSiteRankNetService', ['$http', '$timeout', function ($http, $timeout) {

            function getRankList(pageIndex, pageSize, isShareView, websiteId) {
                var data = {
                    page:{pageIndex: pageIndex, pageSize: pageSize},
                    filter: {IsEdit:!isShareView,WebsiteId:websiteId}
                };

                return $http.post("/NewWebsite/GetPraise?timestamp=" + new Date(), data);
            }

            return {
                getRankList: getRankList
            }

        }]);
});