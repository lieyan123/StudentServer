const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetClassesAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const classModel = this.model('classes_v');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await classModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await classModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await classModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async GetYearsTableAction() {
    const yearModel = this.model('years');
    const tableData = await yearModel.select();
    this.body = {
      tableData
    };
  }
  async AddClassAction() {
    const formData = this.ctx.request.body.post.formData;
    const majorModel = this.model('major');
    const major = await majorModel.where({major_id: formData.major_id}).find();
    formData.Admission_time = moment(formData.Admission_time).format('YYYY-MM-DD');
    formData.class_name = major.major_name + formData.class_name;
    const classModel = this.model('classes');
    await classModel.add(formData);
  }
  async UpdateClassAction() {
    const formData = this.ctx.request.body.post.formData;
    formData.Admission_time = moment(formData.Admission_time).format('YYYY-MM-DD');
    const classModel = this.model('classes');
    await classModel.where({class_id: formData.class_id}).update(formData);
  }
  async GetTeacherClassAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    // const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const classModel = this.model('class_lesson_v');
    let tableData;
    if (!think.isEmpty(searchValue)) {
      tableData = await classModel.page(pageNum, pageSize).where({teacher_num: searchValue}).select();
    } else {
      return this.ctx.status = 500;
    }
    const totalRecouds = await classModel.where({teacher_num: searchValue}).count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
};
