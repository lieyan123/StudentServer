const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetLessonsAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const lessonModel = this.model('lesson');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await lessonModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await lessonModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await lessonModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async AddLessonAction() {
    const formData = this.ctx.request.body.post.formData;
    const lessonModel = this.model('lesson');
    await lessonModel.add(formData);
  }
  async UpdateLessonAction() {
    const formData = this.ctx.request.body.post.formData;
    const lessonModel = this.model('lesson');
    await lessonModel.where({lesson_id: formData.lesson_id}).update(formData);
  }
  async GetClassLessonsAction() {
    const class_id = this.ctx.query.class_id;
    const class_lesson_vModel = this.model('class_lesson_v');
    const tableData = await class_lesson_vModel.where({class_id: class_id}).select();
    this.body = {
      tableData
    };
  }
  async AddClassLessonAction() {
    const lesson_id = this.ctx.request.body.post.lesson_id;
    const major_id = this.ctx.request.body.post.major_id;
    const team = this.ctx.request.body.post.team;
    const major_lessonModel = this.model('major_lesson');
    await major_lessonModel.add({lesson_id: lesson_id, major_id: major_id, team: team});
  }
  async DeleteClassLessonAction() {
    const lesson_id = this.ctx.request.body.post.lesson_id;
    const major_id = this.ctx.request.body.post.major_id;
    const major_lessonModel = this.model('major_lesson');
    await major_lessonModel.where({lesson_id: lesson_id, major_id: major_id}).delete();
  }
};
