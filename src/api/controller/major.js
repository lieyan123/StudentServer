const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetMajorsAction() {
    const pageNum = this.ctx.query.pageNum     //页码
    const pageSize = this.ctx.query.pageSize   //单页显示数量
    const searchKey =this.ctx.query.searchKey         //查询键
    const searchValue =this.ctx.query.searchValue     //查询值
    let majorModel = this.model('major');
    let tableData
    if(!think.isEmpty(searchKey)&&!think.isEmpty(searchValue)){
      tableData = await majorModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    }else{
      tableData = await majorModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await majorModel.count();   //从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    }
  }
};
