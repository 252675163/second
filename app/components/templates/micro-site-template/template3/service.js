

define(['ionic'], function () {
    return angular.module('MicroTemplate3.service', []).
        factory('microTemplate3Service', ['$http', function ($http) {

            var microTemplate3Service = {};
            microTemplate3Service.model = {
                imgUrl: "/app/img/temp3_img.png",
                title: "琴行简介",
                content:"松鼠琴行专业从事少儿音乐教学培训多年，拥有良好的学习环境和轻松的学习氛围，能让每一位学员在学习过程中感受音乐的乐趣。\n琴行聘请来自国内外音乐学院的优秀教师，开设一对一，一对二以及小班课程，覆盖少儿吉他，钢琴，尤克里里，架子鼓，非洲鼓，箱鼓，贝司等各种乐器培训，还会定期组织学生汇演，音乐沙龙等活动。"
            }
            return microTemplate3Service
        }]);
})

