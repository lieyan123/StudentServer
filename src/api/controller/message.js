const Base = require('./base.js');
const moment = require('moment');
module.exports = class extends Base {
  indexAction() {
    // return this.display();
  }
  async GetUnreadCountAction() {
    const userId = this.ctx.query.userId;
    const messagemodel = this.model('message');
    const count = await messagemodel.where({user_id: userId, state: 0}).count();
    this.body = {
      count
    };
  }
  async GetMessageListAction() {
    const userId = this.ctx.query.userId;
    const messagemodel = this.model('message');
    const unread = await await messagemodel.where({user_id: userId, state: 0}).select();
    const readed = await await messagemodel.where({user_id: userId, state: 1}).select();
    const trash = await await messagemodel.where({user_id: userId, state: -1}).select();
    this.body = {
      unread,
      readed,
      trash
    };
  }
  async GetContentAction() {
    const msg_id = this.ctx.query.msg_id;
    const messagemodel = this.model('message');
    const content = await messagemodel.where({msg_id: msg_id}).getField('messageContext', true);
    this.body = content;
  }
  async setReadedAction() {
    const msg_id = this.ctx.request.body.post.msg_id;
    const messagemodel = this.model('message');
    await messagemodel.where({msg_id: msg_id}).update({state: 1});
  }
  async removeReadedAction() {
    const msg_id = this.ctx.request.body.post.msg_id;
    const messagemodel = this.model('message');
    await messagemodel.where({msg_id: msg_id}).update({state: -1});
  }
  async RestoreAction() {
    const msg_id = this.ctx.request.body.post.msg_id;
    const messagemodel = this.model('message');
    await messagemodel.where({msg_id: msg_id}).update({state: 1});
  }
  async SaveDraftAction() {
    const formData = this.ctx.request.body.post.formData;
    const draftmodel = this.model('draft');
    if (formData.draft_id === '') {
      await draftmodel.add({title: formData.title, content: formData.content});
    } else {
      await draftmodel.where({draft_id: formData.draft_id}).update(formData);
    }
  }
  async DeleteDraftAction() {
    const draft_id = this.ctx.request.body.post.draft_id;
    const draftmodel = this.model('draft');
    await draftmodel.where({draft_id: draft_id}).delete();
  }
  async GetDraftsAction() {
    const draftmodel = this.model('draft');
    const draftArr = await draftmodel.select();
    this.body = {
      draftArr
    };
  }
  async SendMessageAction() {
    const teacherArr = this.ctx.request.body.post.teacherArr;
    const studentArr = this.ctx.request.body.post.studentArr;
    const title = this.ctx.request.body.post.title;
    const messageContext = this.ctx.request.body.post.messageContext;
    const create_time = moment().format('YYYY-MM-DD');
    const messagemodel = this.model('message');
    teacherArr.forEach(async element => {
      await messagemodel.add({user_id: element, title: title, messageContext: messageContext, create_time: create_time});
    });
    studentArr.forEach(async element => {
      await messagemodel.add({user_id: element, title: title, messageContext: messageContext, create_time: create_time});
    });
  }
};
