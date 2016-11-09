"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
  
    //微砍价 todo
    "micro_bargain_1/micro_bargain_1_1/app",
    "micro_bargain_1/micro_bargain_1_2/app",
    "micro_bargain_1/micro_bargain_1_3/app",
    "micro_bargain_1/micro_bargain_1_4/app",
    "micro_bargain_1/micro_bargain_1_6/app",




    
], function () {

    return angular.module("MicroPowerTemplate", [
        "ionic",
      
        "MicroBargain1_1",
        "MicroBargain1_2",
        "MicroBargain1_3",
        "MicroBargain1_4",
        "MicroBargain1_6",


    ]);
});