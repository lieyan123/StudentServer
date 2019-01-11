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
  async GetClassStudentsAction() {
    const class_id = this.ctx.query.class_id;
    const studentModel = this.model('student_v');
    const tableData = await studentModel.where({class_id: class_id}).select();
    this.body = {
      tableData
    };
  }
  async GetStudentScoreAction() {
    const student_num = this.ctx.query.student_num;
    const score_vModel = this.model('score_v');
    const tableData = await score_vModel.where({student_num: student_num}).select();
    const Arr1 = await score_vModel.where({team: ['like', '%大一%'], student_num: student_num}).select();
    const Arr2 = await score_vModel.where({team: ['like', '%大二%'], student_num: student_num}).select();
    const Arr3 = await score_vModel.where({team: ['like', '%大三%'], student_num: student_num}).select();
    const Arr4 = await score_vModel.where({team: ['like', '%大四%'], student_num: student_num}).select();
    function pointMath(Arr) { // 计算出学分绩点
      let sum = 0;
      let divisor = 0;
      Arr.forEach(element => {
        sum += element.score * element.credit;
        divisor += element.credit;
      });
      const point = parseFloat((sum / divisor).toFixed(4));
      return point;
    }
    const point1 = pointMath(Arr1);
    const point2 = pointMath(Arr2);
    const point3 = pointMath(Arr3);
    const point4 = pointMath(Arr4);

    const point = [point1, point2, point3, point4];
    this.body = {
      tableData,
      point
    };
  }
  async GetOneStudentMessageAction() {
    const student_num = this.ctx.query.student_num;
    const studentModel = this.model('student_v');
    const tableData = await studentModel.where({student_num: student_num}).find();
    this.body = {
      tableData
    };
  }
};
