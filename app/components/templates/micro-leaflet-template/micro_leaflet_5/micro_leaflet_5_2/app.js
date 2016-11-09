"use strict";
/**
 * author :陈雪冬
 * time: 2016年8月3日13:38:09
 * description:微传单五
 */
define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_2/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_2/service",
], function() {

    return angular.module("MicroLeaflet5_2", [
        "ionic",
        "MicroLeaflet5_2.directives",
        "MicroLeaflet5_2.Service",
        //"UploadImg"
    ]);
});