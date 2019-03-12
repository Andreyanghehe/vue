<template>
  <div>
    <el-button type="info" @click="init" icon="el-icon-search" style="position: fixed; right: 20px; top: 10px">词语搜索</el-button>
    <el-dialog title="搜索" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="form">
        <el-form-item label="请输入汉字" :label-width="formLabelWidth" style="margin-top: 20px">
          <el-input v-model="form.word" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="search">确 定</el-button>
      </div>
    </el-dialog>
    <div
      ref="dv"
      :style="'height: '+ tableHeight + 'px; overflow-y: auto; position: absolute; top: 0; width: 100%; bottom: 0'">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="词语:">
                <span>{{ props.row.ci }}</span>
              </el-form-item>
              <el-form-item label="含义:">
                <el-button type="text" @click="dialogVisible = true">更多</el-button>
                <el-dialog
                  title="含义"
                  :visible.sync="dialogVisible"
                  width="60%">
                  <span>{{props.row.explanation}}</span>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                </el-dialog>
              </el-form-item>
              <el-form-item label="更多了解:">
                <a target="_blank" :href="'https://hanyu.baidu.com/zici/s?wd='+ props.row.ci" style="text-decoration: none; color: #409EFF">百度字词</a>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="词语"
          prop="ci">
        </el-table-column>
        <el-table-column
          label="含义"
          prop="explanation">
        </el-table-column>
      </el-table>
    </div>
    <div style="background-color: #fff; width: 100%; height: 50px; position: absolute; bottom: 0">
      <el-pagination
        :background="true"
        :small="true"
        style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'words',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        word: ''
      },
      formLabelWidth: '150px',
      tableHeight: document.documentElement.clientHeight - 130,
      scrollTop: 0
    }
  },
  methods: {
    init () {
      this.form.word = ''
      this.dialogFormVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.$store.commit('changeWordsPageSize', val)
      const temp = this.$store.state.wordsParams.temp
      const page = this.$store.state.wordsParams.page
      this.searchWords(temp, page, val)
      this.$refs.dv.scrollTop = 0
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$store.commit('changeWordsPage', val)
      const temp = this.$store.state.wordsParams.temp
      const pageSize = this.$store.state.wordsParams.pageSize
      this.searchWords(temp, val, pageSize)
      this.$refs.dv.scrollTop = 0
    },
    searchWords (temp, page, pageSize) {
      this.$http.get(`words?temp=${temp}&page=${page}&pageSize=${pageSize}`).then(res => {
        this.tableData = res.body.data
        this.total = res.body.total
        if (localStorage.getItem('history')) {
          const date = new Date()
          const params =
            {
              temp: temp,
              time: date.toLocaleString()
            }
          const arr = JSON.parse(localStorage.getItem('history'))
          arr.unshift(params)
          if (arr.length >= 10) {
            arr.pop()
          }
          localStorage.setItem('history', JSON.stringify(arr))
        } else {
          const date = new Date()
          const params = [
            {
              temp: temp,
              time: date.toLocaleString()
            }
          ]
          localStorage.setItem('history', JSON.stringify(params))
        }
      })
    },
    search () {
      const temp = this.form.word.trim()
      if (!/^[\u4e00-\u9fa5]+$/.test(temp)) {
        this.$message({
          showClose: true,
          message: '请输入汉字',
          type: 'error'
        })
      } else {
        this.dialogFormVisible = false
        const loading = this.$loading({
          target: this.$refs.dv,
          lock: true,
          text: '拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.searchWords(temp, this.page, this.pageSize)
        this.$store.commit('updateWordsParams', { temp: temp, page: this.page, pageSize: this.pageSize })
        loading.close()
      }
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
