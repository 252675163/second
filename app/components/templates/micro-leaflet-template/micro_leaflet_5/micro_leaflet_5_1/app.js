"use strict";
/**
 * author :陈雪冬
 * time: 2016年8月3日13:38:09
 * description:微传单五
 */

define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_1/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_1/service",
], function() {

    return angular.module("MicroLeaflet5_1", [
        "ionic",
        "MicroLeaflet5_1.directives",
        "MicroLeaflet5_1.Service",
        //"UploadImg"
    ]);
});