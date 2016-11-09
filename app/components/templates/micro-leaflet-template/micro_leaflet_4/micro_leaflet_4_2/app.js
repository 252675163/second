"use strict";
/**
 * author :wss
 * time: 2016.7.18
 * description:微传单四
 */
define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_2/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_2/service",
], function () {

    return angular.module("MicroLeaflet4_2", [
        "ionic",
        "MicroLeaflet4_2.directives",
        "MicroLeaflet4_2.Service",
        //"UploadImg"
    ]);
});
