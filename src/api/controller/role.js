const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetRolesAction() {
    const pageNum = this.ctx.query.pageNum; // 页码
    const pageSize = this.ctx.query.pageSize; // 单页显示数量
    const searchKey = this.ctx.query.searchKey; // 查询键
    const searchValue = this.ctx.query.searchValue; // 查询值
    const roleModel = this.model('role');
    let tableData;
    if (!think.isEmpty(searchKey) && !think.isEmpty(searchValue)) {
      tableData = await roleModel.page(pageNum, pageSize).where(`${searchKey} LIKE '%${searchValue}%'`).select();
    } else {
      tableData = await roleModel.page(pageNum, pageSize).select();
    }
    const totalRecouds = await roleModel.count(); // 从数组取出总记录数
    this.body = {
      tableData,
      totalRecouds
    };
  }
  async GetOneRoleAccessAction() {
    const id = this.ctx.request.body.post.id;
    const accessModel = this.model('access');
    const role_accessModal = this.model('role_access_v');
    const accessArr = await accessModel.select();
    const Arr = await role_accessModal.where({role_id: id}).select();
    const selectedArr = [];
    Arr.forEach(element => {
      selectedArr.push(element.access_id);
    });
    this.body = {
      accessArr,
      selectedArr
    };
  }
  async ChangeRoleAccessAction() {
    const role_id = this.ctx.request.body.post.id;
    const selectedArr = this.ctx.request.body.post.selectedArr; // 获取被修改后的权限
    const role_access_vModal = this.model('role_access_v');
    const role_accessModal = this.model('role_access');
    const Arr = await role_access_vModal.where({role_id: role_id}).select();// 获取原本权限
    const roleArr = [];
    const AddArr = [];
    const DelArr = [];
    Arr.forEach(element => { // 从对象数组中获取权限数组
      roleArr.push(element.access_id);
    });
    selectedArr.forEach(element1 => { // 获取需要增加的权限
      let flag = false;
      roleArr.forEach(element2 => {
        if (element1 === element2) {
          flag = true;
        }
      });
      if (flag === false) {
        AddArr.push(element1);
      }
    });
    roleArr.forEach(element1 => { // 获取需要删除的权限
      let flag = false;
      selectedArr.forEach(element2 => {
        if (element1 === element2) {
          flag = true;
        }
      });
      if (flag === false) {
        DelArr.push(element1);
      }
    });

    AddArr.forEach(async(element) => { // 遍历增加权限
      await role_accessModal.add({role_id: role_id, access_id: element});
    });
    DelArr.forEach(async(element) => { // 遍历删除权限
      await role_accessModal.where({role_id: role_id, access_id: element}).delete();
    });

    // const difference = selectedArr.concat(roleArr).filter(v => !selectedArr.includes(v) || !roleArr.includes(v));

    this.ctx.status = 200;
  }
};
