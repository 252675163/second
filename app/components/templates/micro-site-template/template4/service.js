

define(["ionic"], function() {
    return angular.module("MicroTemplate4.service", []).
        factory("microTemplate4Service", [
            "$http", function($http) {

                var microTemplate4Service = {};
                microTemplate4Service.model = {
                    title: "松鼠琴行",
                    content: "音乐源于生活，快乐在于分享",
                    content2: "松鼠琴行是一所专业的少儿音乐培训机构，成立于2007年。 由于教学质量好，如今每年就读学生超过1万人次，拥有一支逾100名优秀教师的师资队伍，校区遍布杭州、上海、南京、苏州等城市。每个校区都有专业的吉他琴房，声乐琴房及几十间教学练琴用的钢琴琴房。所有琴房全部配备空调以保证在炎热的夏季教学的顺利进行，教室教学设施完善环境幽雅安静，并配备教学用琴，方便学生上课，同时琴房对外开放，方便学生练琴。"
                };
                return microTemplate4Service;
            }
        ]);
})