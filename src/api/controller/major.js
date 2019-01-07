const Base = require('./base.js');
const moment = require('moment');
module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetMajorsAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const majorModel = this.model('major_v');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await majorModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await majorModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await majorModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async GetMajorClassAction() {
    const major_id = this.ctx.query.major_id;
    const classModel = this.model('classes');
    const classArr = await classModel.where({major_id: major_id}).select();
    this.body = {
      classArr
    };
  }
  async AddMajorAction() {
    const formData = this.ctx.request.body.post.formData;
    formData.major_createtime = moment(formData.major_createtime).format('YYYY-MM-DD');
    const majorModel = this.model('major');
    await majorModel.add(formData);
  }
  async UpdateMajorAction() {
    const formData = this.ctx.request.body.post.formData;
    formData.major_createtime = moment(formData.major_createtime).format('YYYY-MM-DD');
    const majorModel = this.model('major');
    await majorModel.where({major_id: formData.major_id}).update(formData);
  }
};
