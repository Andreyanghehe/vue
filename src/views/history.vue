<template>
  <div>
    <el-button @click="deleteHistory" type="danger" icon="el-icon-delete" style="position: fixed; right: 20px; top: 60px; z-index: 2020">清空历史记录</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="temp"
        label="历史记录"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.tableData = JSON.parse(localStorage.getItem('history'))
  },
  methods: {
    deleteHistory () {
      this.$confirm('此操作将永久清空历史记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        localStorage.removeItem('history')
        this.tableData = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
