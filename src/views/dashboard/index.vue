<template>
  <div class="dashboard-container">
    <!-- 搜索框 -->
    <el-input
      v-model="device_serial_number"
      class="add-item-input"
      placeholder="请输入设备序列号"
      clearable
      style="margin-bottom: 20px; width: 300px;"
    >
      <template #append>
        <el-button size="small" type="primary" @click="addDevice">添加</el-button>
      </template>
    </el-input>

    <!-- 设备列表 -->
    <div class="table-box">
      <el-table :data="filteredDevices" style="width: 100%">
        <el-table-column prop="device_name" label="设备名称" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.device_name || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="device_type" label="产品类型" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.device_type || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="device_serial_number" label="序列号" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.device_serial_number || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="device_model_number" label="销售型号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.device_model_number || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="device_udid" label="设备标识UID" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.device_udid || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="device_activation" label="激活状态" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.device_activation || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="coin" label="金币" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.coin || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at || '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <el-pagination
      v-if="totalItems > pageSize"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      device_serial_number: '', // 搜索框的设备序列号
      currentPage: 1, // 当前页
      pageSize: 15, // 每页显示设备数量
      filteredDevices: [], // 过滤后的设备数据
      totalItems: 0, // 设备数据总数
      last_page: 0 // 总页数
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'devicesList'
    ])
  },
  mounted() {
    this.getDevicesList(this.currentPage, this.pageSize)
  },
  methods: {
    // 获取设备列表数据
    getDevicesList(page, pageSize) {
      this.$store.dispatch('user/getDevicesList', { page, pageSize }).then((res) => {
        console.log('devicesList', res.data)
        this.filteredDevices = res.data || [] // 获取到的设备数据赋值给 filteredDevices
        this.totalItems = res.meta.total || 0 // 获取总数据量
        this.last_page = res.meta.last_page || 0 // 获取总页数
      }).catch(() => {
        this.loading = false
      })
    },

    // 处理分页页码变化
    handlePageChange(page) {
      this.currentPage = page // 更新当前页
      this.getDevicesList(page, this.pageSize) // 根据当前页获取设备列表
    },

    addDevice() {
      this.$store.dispatch('user/addDevice', { device_serial_number: this.device_serial_number }).then((res) => {
        this.getDevicesList(this.currentPage, this.pageSize)
      }).catch(() => {
        alert('添加失败')
      })
    }
  }
}
</script>

<style scoped>

.dashboard-container {
  margin: 20px;
  /* padding-top: 150px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.table-box {
  min-width: 800px;
  max-width: 1800px;
  width: auto;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;
}

.dashboard-text {
  font-size: 30px;
  line-height: 46px;
}
.add-item-input{
  margin-bottom: 20px;
}
</style>
