<template>
  <div class="navbar">
    <span class="name-text">{{ name }}</span>

    <div class="right-menu">
      <!-- coin -->
      <div v-if="token" class="coin-text">
        $
        {{ coin }}
      </div>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 使用 el-avatar 显示首字母 -->
          <el-avatar size="small" class="user-avatar">{{ getFirstLetter(name) }}</el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'coin',
      'token'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    getFirstLetter(name) {
      // 获取用户名称的第一个字母
      return name ? name.charAt(0) : 'H'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .coin-text {
    min-width: 50px;
    margin-top: 5px;
    margin-right: 10px;
    height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #FFD700;
    background-color: #b4b4b4;
    /* 金色 */
    font-weight: bold;
    border-radius: 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    justify-content: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          /* 更改为圆形 */
          background-color: #b4b4b4;
          /* 设置背景色（可自定义） */
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          /* 文字颜色 */
          font-weight: bold;
          font-size: 18px;
          /* 文字大小 */
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.name-text {
  line-height: 50px;
  margin-left: 20px;
  color: rgba(0, 0, 0, .7);
}
</style>
