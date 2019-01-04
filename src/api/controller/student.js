const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetStudentsAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const studentModel = this.model('student_v');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await studentModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await studentModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await studentModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async UpdateOneStudentAction() {
    const formData = this.ctx.request.body.post.formData;
    formData.native_place = formData.native_place.join('/');
    formData.familyAddress = formData.familyAddress.join('/');
    formData.birthday = moment(formData.birthday).format('YYYY-MM-DD');
    const studentModel = this.model('student');
    await studentModel.where({student_num: formData.student_num}).update(formData);
  }
  async AddStudentListAction() {
    const tableData = this.ctx.request.body.post.tableData;
    const studentModel = this.model('student');
    const userModel = this.model('user');
    tableData.forEach(async element => {
      const user_id = await userModel.add({password: '123456', state: '启用'});
      const copy = {};
      copy.student_name = element.姓名;
      copy.student_num = element.学号;
      copy.password = element.密码;
      copy.sex = element.性别;
      copy.phone = element.电话;
      copy.student_type = element.学生类别;
      copy.class_id = element.班级id;
      copy.birthday = element.出生日期;
      copy.native_place = element.籍贯;
      copy.Ethnicity = element.民族;
      copy.nation = element.国籍;
      copy.IDnumber = element.身份证号;
      copy.political_status = element.政治面貌;
      copy.education = element.学历;
      copy.health_condition = element.健康状况;
      copy.familyAddress = element.家庭住址;
      copy.addressDetails = element.详细地址门牌号;
      copy.email = element.电子邮箱;
      copy.user_id = user_id;
      await studentModel.add(copy);
    });
    this.ctx.status = 200;
  }
  async UpdateStudentListAction() {
    const tableData = this.ctx.request.body.post.tableData;
    const studentModel = this.model('student');
    tableData.forEach(async element => {
      const copy = {};
      copy.student_name = element.姓名;
      copy.student_num = element.学号;
      copy.password = element.密码;
      copy.sex = element.性别;
      copy.phone = element.电话;
      copy.student_type = element.学生类别;
      copy.class_id = element.班级id;
      copy.birthday = element.出生日期;
      copy.native_place = element.籍贯;
      copy.Ethnicity = element.民族;
      copy.nation = element.国籍;
      copy.IDnumber = element.身份证号;
      copy.political_status = element.政治面貌;
      copy.education = element.学历;
      copy.health_condition = element.健康状况;
      copy.familyAddress = element.家庭住址;
      copy.addressDetails = element.详细地址门牌号;
      copy.email = element.电子邮箱;
      await studentModel.where({student_num: copy.student_num}).update(copy);
    });
    this.ctx.status = 200;
  }
};
