"use strict";
/**
 * author :wss
 * time: 2016.7.18
 * description:微传单三
 */

define([
    "ionic",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_1/directive",
    "components/templates/micro-leaflet-template/micro_leaflet_3/micro_leaflet_3_1/service",
], function () {

    return angular.module("MicroLeaflet3_1", [
        "ionic",
        "MicroLeaflet3_1.directives",
        "MicroLeaflet3_1.Service",
        //"UploadImg"
    ]);
});
