"use strict";
/**
 * author :wss
 * time: 2016.7.18
 * description:微传单四
 */

define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_1/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_4/micro_leaflet_4_1/service",
], function () {

    return angular.module("MicroLeaflet4_1", [
        "ionic",
        "MicroLeaflet4_1.directives",
        "MicroLeaflet4_1.Service",
        //"UploadImg"
    ]);
});
