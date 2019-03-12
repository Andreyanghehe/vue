<template>
  <div>
    <el-button type="info" @click="init" icon="el-icon-search" style="position: fixed; right: 20px; top: 10px">成语搜索</el-button>
    <el-dialog title="搜索" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="form">
        <el-radio v-model="radio" label="1">汉字</el-radio>
        <el-radio v-model="radio" label="4">拼音或首字母</el-radio>
        <el-form-item label="请输入要搜索的内容" :label-width="formLabelWidth" style="margin-top: 20px">
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
              <el-form-item label="成语:">
                <span>{{ props.row.word }}</span>
              </el-form-item>
              <el-form-item label="读音:">
                <span>{{ props.row.pinyin }}</span>
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
              <el-form-item label="出处:">
                <el-button type="text" @click="dialogVisible1 = true">更多</el-button>
                <el-dialog
                  title="出处"
                  :visible.sync="dialogVisible1"
                  width="60%">
                  <span>{{props.row.derivation}}</span>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
                </span>
                </el-dialog>
              </el-form-item>
              <el-form-item label="例子:">
                <el-button type="text" @click="dialogVisible2 = true">更多</el-button>
                <el-dialog
                  title="例子"
                  :visible.sync="dialogVisible2"
                  width="60%">
                  <span>{{props.row.example}}</span>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                </span>
                </el-dialog>
              </el-form-item>
              <el-form-item label="更多了解:">
                <a target="_blank" :href="'https://baike.baidu.com/item/'+ props.row.word" style="text-decoration: none; color: #409EFF">百度字词</a>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="成语"
          prop="word">
        </el-table-column>
        <el-table-column
          label="读音"
          prop="pinyin">
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
  name: 'idiom',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        word: ''
      },
      radio: '1',
      formLabelWidth: '150px',
      tableHeight: document.documentElement.clientHeight - 130,
      scrollTop: 0
    }
  },
  methods: {
    init () {
      this.form.word = ''
      this.radio = '0'
      this.dialogFormVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.$store.commit('changeIdiomPageSize', val)
      const id = this.$store.state.idiomParams.id
      const temp = this.$store.state.idiomParams.temp
      const page = this.$store.state.idiomParams.page
      this.searchIdiom(id, temp, page, val)
      this.$refs.dv.scrollTop = 0
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$store.commit('changeIdiomPage', val)
      const id = this.$store.state.idiomParams.id
      const temp = this.$store.state.idiomParams.temp
      const pageSize = this.$store.state.idiomParams.pageSize
      this.searchIdiom(id, temp, val, pageSize)
      this.$refs.dv.scrollTop = 0
    },
    searchIdiom (id, temp, page, pageSize) {
      this.$http.get(`idiom?id=${id}&temp=${temp}&page=${page}&pageSize=${pageSize}`).then(res => {
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
      switch (this.radio) {
        case '1':
          if (!/^[\u4e00-\u9fa5]+$/.test(temp)) {
            this.$message({
              showClose: true,
              message: '请输入成语',
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
            this.searchIdiom(1, temp, this.page, this.pageSize)
            this.$store.commit('updateIdiomParams', { id: 1, temp: temp, page: this.page, pageSize: this.pageSize })
            loading.close()
          } break
        case '4':
          if (!/^[a-zA-Z]+$/.test(temp)) {
            this.$message({
              showClose: true,
              message: '请输入成语拼音或首字母',
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
            this.searchIdiom(4, temp, this.page, this.pageSize)
            this.$store.commit('updateIdiomParams', { id: 4, temp: temp, page: this.page, pageSize: this.pageSize })
            loading.close()
          } break
        case '0':
          this.$message({
            showClose: true,
            message: '请选择搜索方式',
            type: 'error'
          }); break
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
