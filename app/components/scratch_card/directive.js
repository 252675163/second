"use strict";
/**
 * author :yinglechao
 * time: 2016年4月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/scratch_card/service"], function () {
    angular.module("ScratchCard.directive", ['ScratchCard.Service'])
       .directive("scratchCard", [
               "$window", "$timeout", "$ionicLoading", "$ionicScrollDelegate", "scratchCardService", function ($window, $timeout, $ionicLoading, $ionicScrollDelegate, scratchCardService) {
                   return {
                       restrict: "E",
                       scope: {
                           //宽高px
                           scratchConfigObj: "="
                       },
                       templateUrl: "components/scratch_card/template.html",
                       link: function (scope, iElement, iAttr) {
                           scope.scratchData = scratchCardService.scratchData;
                           var $scratch = iElement.find("#scratch"),
                               scratchCanvas = $scratch[0].getContext("2d"),
                               $bg = iElement.find(".bg");
                           var defaultConfigObj = {
                               eleSelector: "",//刮奖元素选择器   .scratch||#scratch
                               height: 0,//高度
                               width: 0,//宽度
                               transparentPercent: 25,//刮完时的触发百分比
                               validPercent: { startW: 20, endW: 80, startH: 37.5, endH: 62.5 },//刮的有效区域
                               bgUrl: "/app/img/help_voucher_scratch_bg.png",//涂抹层图片Url
                               callback: function () { } //刮完的回调函数
                           }

                           var isMove = false,
                               interval = null,
                               isCallbackRun = false,
                               configObj = angular.extend(defaultConfigObj, scope.scratchConfigObj);
                           var isPhone = (navigator.userAgent.match(/(android|iphone|windows phone|ipad|ipod)/i)),
                               clickEventName = isPhone ? "touchstart" : "mousedown",
                               moveEventName = isPhone ? "touchmove" : "mousemove",
                               clickEndEventName = isPhone ? "touchend" : "mouseup";
                           function init(image) {
                               scope.isShow = true;
                               configObj.width = !configObj.eleSelector ? configObj.width : iElement.parents(configObj.eleSelector).width();
                               configObj.height = !configObj.eleSelector ? configObj.height : iElement.parents(configObj.eleSelector).height();
                               $scratch[0].width = configObj.width;
                               $scratch[0].height = configObj.height;
                               scratchCanvas.beginPath();
                               scratchCanvas.drawImage(image, 0, 0, configObj.width, configObj.height);
                               scratchCanvas.closePath();
                               scratchCanvas.restore();
                               scratchCanvas.save();
                               scratchCanvas.globalCompositeOperation = "destination-out";
                               $scratch[0].addEventListener(clickEventName, function (e) {
                                   $ionicScrollDelegate.freezeAllScrolls(true);
                                   isMove = true;
                                   var pos = getPosition(e);
                                   scratchCanvas.save();
                                   scratchCanvas.beginPath();
                                   scratchCanvas.moveTo(pos.x, pos.y);

                                   //draw(pos.x, pos.y);
                               });
                               $scratch[0].addEventListener(clickEndEventName, function () {
                                   isMove = false;
                                   $ionicScrollDelegate.freezeAllScrolls(false);
                                   scratchCanvas.closePath();

                               });
                               $scratch[0].addEventListener(moveEventName, function (e) {
                                   if (!isMove) {
                                       return false;
                                   }
                                   var pos = getPosition(e);
                                   draw(pos.x, pos.y);

                               });
                           }

                           function draw(x, y) {                            
                               scratchCanvas.lineWidth = 15;
                               scratchCanvas.lineCap = "round";
                               scratchCanvas.lineJoin = "round";
                               scratchCanvas.lineTo(x, y);
                               scratchCanvas.stroke();
                               if (!isCallbackRun) {
                                   clearTimeout(interval);
                                   interval = setTimeout(getTransparentPercent, 0);
                               }
                           }
                           //获取元素的纵坐标（相对于窗口）
                           function getTop(target) {
                               var offset = target.offsetTop;
                               if (target.offsetParent != null) offset += getTop(target.offsetParent);
                               return offset;
                           }
                           //获取元素的横坐标（相对于窗口）
                           function getLeft(target) {
                               var offset = target.offsetLeft;
                               if (target.offsetParent != null) offset += getLeft(target.offsetParent);
                               return offset;
                           }
                           function getPosition(e) {
                               var target = e.target,
                                   clickX = isPhone ? e.touches[0].clientX - getLeft(target) : e.clientX - getLeft(target),
                                       clickY = isPhone ? e.touches[0].clientY - getTop(target) : e.clientY - getTop(target);
                               return { x: clickX, y: clickY + $ionicScrollDelegate.getScrollPosition().top };
                           }
                           function getTransparentPercent() {
                               var width = Math.ceil(configObj.width), height = Math.ceil(configObj.height),
                                   data = scratchCanvas.getImageData(0, 0, configObj.width, configObj.height).data,
                                       pixelLen = 0,
                                       percent,
                                       startWidth = Math.ceil(width * configObj.validPercent.startW / 100),
                                       endWidth = Math.ceil(width * configObj.validPercent.endW / 100),
                                       startHeight = Math.ceil(width * configObj.validPercent.startH / 100),
                                       endHeight = Math.ceil(width * configObj.validPercent.endH / 100);
                               for (var j = 0; j <= height; j++) {
                                   for (var i = 0; i <= width; i++) {
                                       var index = 4 * (j * width + i) - 1,
                                           alpha = data[index];
                                       if (alpha < 128) {
                                           if (i >= startWidth && i <= endWidth && j >= startHeight && j <= endHeight) {
                                               pixelLen += 1.5;
                                           }
                                           else {
                                               pixelLen += 0.2;
                                           }
                                       }
                                   }
                               }
                               percent = parseInt(pixelLen / (data.length / 4) * 100);
                               if (!isCallbackRun && percent >= configObj.transparentPercent) {
                                   isCallbackRun = true;
                                   configObj.callback();
                                   //$scratch.fadeOut(1000);
                                   //scratchCardService.hide();
                               }
                               return percent;
                           }
                           $bg.attr("src", configObj.bgUrl);
                           $bg.load(function () {
                               var img = new Image();
                               //跨域图片处理
                               img.crossOrigin = "Anonymous";
                               img.src = configObj.bgUrl;
                               img.onload = function () {
                                   init(img);

                                   // call next step in your code here, f.ex: nextStep();
                               };
                           })
                       }

                   };
               }
       ]
       );
});