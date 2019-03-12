<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="temp"
      label="已标记"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间"
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'mark',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.tableData = JSON.parse(localStorage.getItem('history'))
  }
}
</script>

<style scoped>

</style>
