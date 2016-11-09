"use strict";
/**
 * author :小潘
 * time: 2015年9月9日 20:59:58
 * description:
 */

define(["ionic", "modules/micro-activity-oldandnew-edit-app/services"],
    function () {
        return angular.module("MicroActivityOldAndNewEditApp.controllers", ["MicroActivityOldAndNewEditApp.services"])
            .controller("MicroActivityOldAndNewEditAppController", [
                "$scope", "$rootScope", "$timeout", "MicroActivityOldAndNewEditAppService", "webSite", "$ionicPopup", "$sce", "uploadImgService", "promptBarService", "maskService", "activityBusinessService", "userTermsService", "singleThreadedNetService",
                function ($scope, $rootScope, $timeout, microActivityOldAndNewEditAppService, webSite, $ionicPopup, $sce, uploadImgService, promptBarService, maskService, activityBusinessService, userTermsService, singleThreadedNetService) {
                    $scope.isShowError = false;
                    $scope.isOpenChangeBack = false;
                    $scope.isShowEdit = false;
                    //免责声明弹窗
                    $scope.isShowDisclaimerBox = false;
                    var disclaimerBoxConfigKey = "isShowDisclaimerBox";
                    $scope.showEdit = function (event) {
                        if (!($scope.editPermissions.addPage || $scope.editPermissions.deletePage || $scope.editPermissions.replaceMusic)) {
                            return;
                        }
                        event.stopPropagation();
                        if (!$scope.isShowEdit) {
                            $(".has-footer_cover").one("click", function () {
                                $timeout(function () {
                                    $scope.isShowEdit = false;
                                }, 0);
                            });
                            $scope.isShowEdit = true;
                        } else {
                            $scope.isShowEdit = false;
                        }
                    };


                    //打开模板模型
                    $scope.addPage = function () {
                        if (($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.length >= 10) || (!$scope.editPermissions.addPage)) {
                            return;
                        }
                        $rootScope.$state.go("activity.oldandnewadd", {
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            activityType: $scope.activityType
                        }, { inherit: false });
                    };
                    //打开音乐模型
                    $scope.changeAudio = function () {
                        if (!$scope.editPermissions.replaceMusic) {
                            return;
                        }
                        $rootScope.$state.go("activity.oldandnewaudio", {
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            activityType: $scope.activityType
                        }, { inherit: false });
                    };

                    //删除页面
                    $scope.delCurrentPage = function () {
                        //todo
                        if ((!$scope.editPermissions.deletePage) || ($scope.sectionIndexListForShow.length == 1)) {
                            return;
                        }

                        if ($scope.sectionIndexListForShow.length == 1) {
                            var alertPopup = $ionicPopup.alert({
                                title: "提醒",
                                template: "不能删"
                            });
                        } else {
                            var confirmPopup = $ionicPopup.confirm({
                                template: "确认删除该页面?",
                                cancelText: "取消",
                                okText: "确认"
                            });
                            confirmPopup.then(function (res) {
                                $scope.isShowEdit = false;
                                if (res) {
                                    $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections.splice($scope.siteModel.currentSectionIndex, 1);
                                    if ($scope.siteModel.currentSectionIndex == $scope.sectionIndexListForShow[0]) {
                                        var nextCurrentSectionIndex = getNextCurrentSectionIndex();
                                        if ($scope.siteModel.currentSectionIndex == nextCurrentSectionIndex - 1) {
                                            $scope.siteModel.templateRender = Date.now();
                                        } else {
                                            $scope.siteModel.currentSectionIndex = nextCurrentSectionIndex - 1;
                                        }
                                        //重置模板

                                    } else {
                                        //todo
                                        var previousCurrentSectionIndex = getPreviousCurrentSectionIndex();
                                        //展示删除页的前一页
                                        $scope.siteModel.currentSectionIndex = previousCurrentSectionIndex;
                                    }
                                    //更新显示的section索引列表
                                    resetSectionIndexListForShow();

                                    //更新当前页的编辑权限
                                    $scope.updateEditPermissions();
                                }
                            });
                        }
                    };

                    //预览模块跳转
                    $scope.preview = function () {
                        if (!$scope.editPermissions.preview) {
                            return;
                        }
                        //表单唯一校验
                        var isHaveForm = $scope.siteModel.pages[0].sections.some(function (section) {
                            //老数据处理
                            if (!section.type) {
                                return true;
                            } else {
                                return section.type == 3;
                            }
                        });
                        if (!isHaveForm) {
                            promptBarService.showErrorBar("至少需要一张表单！", 3000);
                            return;
                        }

                        $rootScope.$state.go("activity.oldandnewpreview", {
                            id: $scope.$stateParams.id,
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            isHold: $scope.$stateParams.isHold
                        }, { inherit: false });
                    };
                    //感恩节是否有表单页的校验
                    var isHaveForm = function () {
                        if ($scope.$stateParams.templateId == 6) {
                            //var count = 0;
                            for (var i = 0; i < $scope.siteModel.pages[0].sections.length; i++) {
                                if ($scope.siteModel.pages[0].sections[i].templateName == "template6by7") {
                                    return true;
                                }
                            }
                            promptBarService.showErrorBar("至少有一个表单", 3000);
                            return false;
                        } else {
                            return true;
                        }
                    };


                    //新增功能：暂存  by xp 2015年10月27日 16:16:02
                    $scope.save = singleThreadedNetService(function () {
                        if (!$scope.editPermissions.save) {
                            return;
                        }
                        var isHaveForm = $scope.siteModel.pages[0].sections.some(function (section) {
                            //老数据处理
                            if (!section.type) {
                                return true;
                            } else {
                                return section.type == 3;
                            }
                        });
                        if (!isHaveForm) {
                            promptBarService.showErrorBar("至少需要一张表单！", 3000);
                            return;
                        }
                        var data = microActivityOldAndNewEditAppService.uiModelToBizModel($scope.siteModel, $scope.userId, $scope.$stateParams.templateId, $scope.$stateParams.activityId, $scope.templateCode, $scope.activityOtherConfig, $scope.schoolPalOrgUserId);

                        return microActivityOldAndNewEditAppService.save(data).success(function (result) {
                            if (result == "<input type='hidden' id='ErrorCode' value='497' />") {
                                window.location.href = "/Common/error?mark=MicroActivityOldAndNewEditAppController_save_save_result_Equal_497";
                                return;
                            }
                            if (result.error === 1) {
                                promptBarService.showErrorBar("存在敏感词！请重新编辑", 3000);
                            }//鉴权
                            else if (result.error === 1000) {
                                promptBarService.showErrorBar(result.message, 3000);
                            } else {
                                $scope.$stateParams.activityId = result.data.Id;
                                $scope.userId = result.data.UserId;
                                $scope.schoolPalOrgUserId = result.data.SchoolPalOrgUserId;
                                $scope.$stateParams.isHold = "";
                                promptBarService.showSuccessBar("暂存成功！", 2000);
                            }

                        });
                    });
                    //得到下一页的索引值，没有上一页返回 -1
                    function getNextCurrentSectionIndex() {
                        if ($scope.sectionIndexListForShow[$scope.sectionIndexListForShow.length - 1] <= $scope.siteModel.currentSectionIndex) {
                            return -1;
                        } else {
                            for (var i = 0; i < $scope.sectionIndexListForShow.length; i++) {
                                if ($scope.sectionIndexListForShow[i] == $scope.siteModel.currentSectionIndex) {
                                    return $scope.sectionIndexListForShow[i + 1];
                                }
                            }
                        }
                    }

                    //得到上一页的索引值,没有上一页返回 -1
                    function getPreviousCurrentSectionIndex() {
                        if ($scope.sectionIndexListForShow[0] >= $scope.siteModel.currentSectionIndex) {
                            return -1;
                        } else {
                            for (var i = 0; i < $scope.sectionIndexListForShow.length; i++) {
                                if ($scope.sectionIndexListForShow[i] == $scope.siteModel.currentSectionIndex) {
                                    return $scope.sectionIndexListForShow[i - 1];
                                }
                            }
                        }
                    }

                    //点击上一页按钮
                    $scope.upIcon = function () {
                        var previousCurrentSectionIndex = getPreviousCurrentSectionIndex();
                        if (previousCurrentSectionIndex == -1) {
                            return;
                        } else {
                            $scope.siteModel.currentSectionIndex = previousCurrentSectionIndex;
                            $scope.updateEditPermissions();
                        }


                    };

                    //点击下一页按钮
                    $scope.downIcon = function () {
                        var nextCurrentSectionIndex = getNextCurrentSectionIndex();
                        if (nextCurrentSectionIndex == -1) {
                            return;
                        } else {
                            $scope.siteModel.currentSectionIndex = nextCurrentSectionIndex;
                            $scope.updateEditPermissions();
                        }
                    };
                    $scope.OpenLockMark = function () {
                        $scope.isOpenChangeBack = !$scope.isOpenChangeBack;
                    };
                    //自定义背景 begin
                    $scope.changeBackGroundByMyself = function (e) {

                        uploadImgService.upLoadImg(microActivityOldAndNewEditAppService.getImgConfig(), 1, $scope.changeBackGroundFinish, $scope.cancelFunction);

                    };
                    $scope.cancelFunction = function () {
                        $timeout(function () {
                            $scope.$apply(function () {
                                $scope.isOpenChangeBack = false;
                            });

                        });
                    };
                    $scope.changeBackGroundFinish = function (url) {
                        $timeout(function () {
                            $scope.$apply(function () {
                                $scope.isOpenChangeBack = false;
                                $scope.isOpenChangeBack = false;
                                $scope.isShowEdit = false;
                                $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].backgroundImage = url;

                            });
                        });
                    };
                    $scope.changeBackGround = function () {
                        $scope.isOpenChangeBack = false;
                        $scope.isShowEdit = false;
                        $rootScope.$state.go("activity.oldandnewback", {
                            templateId: $scope.$stateParams.templateId,
                            activityId: $scope.$stateParams.activityId,
                            activityType: $scope.activityType
                        }, { inherit: false });
                    };
                    var init = function () {
                        microActivityOldAndNewEditAppService.getUserConfig(disclaimerBoxConfigKey).success(function (result) {
                            if (result.status == 1) {
                                $scope.isShowDisclaimerBox = result.data.ConfigValue == "false" ? false : true;
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        });
                        $scope.userId = 0;
                        if (webSite) {
                            $scope.userId = webSite.UserId || 0;
                            $scope.schoolPalOrgUserId = webSite.SchoolPalOrgUserId || 0;
                            $scope.activityType = webSite.ActivityType || 0;
                            $scope.templateCode = webSite.TemplateCode;
                            $scope.isActived = webSite.IsActived || false;//该活动是否有人助力过，是否有人报名过--普通模板该字段无效
                            $scope.templateExtConfig = activityBusinessService.parseJsonToObjForTemplateExtConfig(webSite.UiConfig);
                        }
                        var activityExtConfig = {};
                        try {
                            activityExtConfig = JSON.parse(webSite.ExtConfig);
                        } catch (err) {
                            activityExtConfig = {};
                        }

                        if (!($scope.$stateParams.isHold)) {
                            if (!angular.isUndefined(webSite) && !angular.isUndefined(webSite.Config) && webSite.Config) {
                                //modelToUiModel by yinglechao 2016.6.6
                                $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse(webSite.Config));
                                //新建微活动templateModel扩展
                                if (angular.isUndefined($scope.$stateParams.activityId) && !$scope.$stateParams.activityId) {
                                    activityBusinessService.extendActivityTemplateModel($scope.siteModel, webSite.TemplateModelExtConfig);
                                }
                                //重置在Edit状态显示的section索引值列表
                                resetSectionIndexListForShow();
                                $scope.siteModel.currentSectionIndex = $scope.sectionIndexListForShow[0];

                                //2016.6.27 可由指令修改的场景配置信息 里面的字段对应数据库中的字段
                                $scope.activityOtherConfig = {
                                    activityExtConfig: activityExtConfig,//场景(活动)扩展配置信息
                                    endDate: webSite.EndDate//场景(活动)截止日
                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=MicroActivityOldAndNewEditAppController_init_isHold_webSite.Config_isUndefined";
                            }

                        } else {
                            //重置在Edit状态显示的section索引值列表
                            resetSectionIndexListForShow();
                        }

                        if (!$scope.siteModel) {
                            if (!angular.isUndefined(webSite) && !angular.isUndefined(webSite.Config) && webSite.Config) {
                                //$scope.siteModel = JSON.parse(webSite.Config);
                                //modelToUiModel by yinglechao 2016.6.6
                                $scope.siteModel = activityBusinessService.siteModelToUiSiteModel(JSON.parse(webSite.Config));
                                //新建微活动templateModel扩展
                                if (angular.isUndefined($scope.$stateParams.activityId) && !$scope.$stateParams.activityId) {
                                    activityBusinessService.extendActivityTemplateModel($scope.siteModel, webSite.TemplateModelExtConfig);
                                }
                                //重置在Edit状态显示的section索引值列表
                                resetSectionIndexListForShow();
                                $scope.siteModel.currentSectionIndex = $scope.sectionIndexListForShow[0];
                                //2016.6.27 可由指令修改的场景配置信息 里面的字段对应数据库中的字段\

                                $scope.activityOtherConfig = {
                                    activityExtConfig: activityExtConfig,//场景(活动)扩展配置信息
                                    endDate: webSite.EndDate//场景(活动)截止日
                                }
                            } else {
                                // 报错页面，非法进入页面
                                window.location.href = "/Common/error?mark=MicroActivityOldAndNewEditAppController_init_siteModel_webSite.Config_isUndefined";
                            }
                        }


                        //根据$scope.siteModel 渲染编辑的权限  编辑权限这一块可抽出
                        if ($scope.siteModel.editPermissions) {
                            //兼容老数据
                            if ($scope.siteModel.editPermissions == 1) {
                                $scope.editPermissionsByPage = {
                                    addPage: false, //加页
                                    deletePage: true, //删页
                                    replaceMusic: true, //更改音乐
                                    replaceBackground: false, //更改背景
                                    save: true,
                                    preview: true
                                };
                            } else {
                                //是一个editPermissions对象
                                $scope.editPermissionsByPage = {
                                    addPage: angular.isUndefined($scope.siteModel.editPermissions.addPage) ? true : $scope.siteModel.editPermissions.addPage, //加页
                                    deletePage: angular.isUndefined($scope.siteModel.editPermissions.deletePage) ? true : $scope.siteModel.editPermissions.deletePage, //删页
                                    replaceMusic: angular.isUndefined($scope.siteModel.editPermissions.replaceMusic) ? true : $scope.siteModel.editPermissions.replaceMusic, //更改音乐
                                    replaceBackground: angular.isUndefined($scope.siteModel.editPermissions.replaceBackground) ? true : $scope.siteModel.editPermissions.replaceBackground, //更改背景
                                    save: angular.isUndefined($scope.siteModel.editPermissions.save) ? true : $scope.siteModel.editPermissions.save,
                                    preview: angular.isUndefined($scope.siteModel.editPermissions.preview) ? true : $scope.siteModel.editPermissions.preview
                                };

                            }
                            $scope.editPermissions = angular.copy($scope.editPermissionsByPage);

                        } else {
                            $scope.editPermissionsByPage = {
                                addPage: true,
                                deletePage: true,
                                replaceMusic: true,
                                replaceBackground: true,
                                save: true,
                                preview: true
                            };
                        }
                        $scope.updateEditPermissions();


                        //hack安卓手机不隐藏菜单栏问题，再次隐藏微信菜单栏 by xp
                        if (ionic.Platform.isAndroid()) {
                            window.wx && window.wx.hideOptionMenu();
                        }

                    };

                    function resetSectionIndexListForShow() {
                        //在edit状态显示的section索引值列表  2016.5.24 todo
                        $scope.sectionIndexListForShow = [];
                        //重置 $scope.sectionIndexListForShow
                        if (!$scope.siteModel) {
                            return;
                        }
                        angular.forEach($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections, function (section, sectionIndex) {
                            if (section.isHideInEdit !== true) {
                                $scope.sectionIndexListForShow.push(sectionIndex);
                            }
                        });
                    }


                    //根据page和section的编辑权限更新编辑权限
                    $scope.updateEditPermissions = function () {
                        //如果Section存在权限对象
                        if ($scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].editPermissions) {
                            var editPermissionsBySection = $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections[$scope.siteModel.currentSectionIndex].editPermissions;
                            $scope.editPermissions = {
                                addPage: $scope.editPermissionsByPage.addPage,
                                deletePage: $scope.editPermissionsByPage.deletePage && editPermissionsBySection.deletePage,
                                replaceMusic: $scope.editPermissionsByPage.replaceMusic,
                                replaceBackground: $scope.editPermissionsByPage.replaceBackground && editPermissionsBySection.replaceBackground,
                                save: $scope.editPermissionsByPage.save,
                                preview: $scope.editPermissionsByPage.preview
                            };
                        } else {
                            $scope.editPermissions = angular.copy($scope.editPermissionsByPage);
                        }
                    };
                    init();


                    //event fun

                    //向上翻页
                    $scope.onSwipeUp = function (event) {
                        $scope.downIcon();
                    };

                    //向下翻页
                    $scope.onSwipeDown = function (event) {
                        $scope.upIcon();
                    };
                    $scope.$on("$stateChangeStart", function (event, toState) {
                        //用于删除框没点击时跳转到别的页面关闭
                        if ($ionicPopup._popupStack[0] != undefined) {
                            $ionicPopup._popupStack[0].responseDeferred.promise.close();
                        }
                        if (toState.name.indexOf("activity") !== -1) {
                            event.targetScope.siteModel = angular.copy($scope.siteModel);
                            event.targetScope.activityOtherConfig = angular.copy($scope.activityOtherConfig);


                        } else {
                            $scope.siteModel = null;
                            $scope.activityOtherConfig = null;

                        }
                    });

                    //
                    $scope.getSiteModelShowLength = function () {
                        var sections = $scope.siteModel.pages[$scope.siteModel.currentPageIndex].sections;
                        var length = sections.length;
                        var hideInEditList = sections.filter(function (obj) {
                            return obj.isHideInEdit;
                        });
                        return length - hideInEditList.length;
                    };
                    //显示用户条款弹窗
                    $scope.showUserTerms = function () {
                        userTermsService.showUserTerms();
                    }
                    //关闭免责声明弹窗
                    $scope.hideDisclaimerBox = function () {
                        $scope.isShowDisclaimerBox = false;
                        microActivityOldAndNewEditAppService.updateUserConfig(disclaimerBoxConfigKey, "false").success(function (result) {
                            if (result.status == 1) {
                            }
                            else {
                                promptBarService.showErrorBar(result.message, 3000);
                            }
                        })
                    }
                }
            ]);
    });