<template>
  <div
    ref="container"
    :style="{ width: '400px', height: '350px' }"
    class="echarts-container"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
export default {
  name: "echarts",
  setup() {
    const container = ref(null);
    onMounted(() => {
      const chart = echarts.init(container.value);
      // 绘制图表
      chart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    });
    return {
      container,
    };
  },
};
</script>

<style lang="less" scoped>
.echarts-container {
  margin: 10px auto;
}
</style>