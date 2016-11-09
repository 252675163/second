/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('Template6_2.Service', []).
        factory('template6_2Service', ['$http', function ($http) {

            var service = {};
            service.model =
            {


                description: "    距离现在已很遥远的1620年，一群备受英国本土宗教残害的清教徒们，拼尽全力逃离到了美洲生活。但是这个严冬，他们时常吃不饱穿不暖，饥寒交迫。还好此时，当地的印第安人施以援手，为他们带来了丰富的食物，帮助他们顺利过冬。\n" +
                "    为了感谢印第安人的热情款待，他们欢聚一堂在黎明时鸣放礼炮，列队向上帝表达谢意，然后点起篝火举行盛大宴会，将火鸡制成美味款待印第安人。第二天和第三天又举行了摔跤、赛跑、唱歌、跳舞等活动 。\n" +
                "    就这样，第一个感恩节（Thanksgiving Day），就这样诞生了。\n" +
                "    这个美国人民独创的古老节日，由于祥和美好的寓意，一直流传至今。",
                imageUrl: [window.resourceDoMain+'/app/img/acty10_pic1.jpg']
            }
            return service

        }]);
})