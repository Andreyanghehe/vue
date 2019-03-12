<template>
  <div id="app">
    <div class="home">
      <el-container>
        <el-aside width="120px" :style="'height: ' + h + 'px; border-right: solid 2px #e6e6e6; background-color:' + color">
          <el-menu
            :router="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :background-color="color"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="character">
              <i class="el-icon-document"></i>
              <span slot="title">汉字</span>
            </el-menu-item>
            <el-menu-item index="words">
              <i class="el-icon-document"></i>
              <span slot="title">词汇</span>
            </el-menu-item>
            <el-menu-item index="idiom">
              <i class="el-icon-document"></i>
              <span slot="title">成语</span>
            </el-menu-item>
            <el-menu-item index="allegorical">
              <i class="el-icon-document"></i>
              <span slot="title">歇后语</span>
            </el-menu-item>
            <el-menu-item index="history">
              <i class="el-icon-document"></i>
              <span slot="title">搜索历史</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header :style="'background-color:' + color ">
            <el-color-picker
              @change="changeColor"
              size="small"
              v-model="color"
              :show-alpha="false"
              :predefine="predefineColors">
            </el-color-picker>
            <span class="color">主体颜色</span>
            <h1>中华汉语词典</h1>
          </el-header>
          <el-main :style="'height: '+(h-60)+'px'"><router-view></router-view></el-main>
        </el-container>
      </el-container>
      <div style="position: fixed; right: 20px; bottom: 10px; text-align: center">
        <span>评分</span>
        <el-rate
          v-model="value"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
        <button @click="rate">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      value: null,
      h: document.documentElement.clientHeight,
      color: '#303133',
      predefineColors: [
        '#303133',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ]
    }
  },
  methods: {
    rate () {
      console.log(this.value)
      if (this.value === 0) {
        this.$notify({
          type: 'warning',
          duration: 2000,
          message: '请先评分再提交',
          position: 'bottom-right'
        })
        return
      }
      this.$notify({
        title: '评分成功',
        type: 'success',
        duration: 2000,
        message: '感谢您的评分!',
        position: 'bottom-right'
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeColor (e) {
      this.color = e
    }
  },
  watch: {
    resize () {
      window.onresize = () => {
        this.h = document.documentElement.clientHeight
      }
    }
  }
}
</script>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    position: relative;
    h1 {
      margin: 0;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    .el-color-picker__trigger {
      position: fixed;
      left: 150px;
      top: 14px;
    }
    .color {
      position: fixed;
      left: 185px;
      top: 0;
      color: #fff;
      font-size: 12px;
    }
  }
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu {
      border-right: none;
      li {
        text-align: left;
      }
    }
  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 16px;
    padding: 0 !important;
    position: relative;
  }
  .el-table {
    background-color: #fff;
  }
  .el-table .cell {
    white-space: nowrap !important;
  }
  .el-table__header-wrapper {
    position: fixed;
    left: 120px;
    top: 60px;
    z-index: 2000;
  }
  .el-table__body-wrapper {
    margin-top: 50px;
  }
  .el-dialog__wrapper {
    z-index: 2020!important;
  }
</style>
