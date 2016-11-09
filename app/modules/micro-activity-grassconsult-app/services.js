"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic"],function () {
    return angular.module("MicroActivityGrassConsultApp.services", [])
        .service("MicroActivityGrassConsultAppService", [
            "$rootScope",
            function ($rootScope) {
                var MicroActivityGrassConsultAppService = {};
                MicroActivityGrassConsultAppService.isValid = function (name,phone) {
                    if (name=="") {
                        //var nameRegexp = /^.{1,15}$/;
                        //if (!nameRegexp.test(name))
                            return 1;            //名字不正确
                    }
                    //else
                    //    return 1;               //名字为空


                    if (phone) {
                        var phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3|5|8|4|7])\d{9}$)/;
                  //      console.log(phoneRegexp.test(phone));
                        if (!phoneRegexp.test(phone))
                            return 4;           //号码不正确
                    }
                    else
                        return 3;               //号码为空

                    return 0;                  //格式正确

                };
                return MicroActivityGrassConsultAppService;
            }
        ]);
});


