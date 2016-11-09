"use strict";
/**
 * author :yinglechao
 * time: 2015年9月13日
 * description: templateModel就是该模板创建的结构，自定义
 */


define(["ionic", "components/audio/service"], function () {
    angular.module("MyAudio.directive", ['MyAudio.Service'])
        .directive("myAudio", [
            "$window", "$rootScope","$timeout", "$ionicLoading", "myAudioService", function ($window,$rootScope, $timeout, $ionicLoading, myAudioService) {
                return {
                    restrict: "E",
                    scope: {
                        audioSrc: "=",
                        audioHandle: "="
                    },
                    templateUrl: "components/audio/template.html",
                    link: function (scope, iElement, iAttr) {
                        function init() {
                            scope.myaudio = iElement[0].getElementsByClassName("myaudio")[0];
                            // scope.myaudio.loop = true;
                            scope.myaudio.src = scope.audioSrc;
                            scope.myaudio.load();

                            scope.audioHandle.pause = function () {
                                scope.myaudio.pause();
                            };
                            scope.audioHandle.play = function () {
                                scope.myaudio.play();
                            };

                            var touchstartHandler = function () {
                                if (scope.myaudio.paused) {
                                    scope.myaudio.play();
                                }
                                window.removeEventListener('touchstart', touchstartHandler);
                            };

                            //资源准备好后第一次播放音乐
                            var palyAudioFunctionCall = function () {
                                $timeout(function () {
                                    scope.myaudio.play();
                                    //部分机型不会自动播放 todo
                                    if(scope.myaudio.paused){
                                        window.addEventListener('touchstart', touchstartHandler, false);
                                    }
                                    scope.myaudio.removeEventListener("canplay", palyAudioFunctionCall)
                                }, 500);
                            };

                            scope.myaudio.addEventListener("canplay", palyAudioFunctionCall, false);
                            //解决ios音乐上不循环播放

                            scope.myaudio.addEventListener("ended", function () {
                                scope.myaudio.play();
                            }, false);
                        }

                        init();
                        // waring  todo
                        var routerListen = $rootScope.$on("$stateChangeStart", function(event, toState) {
                            iElement[0].getElementsByClassName("myaudio")[0].pause();
                            iElement[0].getElementsByClassName("myaudio")[0].src = "";
                            routerListen();
                        });
                        //监听destroy事件，音乐资源销毁
                        scope.$on("$destroy", function () {
                            scope.myaudio.pause();
                            scope.myaudio.src = "";
                        });


                    }
                };
            }
        ]
    );
});