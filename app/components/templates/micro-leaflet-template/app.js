"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define([
    "ionic",
  
    //微传单3 todo
    "micro_leaflet_3/micro_leaflet_3_1/app",
    "micro_leaflet_3/micro_leaflet_3_2/app",
    "micro_leaflet_3/micro_leaflet_3_3/app",

    //微传单4 todo
    "micro_leaflet_4/micro_leaflet_4_1/app",
    "micro_leaflet_4/micro_leaflet_4_2/app",
    "micro_leaflet_4/micro_leaflet_4_3/app",

    //微传单5 todo
    "micro_leaflet_5/micro_leaflet_5_1/app",
    "micro_leaflet_5/micro_leaflet_5_2/app",
    "micro_leaflet_5/micro_leaflet_5_3/app",





    
], function () {

    return angular.module("MicroLeafletTemplate", [
        "ionic",
      
        "MicroLeaflet3_1",
        "MicroLeaflet3_2",
        "MicroLeaflet3_3",
        "MicroLeaflet4_1",
        "MicroLeaflet4_2",
        "MicroLeaflet4_3",
        "MicroLeaflet5_1",
        "MicroLeaflet5_2",
        "MicroLeaflet5_3"

    ]);
});