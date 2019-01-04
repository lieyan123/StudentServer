const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetLessonsAction() {
    const pageNum = this.ctx.query.pageNum     //页码
    const pageSize = this.ctx.query.pageSize   //单页显示数量
    const searchKey =this.ctx.query.searchKey         //查询键
    const searchValue =this.ctx.query.searchValue     //查询值
    let lessonModel = this.model('lesson');
    let tableData
    if(!think.isEmpty(searchKey)&&!think.isEmpty(searchValue)){
      tableData = await lessonModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    }else{
      tableData = await lessonModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await lessonModel.count();   //从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    }
  }
};
