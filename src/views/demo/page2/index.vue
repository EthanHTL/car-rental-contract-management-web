<template>
  <d2-container>
    <template slot="header">区域划分</template>
    <div style="height: 400px; margin: -16px">
      <SplitPane :min-percent="20" :default-percent="30" split="vertical">
        <template slot="paneL">
          <div style="margin: 10px">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            >
            </el-tree>
          </div>
        </template>
        <template slot="paneR">
          <SplitPane split="horizontal">
            <template slot="paneL"
              ><div style="margin: 10px">右上</div></template
            >
            <template slot="paneR"
              ><div style="margin: 10px">右下</div></template
            >
          </SplitPane>
        </template>
      </SplitPane>
    </div>
  </d2-container>
</template>

<script>
import Vue from "vue";
import SplitPane from "vue-splitpane";
Vue.component("SplitPane", SplitPane);
export default {
  name: "page2",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
};
</script>
