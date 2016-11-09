"use strict";
/**
 * author :zhouhuijuan
 * create time: 2016/9/20
 * description:咨询本日程
 */


define(["ionic", "services/net/registration-book", "services/net/activity-index", "services/net/templatesmodel"], function () {
    return angular.module("MicroRegistrationBookScheduleApp.services", ["services.net.registrationBook", "services.net.activityIndex", "services.net.templatesModel"])
        .service("MicroRegistrationBookScheduleAppService", [
            "$rootScope", "registrationBookNetService", "activityIndexNetService", "templatesModelService",
              function ($rootScope, registrationBookNetService, activityIndexNetService, templatesModelService) {
                  var service = {};

                  service.getScheduleList = function (pageIndex, pageSize, dTime) {
                      return registrationBookNetService.getScheduleList(pageIndex, pageSize, dTime);
                  };

                  service.getCommuRemindCount = function (startTime, endTime) {
                      return registrationBookNetService.getCommuRemindCount(startTime, endTime);
                  };

                  service.markAsRead = function (regUserId) {
                      return registrationBookNetService.markAsRead(regUserId);
                  };

                  //uiModel转化
                  service.parseBizModelToUiModel = function (bizModel) {
                      var scheduleModel = {
                          Id: 484904,
                          OrgId: 0,
                          StuName: "asdas啊",
                          MotherTel: "13499999999,,",
                          CommuId: 268986,
                          CommuContent: "阿达",
                          IsRemind: false,
                          RemindDate: "\/Date(-62135596800000)\/",
                          IsDone: false,
                          LessonClassModel: []
                      }
                      scheduleModel.Id = bizModel.Id;
                      scheduleModel.OrgId = bizModel.OrgId;
                      scheduleModel.StuName = bizModel.StuName;
                      scheduleModel.MotherTel = bizModel.MotherTel;
                      scheduleModel.CommuId = bizModel.CommuId;
                      scheduleModel.CommuContent = bizModel.CommuContent;
                      if (!angular.equals(scheduleModel.CommuContent, null)) {
                          scheduleModel.CommuContent = scheduleModel.CommuContent.replace("<br />", " ");
                      }
                      scheduleModel.IsRemind = bizModel.IsRemind;
                      scheduleModel.RemindDate = bizModel.RemindDate;
                      scheduleModel.IsDone = bizModel.IsDone;
                      if (!angular.equals(bizModel.LessonClassName, null)) {
                          scheduleModel.LessonClassModel.push(bizModel.LessonClassName);
                      }
                      if (!angular.equals(bizModel.SecondLessonClassName, null)) {
                          scheduleModel.LessonClassModel.push(bizModel.SecondLessonClassName);
                      }
                      if (!angular.equals(bizModel.ThirdLessonClassName, null)) {
                          scheduleModel.LessonClassModel.push(bizModel.ThirdLessonClassName);
                      }
                      return scheduleModel;
                  }

                  return service;
              }
        ]);
});