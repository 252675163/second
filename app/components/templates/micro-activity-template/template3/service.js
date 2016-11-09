

define(['ionic'], function () {
    return angular.module('microOldNewTemplate3.service', []).
        factory('microOldNewTemplate3', ['$http', function ($http) {

            var microOldNewTemplate3 = {};
            microOldNewTemplate3.model = {
                title: "活动介绍",
                content: "快带朋友一起来体验吧！\n成功邀请好友即可享受\n学费折扣优惠~\n新伙伴也有减免优惠哦~\n \n虽然我们是专业的学科教育\n我们也注重孩子的综合培养\n您的一次到场，将会感受到特别的不一样！\n \n上课时间：2016年3月13日\n上课地点：北京市瀑布南路\r\n12号向日葵教育西楼205教室"
            }
            return microOldNewTemplate3
        }]);
})

