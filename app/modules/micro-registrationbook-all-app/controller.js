"use strict";
/**
 * author :xujie luhao zhouhuijuan
 * update time:2016/10/8
 * description:咨询本全部列表
 */


define(["ionic", "modules/micro-registrationbook-all-app/services"],
    function () {
        return angular.module("MicroRegistrationBookAllApp.controllers", ["MicroRegistrationBookAllApp.services", "TextInputCallback"])
            .controller("MicroRegistrationBookAllAppController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "MicroRegistrationBookAllAppService", "promptBarService", "commonNetService", "$timeout", "textInputCallbackService", "$ionicScrollDelegate", "permissionService", "maskService", "MicroRegistrationBookAppService", "$ionicPopup", "singleThreadedNetService",
                function ($scope, $filter, $rootScope, $q, $sce, MicroRegistrationBookAllAppService, promptBarService, commonNetService, $timeout, textInputCallbackService, $ionicScrollDelegate, permissionService, maskService, MicroRegistrationBookAppService, $ionicPopup, singleThreadedNetService) {

                    var pageSize = 15,
                        statusList = [],
                        templateIdList = [],
                        sceneIdList = [],
                        interests = [],
                        salesMan = [],
                        searchTags = [],
                        searchCollectList = [],
                        searchCollect = '',
                        orderBy = 'Desc',
                        orderByField = "EditDate";

                    var filterStr = "";
                    var headBgcolor = ["#6090cd", "#90d355", "#fec42c", "#e3547f", "#ff7f5d", "#49c5d8"];
                    $scope.salesmanListStatues = [];
                    if ($scope.$stateParams.id && $scope.$stateParams.type) {
                        //模板类型
                        templateIdList.push($scope.$stateParams.type);
                        //模板id
                        sceneIdList.push($scope.$stateParams.id);
                    }
                    //$scope.filterStatusModel = [];
                    //$scope.filterSceneList = [];
                    $scope.defaultContent = "请在此输入备注";
                    $scope.hasFilter = false;
                    $scope.hasregDone = false;//loading
                    $scope.baseImgUrl = window.resourceDoMain + "/app/img/";
                    $scope.showAllList = true;
                    $scope.showFilter = false;
                    $scope.allListTopData = [];
                    $scope.allListNormalData = [];
                    $scope.onGoingListData = [];
                    $scope.normalDateList = [];
                    $scope.onGoingListDate = [];
                    //多选使用
                    $scope.selectList = [];
                    $scope.phoneList = [];
                    $scope.idList = [];
                    //
                    $scope.newUserNum = 0;
                    $scope.allListPage = {
                        totalCount: "",
                        currentIndex: "",
                        itemCount: ""
                    };


                    //左上角排序方式
                    $scope.sortList = { con: "跟进时间", arrowClass: "filter_input_icon1" };
                    if ($scope.filterCondition.orderBy == "Asc") {
                        $scope.sortList.arrowClass="filter_input_icon2";
                    }

                    //获得筛选条件历史记录
                    var filterCondition = angular.copy($scope.filterCondition);

                    //保存该页的筛选条件在父模块scope中
                    var saveFilterCondition = function () {
                        $scope.filterCondition.statusList = angular.copy(statusList);
                        $scope.filterCondition.typeList = angular.copy(templateIdList);
                        $scope.filterCondition.sceneIdList = angular.copy(sceneIdList);
                        $scope.filterCondition.interests = angular.copy(interests);
                        $scope.filterCondition.salesMan = angular.copy(salesMan);
                        $scope.filterCondition.searchTags = angular.copy(searchTags);
                        $scope.filterCondition.searchCollect = angular.copy(searchCollect);
                        $scope.filterCondition.orderBy = angular.copy(orderBy);
                        $scope.filterCondition.orderByField = angular.copy(orderByField);
                        $scope.filterCondition.isSaved = true;
                        // MicroRegistrationBookAppService.setFilterCondition(filterCondition);
                    }

                    //下拉出现搜索框begin

                    $scope.searchShow = false;
                    $scope.dragDown = function () {
                        if ($ionicScrollDelegate.$getByHandle('all').getScrollPosition().top == 0) {
                            $scope.searchShow = true;
                        }

                    }
                    //end

                    //crm专业化 begin
                    $scope.consultAddBox = false;
                    $scope.regAddBtn = true;
                    $scope.moreSelect = false;
                    $scope.selectList = [];
                    //多选取消按钮
                    $scope.chooseSelect = function () {
                        if ($scope.moreSelect == false) {
                            return "多选";
                        } else {
                            return "取消";
                        }
                    }
                    //多选
                    $scope.regMoreSelect = function () {
                        $scope.showBannerNone = !$scope.showBannerNone;
                        $scope.moreSelect = !$scope.moreSelect;
                        if ($scope.moreSelect) {
                            //筛选操作百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/multiselect"]);
                            }
                        }
                        if (!$scope.moreSelect) {
                            //取消多选百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/multiselect/undo"]);
                            }
                        }
                        if ($scope.moreSelect == false) {
                            $scope.selectAll = false;
                            angular.forEach($scope.allListNormalData, function (regUser) {
                                regUser.isSelected = $scope.selectAll;
                            });
                        }
                        $scope.showFilter = false;
                        $scope.showSort = false;
                        //存储是否被选择
                        $scope.selectList = [];
                        //存储被选择的手机号
                        $scope.phoneList = [];
                        //存储被选择的id
                        $scope.idList = [];
                    }

                    //全选
                    $scope.regfSelectAll = function () {
                        $scope.selectAll = $scope.selectAll || false;
                        $scope.selectAll = !$scope.selectAll;
                        if ($scope.selectAll) {
                            //筛选操作百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/multiselect/selectall"]);
                            }
                        }
                        $scope.selectList = [];
                        $scope.phoneList = [];
                        $scope.idList = [];
                        angular.forEach($scope.allListNormalData, function (regUser) {
                            regUser.isSelected = $scope.selectAll;
                            if (regUser.isSelected == true) {
                                $scope.selectList.push(regUser.isSelected);
                                $scope.phoneList.push(regUser.Phone);
                                $scope.idList.push(regUser.Id);
                            }
                        });
                    }
                    $scope.grayMsg = function () {
                        if ($scope.selectList.length > 0 && ($scope.userMsgLevel == true)) {
                            return false;
                        }
                        return true;
                    }
                    $scope.graySale = function () {
                        if ($scope.selectList.length > 0 && ($scope.userSaleLevel == true)) {
                            return false;
                        }
                        return true;
                    }

                    //新增咨询弹窗
                    $scope.addConsult = function () {
                        $scope.newData = [];
                        //新增咨询百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/addnew"]);
                        }
                        $scope.consultAddBox = true;
                    }
                    $scope.escAddBox = function () {
                        $scope.consultAddBox = false;
                        //新增咨询取消百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/addnew/undo"]);
                        }
                        return;
                    }
                    $scope.affirmAddBox = singleThreadedNetService(function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/addnew/do"]);
                        }
                        if (!$scope.newData.name) {
                            promptBarService.showErrorBar("请输入姓名", 3000);
                            return;
                        } else if (!$scope.newData.phone) {
                            promptBarService.showErrorBar("请输入手机号", 3000);
                            return;
                        }
                        return MicroRegistrationBookAllAppService.fastCreateConsult($scope.newData).success(function (result) {
                            if (result.status == 1) {
                                //进入详情页面百度统计埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/clientdetail/tracebyclientaddnew"]);
                                }
                                $scope.$state.go("registrationbook.registrationbookdetail", { id: result.data.Id, showPage: 1 });
                                $scope.consultAddBox = false;
                                return;
                            }
                            if (result.error == 3) {
                                promptBarService.showErrorBar("相同姓名和手机号的咨询已存在", 3000);
                            }
                        });
                    });


                    //提取手机号
                    $scope.sendMsgs = function () {
                        //群发短信百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/multiselect/textmessage"]);
                        }
                        if ($scope.phoneList.length > 0 && ($scope.userMsgLevel == true)) {
                            var myPopup = $ionicPopup.alert({
                                template: '<div class="sendMsgs-box"><div class="box-title"><i></i>请复制手机号群发短信</div><textarea class="box-content"  id="textArea" disabled="disabled">' + $scope.phoneList + '</textarea></div>',
                                okText: "关闭",
                                okType: 'btn-blue-clear'
                            });
                            myPopup.then(function (res) {
                                $('#textArea').html(2);
                            });
                        } else {
                            return;
                        }
                    };

                    //分配销售
                    $scope.salesmanListData = [];

                    //显示销售员列表
                    $scope.showSalesman = function () {
                        if ($scope.idList.length > 0 && ($scope.userSaleLevel == true)) {
                            $scope.isSalesmanShow = true;
                        } else {
                            return;
                        }
                    }
                    //关闭销售员列表
                    $scope.closeSalesman = function () {
                        $scope.isSalesmanShow = false;
                    }
                    //选择销售员列表
                    $scope.chooseSalesman = function (item) {
                        $scope.isSalesmanShow = false;
                        var confirmPopup = $ionicPopup.confirm({
                            template: "确认将选中的咨询分配给该销售员吗？",
                            cancelText: "取消",
                            cancelType: 'btn-blue-clear',
                            okText: "确认",
                            okType: 'btn-blue-clear'
                        });
                        //TODO 选择销售员回调
                        confirmPopup.then(function (res) {
                            if (res) {
                                //分配销售百度统计埋点
                                if (window._hmt) {
                                    window._hmt.push(['_trackPageview', "/client/multiselect/allocatesalesman"]);
                                }
                                MicroRegistrationBookAllAppService.allotSalesMan(item, $scope.idList).then(function (result) {
                                    if (result.data.status == 1) {
                                        $scope.isSalesmanShow = false;
                                    } else {
                                        promptBarService.showErrorBar(result.data.message, 3000);
                                    }
                                })

                            } else {
                                return;
                            }
                        });
                    }

                    $scope.goSchedule = function () {
                        saveFilterCondition();
                        //置空选中日程
                        var ScheduleDate = "";
                        MicroRegistrationBookAppService.setScheduleDate(ScheduleDate);
                        $scope.$state.go("registrationbook.schedule");
                    }
                    $scope.goStatistics = function () {
                        $scope.$state.go("registrationbook.statistics");
                    }
                    $scope.goChannel = function () {
                        $scope.$state.go("registrationbook.channel");
                    }

                    //crm专业化 end

                    $scope.goOngoingList = function () {

                        //保存筛选条件
                        saveFilterCondition();

                        $scope.$state.go("registrationbook.registrationbookongoing");
                    }

                    $scope.showSearch = function () {

                        //保存筛选条件
                        saveFilterCondition();
                        //置空搜索条件
                        var searchCondition = "";
                        MicroRegistrationBookAppService.setSearchCondition(searchCondition);
                        $scope.$state.go("registrationbook.registrationbooksearch");
                    }

                    //跳转到我的场景
                    $scope.goMyScenes = function () {
                        $scope.$state.go("index", {});
                    }
                    //跳转微店
                    $scope.goMicroShop = function () {
                        window.location.href = commonNetService.getMicroShopRouter();
                    }
                    //跳转到个人中心
                    $scope.goUserCenter = function () {
                        $scope.$state.go("userCenter", {});
                    };
                    //排序切换
                    $scope.toggleSort = function () {
                        $scope.showSort = !$scope.showSort;
                        if ($scope.showSort) {
                            //排序操作百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/rank"]);
                            }
                        }
                        $scope.showFilter = false;
                        $scope.showBannerNone = false;
                        if ($scope.moreSelect) {
                            $scope.showBannerNone = true;
                        };
                        $scope.selectAll = false;
                        angular.forEach($scope.allListNormalData, function (regUser) {
                            regUser.isSelected = $scope.selectAll;
                        });
                    }
                    //筛选切换
                    $scope.toggleFilter = function () {
                        $scope.showFilter = !$scope.showFilter;
                        if ($scope.showFilter) {
                            //筛选操作百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/filter"]);
                            }
                            $scope.hasFilterCondition = false;
                        }
                        else {
                            $scope.showAllList = true;
                        }
                        /* if ($scope.filterStatusModel.length > 0) {
                             angular.copy($scope.filterStatusModel, $scope.statusModel);
                             angular.copy($scope.filterSceneList, $scope.filterSelectList);
                         }*/

                        $scope.showSort = false;
                        $scope.showBannerNone = false;
                        if ($scope.moreSelect) {
                            $scope.showBannerNone = true;
                        };
                        $scope.selectAll = false;
                        angular.forEach($scope.allListNormalData, function (regUser) {
                            regUser.isSelected = $scope.selectAll;
                        });
                    }
                    //获取默认头像背景色
                    $scope.getHeadImageBg = function (name) {
                        if (name.length > 0) {
                            return headBgcolor[name[0].charCodeAt() % 6];
                        }
                    }

                    //新版crm暂时无指定操作
                    ////置顶操作
                    //$scope.markTop = function (regUser) {
                    //    regUser.IsTop = !regUser.IsTop;
                    //    //置顶操作百度统计埋点
                    //    if (window._hmt) {
                    //        window._hmt.push(['_trackPageview', "/registrationbook/CRMtotal/tag"]);
                    //    }
                    //    MicroRegistrationBookAllAppService.markTop(regUser.Id, regUser.IsTop).success(function (result) {
                    //        if (result.status == 0) {
                    //            promptBarService.showErrorBar(result.message);
                    //            regUser.IsTop = !regUser.IsTop;
                    //        }
                    //    });
                    //}

                    //获取新用户数量
                    // $scope.getNewUserNum = function () {
                    //     MicroRegistrationBookAllAppService.getNewUserNum().success(function (result) {
                    //         if (result.status == 1) {
                    //             $scope.newUserNum = result.data;
                    //         }
                    //         else {
                    //             promptBarService.showErrorBar(result.message);
                    //         }
                    //     });
                    // }
                    //获取销售员列表
                    $scope.getSaleMan = function () {
                        MicroRegistrationBookAllAppService.getSaleManList().then(function (result) {
                            if (result.data.status == 1) {
                                if (result.data.data) {
                                    $scope.salesmanListData = result.data.data;
                                    //加入无销售员筛选
                                    var salesList = angular.copy(result.data.data);
                                    salesList.unshift("null");
                                    angular.forEach(salesList, function (value, key) {
                                        var obj = {
                                            name: value,
                                            viewName: value,
                                            status: false//销售员添加选中状态属性
                                        };
                                        if (filterCondition.salesMan.length > 0) {
                                            for (var i = 0; i < filterCondition.salesMan.length; i++) {
                                                if (obj.name == filterCondition.salesMan[i]) {
                                                    obj.status = true;
                                                }
                                            }
                                        }
                                        $scope.salesmanListStatues.push(obj);
                                    });
                                    $scope.salesmanListStatues[0].viewName = "无";

                                }
                            } else {
                                promptBarService.showErrorBar(result.data.message, 3000);
                            }
                        })
                    }
                    $scope.toDetailPage = function (regUserId, regUser) {

                        //多选按钮点开后操作，并阻止后续进入详情
                        if ($scope.moreSelect == true) {
                            //单选百度统计埋点
                            if (window._hmt) {
                                window._hmt.push(['_trackPageview', "/client/multiselect/selectone"]);
                            }

//                            //从三个手机号码中拿到优先级最高的一个
//                            var choosePhone = function (data) {
//                                var phoneNums = data.split(",");
//                                var phoneNum;
//                                for (var i = 0; i < 3; i++) {
//                                    if (phoneNums[i] !== "") {
//                                        phoneNum = phoneNums[i];
//                                        return phoneNum;
//                                    }
//                                }
//                            }

                            regUser.isSelected = regUser.isSelected || false;
                            regUser.isSelected = !regUser.isSelected;
                            if (regUser.isSelected == true) {
                                $scope.selectList.push(regUser.isSelected);
                                if (!angular.equals(regUser.Phone, null)) {
                                    $scope.phoneList.push(regUser.Phone);
                                }
                                $scope.idList.push(regUser.Id);
                                if ($scope.selectList.length == ($scope.allListNormalData.length + $scope.allListTopData.length)) {
                                    $scope.selectAll = true;
                                }
                            } else {
                                $scope.selectAll = false;
                                $scope.selectList.splice(-1, 1);
                                if (!angular.equals(regUser.Phone, null)) {
                                    var phoneWhere = $scope.phoneList.indexOf(regUser.Phone);
                                    $scope.phoneList.splice(phoneWhere, 1);
                                }
                                var idWhere = $scope.idList.indexOf(regUser.Id);
                                $scope.idList.splice(idWhere, 1);
                            }
                            return;
                        }
                        
                        MicroRegistrationBookAllAppService.markAsRead(regUserId).success(function (result) {
                            if (result.status == 0) {
                                promptBarService.showErrorBar(result.message);
                            }
                        });

                        //保存筛选条件
                        saveFilterCondition();
                        //进入详情页面百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/clientdetail/tracebyclient"]);
                        }
                        $scope.$state.go("registrationbook.registrationbookdetail", { id: regUserId });
                    }
                    $scope.regUserArr = [];

                    $scope.getRegBookUserList = function (pageIndex, pageSize, regBookUserListType, queryType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy) {
                        $scope.allListEmpty = false;
                        $scope.showReload = false;
                        var d = $q.defer();
                        var isAllList = regBookUserListType == 1 ? true : false,
                            list = [];
                        queryType = !queryType ? "reset" : "add";
                        MicroRegistrationBookAllAppService.getRegBookUserList(pageIndex, pageSize, regBookUserListType, followUpStatusList, regBookTemplateTypeList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy).success(function (result) {
                            if (result.status == 1) {
                                list = result.data.list;
                                if (isAllList) {
                                    $scope.normalDateList = [];
                                    if (queryType == "reset") {
                                        //$scope.allListTopData = [];
                                        $scope.allListNormalData = [];
                                    }

                                    //全部非置顶
                                    angular.forEach(list, function (data, index) {
                                        var editDate = $filter('formatJsonDate')(data.EditDate, "yyyy-MM-dd HH:mm")
                                        data.EditDate = parseInt(editDate.substr(0, 4)) < 2000 ? null : editDate;
                                        //data.RecentContactAt = $scope.formatDateByStatistics(data.RecentContactAt);
                                        //data.RecentInteractiveAt = $scope.formatDateByStatistics(data.RecentInteractiveAt);
                                        //var visitDateTime = $filter('formatJsonDate')(data.RecentVisitAt, "yyyy/MM/dd HH:mm")
                                        //data.RecentVisitAt = parseInt(visitDateTime.substr(0, 4)) < 2000 ? null : visitDateTime;//判断返回的日期
                                        //data.copyRecentVisitAt = data.RecentVisitAt;
                                    })
                                    var normalList = $scope.allListNormalData.concat(list);
                                    //angular.forEach(normalList, function (data, index) {
                                    //    if (index == 0) {
                                    //        $scope.normalDateList.push(data.RecentInteractiveAt);
                                    //    } else {
                                    //        if (data.RecentInteractiveAt != normalList[index - 1].RecentInteractiveAt) {
                                    //            var flag = false;
                                    //            angular.forEach($scope.normalDateList, function (date) {
                                    //                if (date == data.RecentInteractiveAt) {
                                    //                    flag = true;
                                    //                }
                                    //            })
                                    //            if (!flag) {
                                    //                $scope.normalDateList.push(data.RecentInteractiveAt);
                                    //            }
                                    //        }
                                    //    }
                                    //})
                                    $scope.allListNormalData = normalList;
                                    $scope.allListPage = result.data.page;
                                    $scope.allListEmpty = $scope.allListNormalData.length == 0 ? true : false;
                                }
                                d.resolve(result);
                            }
                            else {
                                d.reject(result);
                                promptBarService.showErrorBar(result.message);
                            }
                        }).error(function (result) {
                            if (angular.equals(result, null)) {
                                $scope.allListNormalData = [];
                                $scope.hasregDone = true;
                                $scope.showReload = true;
                                $scope.allListEmpty = false;
                                $scope.showFilter = false;
                                $scope.showSort = false;
                            }
                        })
                        return d.promise;
                    }


                    //格式化日期
                    //$scope.formatDateByStatistics = function (data) {
                    //    var d = new Date(parseInt(data.substr(6, 13)));
                    //    var year = d.getFullYear();
                    //    var month = d.getMonth() + 1;
                    //    var date = d.getDate();

                    //    if (month.toString().length == 1) {
                    //        month = "0" + month;
                    //    }

                    //    if (date.toString().length == 1) {
                    //        date = "0" + date;
                    //    }

                    //    return year + "-" + month + "-" + date;
                    //};

                    //加载全部列表
                    $scope.loadAllList = function () {
                        var index = $scope.allListPage.currentIndex ? $scope.allListPage.currentIndex : 0,
                            queryType = $scope.allListPage.currentIndex ? "add" : "";
                        $scope.getRegBookUserList(index + 1, pageSize, 1, queryType, statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy).then(function () {
                            $scope.$broadcast("scroll.infiniteScrollComplete");
                        });
                        $scope.selectAll = false;
                    };

                    //筛选


                    // 跟进状态model
                    $scope.statusModel = [
                        { id: 1, con: "待跟进", status: false, order: 1 },
                        { id: 2, con: "跟进中", status: false, order: 2 },
                        { id: 3, con: "已成交", status: false, order: 4 },
                        { id: 4, con: "已失效", status: false, order: 5 },
                        { id: 5, con: "已到访", status: false, order: 3 }
                    ];
                    for (var k = 0; k < filterCondition.statusList.length; k++) {
                        $scope.statusModel[filterCondition.statusList[k] - 1].status = true;
                    }
                    //标签model
                    $scope.searchTagsModel = [
                        { id: 1, con: "本地", status: false, order: 1 },
                        { id: 2, con: "外地", status: false, order: 2 },
                        { id: 3, con: "已报名", status: false, order: 4 },
                        { id: 4, con: "未报名", status: false, order: 3 }
                    ]
                    for (var k = 0; k < filterCondition.searchTags.length; k++) {
                        $scope.searchTagsModel[filterCondition.searchTags[k] - 1].status = true;
                    }

                    //有无星标
                    $scope.searchCollectModel = [
                        { id: 1, con: "有", status: false, order: 2 },
                        { id: 2, con: "无", status: false, order: 1 }
                    ]
                    if (filterCondition.searchCollect !== '' && !angular.isUndefined(filterCondition.searchCollect)) {
                        if (filterCondition.searchCollect === 0) {
                            angular.forEach($scope.searchCollectModel, function (item) {
                                item.status = true;
                            });
                        }
                        else {
                            $scope.searchCollectModel[filterCondition.searchCollect - 1].status = true;
                        }
                    }
                    //意向度
                    $scope.interestsModel = [
                        { id: 1, addclass: "regis_icon1", status: false },
                        { id: 2, addclass: "regis_icon2", status: false },
                        { id: 3, addclass: "regis_icon3", status: false },
                        { id: 4, addclass: "regis_icon4", status: false }
                    ]
                    for (var k = 0; k < filterCondition.interests.length; k++) {
                        $scope.interestsModel[filterCondition.interests[k] - 1].status = true;
                    }
                    //排序方式,单选
                    $scope.sortStatusModel = [
                        { id: 1, con: "跟进时间", status: true },
                    ]
                    //倒序or顺序,单选
                    $scope.orderBysModel = [
                        { id: 1, className: "order_icon1", status: true, arrowClass: "filter_input_icon1" },
                        { id: 2, className: "order_icon2", status: false, arrowClass: "filter_input_icon2" }
                    ]
                    if (filterCondition.orderBy == 'Asc') {
                        $scope.orderBysModel[0].status = false;
                        $scope.orderBysModel[1].status = true;
                    }
                    else {
                        $scope.orderBysModel[0].status = true;
                        $scope.orderBysModel[1].status = false;
                    }

                    var filterPageSize = 10, defaultSceneTitle = "微官网";
                    $scope.filterSelectList = [];
                    $scope.filterSelectPage = 1;
                    $scope.GetRegistrationBookSceneList = function (pageIndex, pageSize) {
                        var d = $q.defer();
                        MicroRegistrationBookAllAppService.GetRegistrationBookSceneList(pageIndex, pageSize).success(function (result) {
                            if (result.status == 1) {
                                d.resolve(result);
                                var list = result.data.list;
                                for (var i = 0; i < list.length; i++) {
                                    list[i].Id = list[i].Id;
                                    list[i].RegBookTemplateType = list[i].RegBookTemplateType;
                                    list[i].status = false;
                                    if (list[i].ShareConfig && JSON.parse(list[i].ShareConfig).title) {
                                        list[i].Title = JSON.parse(list[i].ShareConfig).title;
                                        //|| JSON.parse(list[i].TemplateShareConfig).title || defaultSceneTitle;
                                    }
                                    else if (list[i].TemplateShareConfig && JSON.parse(list[i].TemplateShareConfig).title) {
                                        list[i].Title = JSON.parse(list[i].TemplateShareConfig).title;
                                    }
                                    else {
                                        list[i].Title = defaultSceneTitle;
                                    }

                                    //有记录则将记录中选中的置为选中
                                    if (filterCondition.sceneIdList.length > 0 || filterCondition.typeList.length > 0 || filterCondition.statusList.length > 0) {
                                        for (var j = 0; j < filterCondition.sceneIdList.length; j++) {
                                            if (filterCondition.sceneIdList[j] == list[i].Id &&
                                                list[i].RegBookTemplateType == filterCondition.typeList[j]) {
                                                list[i].status = true;
                                            }
                                        }
                                    }
                                    else if (list[i].Id == $scope.$stateParams.id && list[i].RegBookTemplateType == $scope.$stateParams.type) {
                                        list[i].status = true;
                                    }
                                }
                                $scope.filterSelectList = $scope.filterSelectList.concat(list);
                                $scope.filterSelectPage = result.data.page;
                            } else {
                                d.reject(result.message);
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        })
                        return d.promise;
                    }

                    //滚动加载
                    $scope.loadSceneList = function () {
                        $scope.GetRegistrationBookSceneList($scope.filterSelectPage.currentIndex + 1, filterPageSize).then(function () {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        });
                    };
                    //点击选择
                    $scope.regStateTabSelect = function (tab) {
                        tab.status = !tab.status;
                    }
                    //点击单选

                    $scope.sigleTabSelect = function (tab, list) {
                        angular.forEach(list, function (value, key) {
                            value.status = false;
                        });
                        tab.status = true;
                    }
                    //选择倒叙or升序
                    var currentOrderId = 1;
                    if ($scope.filterCondition.orderBy == "Asc") {
                        currentOrderId = 2;
                    }
                    $scope.selectOrderBy = function (tab) {
                        $scope.sigleTabSelect(tab, $scope.orderBysModel);
                        currentOrderId = tab.id;
                        $scope.sortList.arrowClass = tab.arrowClass;
                    }
                    //选择排序方式
                    $scope.selectOrderByField = function (tab) {
                        $scope.sigleTabSelect(tab, $scope.sortStatusModel);
                        $scope.sortList.con = tab.con;
                    }
                    //重置筛选选择
                    $scope.regSelectClear = function () {
                        //筛选操作百度统计埋点
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/filter/reset"]);
                        }
                        //跟进状态
                        angular.forEach($scope.statusModel, function (value, key) {
                            value.status = false;
                        });
                        // 销售model
                        angular.forEach($scope.salesmanListStatues, function (value, key) {
                            value.status = false;
                        });
                        //有无星标
                        angular.forEach($scope.searchCollectModel, function (value, key) {
                            value.status = false;
                        });
                        //意向度
                        angular.forEach($scope.interestsModel, function (value, key) {
                            value.status = false;
                        });
                        //标签
                        angular.forEach($scope.searchTagsModel, function (value, key) {
                            value.status = false;
                        });
                        //来源
                        angular.forEach($scope.filterSelectList, function (value, key) {
                            value.status = false;
                        });

                        filterStr = "reset";
                    }
                    var a, b;
                    //筛选提交
                    $scope.regSelectSubmit = singleThreadedNetService(function () {
                        if (window._hmt) {
                            window._hmt.push(['_trackPageview', "/client/filter/filtering"]);
                        }
                        $ionicScrollDelegate.$getByHandle('all').scrollTop();
                        statusList = [];
                        sceneIdList = [];
                        templateIdList = [];
                        interests = [];//意向度列表
                        salesMan = [];//销售员 如果权限是销售员 状态为选中 则不能反选
                        searchTags = [];//标签列表
                        searchCollectList = [];// 星标
                        searchCollect = '';
                        orderByField = 'EditDate';
                        orderBy = 'Desc';// 排序列表
                        angular.forEach($scope.statusModel, function (value, key) {
                            value.status == true ? statusList.push(value.id) : "";
                        });
                        angular.forEach($scope.filterSelectList, function (value, key) {
                            if (value.status) {
                                templateIdList.push(value.RegBookTemplateType);
                                sceneIdList.push(value.Id);
                            }
                        });
                        angular.forEach($scope.interestsModel, function (value, key) {
                            value.status == true ? interests.push(value.id) : "";
                        });

                        angular.forEach($scope.salesmanListStatues, function (value, key) {
                            value.status == true ? salesMan.push(value.name) : "";
                        });

                        angular.forEach($scope.searchTagsModel, function (value, key) {
                            value.status == true ? searchTags.push(value.id) : "";
                        });
                        angular.forEach($scope.searchCollectModel, function (value, key) {
                            value.status == true ? searchCollectList.push(value.id) : "";
                        });
                        searchCollect = searchCollectList.length > 1 ? 0 : searchCollectList[0];

                        orderBy = currentOrderId == 1 ? 'Desc' : "Asc";
                        if (statusList.length > 0 ||
                            sceneIdList.length > 0 ||
                            interests.length > 0 ||
                            salesMan.length > 0 ||
                            searchTags.length > 0 ||
                            searchCollect) {
                            $scope.hasFilterCondition = true;
                        }
                        return $scope.getRegBookUserList(1, pageSize, 1, '', statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy).then(function (data) {
                            if (data.status == 1) {
                                $scope.selectList = [];
                                $scope.phoneList = [];
                                $scope.idList = [];
                                $scope.showFilter = false;
                                $scope.showSort = false;
                                $scope.hasFilter = true;
                                filterStr = "filter";
                            }
                        });
                    });
                    //重置排序
                    $scope.regSorClear = function () {
                        angular.forEach($scope.orderBysModel, function (value) {
                            value.status = (value.id == 1 ? true : false);
                        });
                        currentOrderId = 1;
                        $scope.sortList.arrowClass = 'filter_input_icon1';
                    }

                    //CRM专业化去除第一次遮罩提示显示状态
                    // $scope.closeFirstRemind = function () {
                    //     MicroRegistrationBookAllAppService.updateUserConfig("IsShowRegBookGuide", "false").then(function (result) {
                    //         if (result.data.status == 1) { } else {
                    //             promptBarService.showErrorBar(result.data.message, 3000);
                    //         }
                    //     }, null);
                    // }

                    //重新加载
                    $scope.reFreshList = function () {
                        $scope.getRegBookUserList(1, pageSize, 1, '', statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy).then(function (data) {
                            if (data.status == 1) {
                                /*$scope.filterStatusModel = []; $scope.filterSceneList = [];
                                angular.copy($scope.statusModel, $scope.filterStatusModel);
                                angular.copy($scope.filterSelectList, $scope.filterSceneList);*/
                                $scope.showFilter = false;
                                $scope.hasFilter = true;
                                filterStr = "filter";
                            }
                        });
                    }

                    //初始化
                    $scope.init = function () {
                        //日活统计
                        commonNetService.addBackgroundOperationLog("LeadsList");
                        $scope.showlists = true;
                        $scope.showBannerNone = false;
                        $scope.showConsultsBookList = false;
                        $scope.showReload = false;
                        $scope.allListEmpty = false;
                        var queryType = '';
                        //如果有历史记录，使用记录中选中的内容
                        if (filterCondition.sceneIdList.length > 0 || filterCondition.typeList.length > 0 || filterCondition.statusList.length > 0 || filterCondition.isSaved) {
                            statusList = angular.copy(filterCondition.statusList);
                            templateIdList = angular.copy(filterCondition.typeList);
                            sceneIdList = angular.copy(filterCondition.sceneIdList);
                        }
                        interests = angular.copy(filterCondition.interests);
                        salesMan = angular.copy(filterCondition.salesMan);
                        searchTags = angular.copy(filterCondition.searchTags);
                        searchCollect = angular.copy(filterCondition.searchCollect);
                        orderByField = angular.copy(filterCondition.orderByField);
                        orderBy = angular.copy(filterCondition.orderBy);

                        if (statusList.length > 0 ||
                            sceneIdList.length > 0 ||
                            interests.length > 0 ||
                            salesMan.length > 0 ||
                            searchTags.length > 0 ||
                            searchCollect) {
                            $scope.hasFilterCondition = true;
                        }

                        $scope.getRegBookUserList(1, pageSize, 1, queryType, statusList, templateIdList, sceneIdList, interests, salesMan, searchTags, searchCollect, orderByField, orderBy).then(function (result) {
                            if (result.status == 1) {
                                if (!$rootScope.isFirstLoad) {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1833);
                                } else {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                    }, 1000);
                                }
                                $timeout(function () {
                                    $scope.hasregDone = true;
                                }, 500);
                                
                            } else {
                                if (!$rootScope.isFirstLoad) {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }, 1833);
                                } else {
                                    $timeout(function () {
                                        $(".lockMask-loading2").hide();
                                        $rootScope.isFirstLoad = true;
                                        promptBarService.showErrorBar(result.message, 3000);
                                    }, 1000);
                                }
                                $scope.hasregDone = false;
                            }
                        }, null);
                        //$scope.getNewUserNum();

                        //获取分配权限

                        //判断分配咨询权限
                        $scope.userSaleLevel = false;
                        //判断群发短信权限
                        $scope.userMsgLevel = false;
                        //判断快速新增权限
                        $scope.userAddLevel = false;
                        //判断销售人员权限
                        $scope.salesManLevel = false;
                        if ($scope.erpUserInfo) {
                            if (($scope.erpUserInfo.Level == 0) || ($scope.erpUserInfo.Level == 1) || ($scope.erpUserInfo.Level == 4) || ($scope.erpUserInfo.Level == 6)) {
                                $scope.userSaleLevel = true;
                            }
                            if (($scope.erpUserInfo.Level == 0) || ($scope.erpUserInfo.Level == 1) || ($scope.erpUserInfo.Level == 4) || ($scope.erpUserInfo.Level == 5) || ($scope.erpUserInfo.Level == 6) || ($scope.erpUserInfo.Level == 9)) {
                                $scope.userMsgLevel = true;
                                $scope.userAddLevel = true;
                            }
                            if ($scope.erpUserInfo.Level == 9) {
                                $scope.salesManLevel = true;
                            }
                            $scope.ErpUserInfo = $scope.erpUserInfo;
                        }

                        $scope.getSaleMan();
                        $scope.GetRegistrationBookSceneList(1, filterPageSize);
                    };
                    $scope.init();

                }
            ]);
    });