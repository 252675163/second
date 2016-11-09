/**
 * Created by LL on 2016/4/1.
 */
define(['ionic'], function () {
    return angular.module('services.net.VIPclub', []).
        factory('VIPclubNetService', ['$http', "$q", function ($http, $q) {
            //advertisement banner
            function getAdvertisementBanner() {
                return $http.post("/Customer/GetVipBanner");
            }

            return {
                getAdvertisementBanner: getAdvertisementBanner
            }

        }
        ]
    )
});