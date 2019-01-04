module.exports = class extends think.Controller {
  async __before() {
    const accessArr = await this.session('access_url') || []
    const userNum = await this.session('userNum')   || undefined
    let flag = 0
    if (userNum == undefined || accessArr == []) {
        if (this.ctx.path === '/api/login/login' || this.ctx.path === '/api/login/get_info' ||this.ctx.path === '/api/login/logout') {
          return true
      } else {
        this.ctx.status = 401
        this.ctx.body = "无权限访问"
        return false
      }
    }else{
      const path = this.ctx.path
      
        accessArr.forEach(element => {         //循环access数组判断该用户里面是否有访问该路径权限
          if (element === path) {
            flag = 1
          }
        })
        if (flag == 1) {            // 有权限即放行
        } else {                    //无权限返回401
          this.ctx.status = 401
          this.ctx.body = "无权限访问"
          return false
        }
    }

  }
};
