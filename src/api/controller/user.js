const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
  }
  async GetUsersAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const userModel = this.model('teacher_v');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await userModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await userModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await userModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async insertUserAction() {
    const formData = this.ctx.request.body.post.formData;
    const teacherModel = this.model('teacher');
    const userModel = this.model('user');
    const user_roleModel = this.model('user_role');
    const user_id = await userModel.add({password: '123456', state: '启用'});
    formData.user_id = user_id;
    await teacherModel.add(formData);
    const role_id = formData.role;
    await user_roleModel.add({user_id: user_id, role_id: role_id});
    this.ctx.status = 200;
  }
  async banUserAction() {
    const id = this.ctx.request.body.post.id;
    const state = this.ctx.request.body.post.state;
    const userModel = this.model('user');
    if (state === '启用') {
      await userModel.where({user_id: id}).update({state: '禁用'});
    } else {
      await userModel.where({user_id: id}).update({state: '启用'});
    }
  }
};
