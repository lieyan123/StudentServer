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
    const class_id = this.ctx.request.body.post.class_id;
    const team = this.ctx.request.body.post.team;
    const teacher_id = this.ctx.request.body.post.teacher_id;
    const class_lessonModel = this.model('class_lesson');
    await class_lessonModel.add({lesson_id: lesson_id, class_id: class_id, team: team, teacher_id: teacher_id});
  }
  async DeleteClassLessonAction() {
    const lesson_id = this.ctx.request.body.post.lesson_id;
    const class_id = this.ctx.request.body.post.class_id;
    const class_lessonModel = this.model('class_lesson');
    await class_lessonModel.where({lesson_id: lesson_id, class_id: class_id}).delete();
  }
  async GetLessonScoreAction() {
    const class_id = this.ctx.query.class_id;
    const lesson_id = this.ctx.query.lesson_id;
    const score_vModel = this.model('score_v');
    const avg = await score_vModel.where({lesson_id: lesson_id, class_id: class_id}).avg('score');
    const tableData = await score_vModel.where({lesson_id: lesson_id, class_id: class_id}).select();
    const pass = [];
    const down = [];
    tableData.forEach(element => {
      if (element.score === null) {
        element.score = 'null';
      }
      if (element.score < 60) {
        down.push(element);
      } else {
        pass.push(element);
      }
    });
    this.body = {
      avg,
      pass,
      down,
      tableData
    };
  }
  async UpdateScoresAction() {
    const tableData = this.ctx.request.body.post.tableData;
    const scoreModel = this.model('score');
    tableData.forEach(async(element) => {
      if (element.score !== 'null') {
        const count = await scoreModel.where({student_id: element.student_id, lesson_id: element.lesson_id}).count();
        if (count === 1) {
          await scoreModel.where({student_id: element.student_id, lesson_id: element.lesson_id}).update(element);
        } else {
          await scoreModel.where({student_id: element.student_id, lesson_id: element.lesson_id}).add(element);
        }
      }
    });
  }
};
