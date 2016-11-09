"use strict";
/**
 * author :lv li、xujie、jiawen xu
 * update time: 2016/8/2
 * description:跟进列表
 */


define(["echarts", "ionic", "modules/micro-registrationbook-statistics-app/services"],
    function(echarts) {
        return angular.module("MicroRegistrationBookStatisticsApp.controllers", ["MicroRegistrationBookStatisticsApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookStatisticsAppController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "MicroRegistrationBookStatisticsAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService", "$location",
                function($scope, $filter, $rootScope, $q, $sce, MicroRegistrationBookStatisticsAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService, $location) {

                    $scope.saleData = [{
                        name: "全部咨询",
                        registrationDate: "999",
                        transferData: "80%",
                        selected:true
                    }, {
                        name: "已分配",
                        registrationDate: "222",
                        transferData: "20%",
                        selected: false
                    }, {
                        name: "跟进中",
                        registrationDate: "333",
                        transferData: "30%",
                        selected: false
                    }, {
                        name: "已到访",
                        registrationDate: "444",
                        transferData: "10%",
                        selected: false
                    }, {
                        name: "已成交",
                        registrationDate: "555",
                        transferData: "20%",
                        selected: false
                    }];
                    //漏斗图选中层的数据
                    $scope.selectedData = $scope.saleData[0];

                    $scope.chooseSaleData=function(item) {
                        angular.forEach($scope.saleData,function(saleData) {
                            saleData.selected = false;
                        });
                        item.selected = true;
                        $scope.selectedData = item;
                    }

                    //跳转到我的场景
                    $scope.goMyScenes = function() {
                            $scope.$state.go("index", {});
                        }
                        //跳转微店
                    $scope.goMicroShop = function() {
                            window.location.href = commonNetService.getMicroShopRouter();
                        }
                        //跳转到个人中心
                    $scope.goUserCenter = function() {
                        $scope.$state.go("userCenter", {});
                    };
                    $scope.goAllList = function() {
                        $scope.$state.go("registrationbook.registrationbookall");
                    }
                    $scope.goSchedule = function() {
                        $scope.$state.go("registrationbook.schedule");
                    }
                    $scope.goChannel = function() {
                            $scope.$state.go("registrationbook.channel");
                        }
                        //初始化
                    $scope.init = function() {

                        // var myChart = echarts.init(document.getElementById('main'));
                        // var option = {
                        //     title: {
                        //         show: false
                        //     },
                        //     tooltip: {
                        //         trigger: 'item',
                        //         formatter: "{b}({d}%)",
                        //         position: ["5%", "2%"],
                        //     },
                        //     legend: {
                        //         show: false
                        //     },
                        //     labelLine: {
                        //         normal: {
                        //             show: false
                        //         }
                        //     },
                        //     label: {
                        //         normal: {
                        //             show: false,
                        //             position: 'center'
                        //         },
                        //         emphasis: {
                        //             show: false,

                        //         }
                        //     },
                        //     series: [{
                        //         name: '访问来源',
                        //         type: 'pie',
                        //         radius: '55%',
                        //         center: ['50%', '40%'],
                        //         data: [
                        //             { value: 335, name: '直接访问' },
                        //             { value: 310, name: '邮件营销' },
                        //             { value: 234, name: '联盟广告' },
                        //             { value: 135, name: '视频广告' },
                        //             { value: 1548, name: '搜索引擎' }
                        //         ],
                        //         itemStyle: {
                        //             emphasis: {
                        //                 shadowBlur: 10,
                        //                 shadowOffsetX: 0,
                        //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
                        //             }
                        //         }
                        //     }]
                        // };

                        // var option = {
                        //     title: {
                        //         show: false
                        //     },
                        //     tooltip: {
                        //         trigger: 'axis',
                        //         position: ["5%", "2%"],
                        //         formatter: "成交量： {c}",
                        //         axisPointer: {
                        //             animation: false,
                        //             lineStyle: {
                        //                 color: "#91c4ff",

                        //             },
                        //             crossStyle: {
                        //                 fontSize: 12
                        //             }
                        //         },

                        //     },

                        //     toolbox: {
                        //         feature: {
                        //             saveAsImage: {}
                        //         }
                        //     },
                        //     grid: {
                        //         left: '3%',
                        //         right: '2%',
                        //         top: '3%',
                        //         containLabel: true
                        //     },
                        //     xAxis: [{
                        //         type: 'category',
                        //         boundaryGap: false,
                        //         minInterval: 5,
                        //         axisLine: { onZero: true },
                        //         data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                        //     }],
                        //     yAxis: [{
                        //         type: 'value',

                        //         position: "right",
                        //         axisLine: {
                        //             show: false
                        //         },
                        //         axisTick: {
                        //             show: false
                        //         },
                        //         axisLabel: {
                        //             textStyle: {
                        //                 color: "#ccc"
                        //             },
                        //         }

                        //     }],
                        //     series: [{
                        //             name: '邮件营销',
                        //             type: 'line',
                        //             stack: '总量',
                        //             data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 66, 11, 12, 13, 14, 15, 16, 44, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 100, ],
                        //             itemStyle: {
                        //                 normal: {
                        //                     color: 'rgb(148, 194, 255)'
                        //                 }
                        //             },
                        //             areaStyle: {
                        //                 normal: {
                        //                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //                         offset: 0,
                        //                         color: 'rgb(182,220,255)'
                        //                     }, {
                        //                         offset: 1,
                        //                         color: 'rgb(255,255,255)'
                        //                     }])
                        //                 }
                        //             }
                        //         },

                        //     ]
                        // };
                        // myChart.setOption(option);
                        //统一增加后台页面的Loading效果 
                        if (!$rootScope.isFirstLoad) {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1833);
                        } else {
                            $timeout(function() {
                                $(".lockMask-loading2").hide();
                                $rootScope.isFirstLoad = true;
                            }, 1000);
                        }
                    };

                    $scope.init();

                }
            ]);
    });