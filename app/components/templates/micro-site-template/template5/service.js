/**
 * Created by dayday on 2015/9/11.
 */
define(['ionic'], function () {
    return angular.module('MicroTemplate5.Service', []).
        factory('microTemplate5Service', ['$http', function ($http) {

            var microtemplate5service = {};
            microtemplate5service.model =
            {
                title:"新鲜活动",
                actionName:"钢琴保养讲座",
                description:"钢琴靠墙放置时，需于墙放置一定的距离。立工钢琴不少于10cm，三角钢琴不少于30cm，这样能使钢琴具有良好的通风环境。\n钢琴使用完毕后，要将钢琴全部关闭，并用合适的琴套盖好，防止灰尘侵入。清洁钢琴时应要用柔软棉布或软毛刷清除灰尘，再用软布小心擦拭。\n对于外壳上的铜质金属件，可用软布蘸少许汽车蜡或亮光剂擦拭，避免金属件因放置时间太长而氧化发黑。",
            }
            return microtemplate5service

        }]);
})