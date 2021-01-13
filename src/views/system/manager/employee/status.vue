<template>
  <div style="cursor: pointer">
    <el-switch
        style="display: block"
        v-model="type"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="启用"
        inactive-text="禁用"
        active-value="1"
        inactive-value="0"
        @click.native="handleClick"
        >
    </el-switch>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    // 本行的所有数据，此字段不需要额外配置
    scope: {
      default: null
    }
  },
  computed: {
    type () {
      return this.value
    }
  },
   mounted () {
    console.log(this.scope)
  },
  methods: {
    handleClick () {
        console.log(this.scope);
    //   this.$emit('input', this.value == 1 ? 0 : 1 )
    }
  }
}
</script>