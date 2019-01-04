const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetAcademysAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const academyModel = this.model('academy');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await academyModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await academyModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await academyModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async UpdateAcademyAction() {
    const formData = this.ctx.request.body.post.formData;
    const academyModel = this.model('academy');
    await academyModel.where({academy_id: formData.academy_id}).update(formData);
    this.ctx.status = 200;
  }
};
