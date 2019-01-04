const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {

  }
  async loginAction() {
    const account = this.ctx.request.body.post.userName; // 获取账号
    const password = this.ctx.request.body.post.password; // 获取密码
    const status = this.ctx.request.body.post.status; // 获取身份
    try {
      let data;
      if (status === '学生') {
        const studentModel = this.model('student_v');
        data = await studentModel.where({ 'student_num': account }).select();
      } else {
        const teacherModel = this.model('teacher_v');
        data = await teacherModel.where({ 'teacher_num': account }).select();
      }
      if (think.isEmpty(data) || data[0].state === '禁用') {
        return this.ctx.status = 500;
      } else {
        if (password == data[0].password) {
          this.body = { 'token': account, status };
        } else {
          return this.ctx.status = 500;
        }
      }
    } catch (error) {
      return this.ctx.status = 500;
    }
  }
  async get_infoAction() {
    const token = this.ctx.query.token; // token里存的是teacher_num 或者student_num
    const status = this.ctx.query.status;
    const user_role_access_v_Model = this.model('user_role_access_v');// 用于查询用户权限
    const user_role_v_Model = this.model('user_role_v'); // 用于查询用户角色
    let userData;
    if (status === '学生') {
      const studentModel = this.model('student_v'); // student表模型
      userData = await studentModel.where({ 'student_num': token }).select();
    } else {
      const teacherModel = this.model('teacher_v');
      userData = await teacherModel.where({ 'teacher_num': token }).select();
    }
    const urlData = await user_role_access_v_Model.where({ 'user_id': userData[0]['user_id'] }).select();
    const roleData = await user_role_v_Model.where({ 'user_id': userData[0]['user_id'] }).select();
    if (think.isEmpty(urlData)) {
      return this.ctx.status = 500;
    } else {
      const role = []; // 该用户的角色数组，该系统设置学生只有学生一个角色
      const access_url = []; // 可以访问的url权限
      roleData.forEach(element => {
        role.push(element.role_name);
      });
      urlData.forEach(element => {
        access_url.push(element.access_url);
      });
      this.body = {
        code: 200,
        access: role,
        avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
        user_id: userData[0]['student_num'] || userData[0]['teacher_num'],
        user_name: userData[0]['student_name'] || userData[0]['teacher_name']
      };
      await this.session('userNum', token);
      await this.session('access_url', access_url);
    }
  }
  async logoutAction() {
    await this.session(null);
    this.ctx.status = 200;
  }

  _call() {
    this.ctx.status = 404;
  }
};
