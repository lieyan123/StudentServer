/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : studentserver

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2019-01-06 22:46:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `academy`
-- ----------------------------
DROP TABLE IF EXISTS `academy`;
CREATE TABLE `academy` (
  `academy_id` int(11) NOT NULL AUTO_INCREMENT,
  `academy_name` varchar(255) DEFAULT NULL,
  `academy_createtime` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT '正常' COMMENT '正常/废弃',
  PRIMARY KEY (`academy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of academy
-- ----------------------------
INSERT INTO `academy` VALUES ('1', '医药信息工程学院', '2018-12-12', '正常');
INSERT INTO `academy` VALUES ('2', '中药学院', '2018-12-12', '正常');

-- ----------------------------
-- Table structure for `access`
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `access_id` int(11) NOT NULL AUTO_INCREMENT,
  `access_name` varchar(255) DEFAULT NULL,
  `access_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES ('1', '登陆', '/api/login/login');
INSERT INTO `access` VALUES ('2', '获取用户信息', '/api/login/get_info');
INSERT INTO `access` VALUES ('3', '登出', '/api/login/logout');
INSERT INTO `access` VALUES ('4', '获取user表格', '/api/user/GetUsers');
INSERT INTO `access` VALUES ('5', '获取student表格', '/api/student/GetStudents');
INSERT INTO `access` VALUES ('6', '获取academy表格', '/api/academy/GetAcademys');
INSERT INTO `access` VALUES ('7', '获取major表格', '/api/major/GetMajors');
INSERT INTO `access` VALUES ('8', '获取class表格', '/api/class/GetClasses');
INSERT INTO `access` VALUES ('9', '获取lesson表格', '/api/lesson/GetLessons');
INSERT INTO `access` VALUES ('10', '获取role表格', '/api/role/GetRoles');
INSERT INTO `access` VALUES ('11', '插入一名用户', '/api/user/insertUser');
INSERT INTO `access` VALUES ('12', '修改账户状态', '/api/user/banUser');
INSERT INTO `access` VALUES ('13', '获取用户权限', '/api/role/GetOneRoleAccess');
INSERT INTO `access` VALUES ('14', '修改用户权限', '/api/role/ChangeRoleAccess');
INSERT INTO `access` VALUES ('15', '修改单个学生信息', '/api/student/UpdateOneStudent');
INSERT INTO `access` VALUES ('16', '批量添加学生', '/api/student/AddStudentList');
INSERT INTO `access` VALUES ('17', '批量修改学生', '/api/student/UpdateStudentList');
INSERT INTO `access` VALUES ('18', '修改单个学院信息', '/api/academy/UpdateAcademy');
INSERT INTO `access` VALUES ('19', '查看学院明细信息', '/api/academy/GetAcademyDetails');
INSERT INTO `access` VALUES ('20', '获取专业对应班级信息', '/api/major/GetMajorClass');

-- ----------------------------
-- Table structure for `classes`
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `Admission_time` varchar(255) DEFAULT NULL COMMENT '入学时间',
  `year_id` int(11) DEFAULT NULL COMMENT '学年制，4年或者五年',
  `major_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `year_id` (`year_id`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `years` (`year_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES ('1', '计算机科学与技术（医药软件服务外包）152', '2018-12-12', '2', '1');

-- ----------------------------
-- Table structure for `lesson`
-- ----------------------------
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `lesson_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_name` varchar(255) DEFAULT NULL,
  `lesson_hours` varchar(255) DEFAULT NULL,
  `lesson_type` varchar(255) DEFAULT '必修',
  PRIMARY KEY (`lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lesson
-- ----------------------------
INSERT INTO `lesson` VALUES ('1', '计算机组成原理', '32', '必修');
INSERT INTO `lesson` VALUES ('2', 'Java程序设计', '32', '必修');

-- ----------------------------
-- Table structure for `major`
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `major_id` int(11) NOT NULL AUTO_INCREMENT,
  `major_name` varchar(255) DEFAULT NULL,
  `major_createtime` varchar(255) DEFAULT NULL,
  `academy_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`major_id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `major_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`academy_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES ('1', '计算机科学与技术（医药软件服务外包）', '2018-12-12', '1');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员');
INSERT INTO `role` VALUES ('2', '教师');
INSERT INTO `role` VALUES ('3', '学生');
INSERT INTO `role` VALUES ('4', '院系管理员');

-- ----------------------------
-- Table structure for `role_access`
-- ----------------------------
DROP TABLE IF EXISTS `role_access`;
CREATE TABLE `role_access` (
  `role_access_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `access_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`role_access_id`),
  KEY `role_id` (`role_id`),
  KEY `access_id` (`access_id`),
  CONSTRAINT `role_access_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `role_access_ibfk_2` FOREIGN KEY (`access_id`) REFERENCES `access` (`access_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_access
-- ----------------------------
INSERT INTO `role_access` VALUES ('1', '1', '1');
INSERT INTO `role_access` VALUES ('2', '1', '2');
INSERT INTO `role_access` VALUES ('3', '1', '3');
INSERT INTO `role_access` VALUES ('4', '1', '4');
INSERT INTO `role_access` VALUES ('6', '3', '2');
INSERT INTO `role_access` VALUES ('7', '3', '3');
INSERT INTO `role_access` VALUES ('8', '1', '5');
INSERT INTO `role_access` VALUES ('9', '1', '6');
INSERT INTO `role_access` VALUES ('10', '1', '7');
INSERT INTO `role_access` VALUES ('11', '1', '8');
INSERT INTO `role_access` VALUES ('12', '1', '9');
INSERT INTO `role_access` VALUES ('13', '1', '10');
INSERT INTO `role_access` VALUES ('14', '1', '11');
INSERT INTO `role_access` VALUES ('15', '1', '12');
INSERT INTO `role_access` VALUES ('16', '1', '13');
INSERT INTO `role_access` VALUES ('17', '1', '14');
INSERT INTO `role_access` VALUES ('20', '3', '1');
INSERT INTO `role_access` VALUES ('21', '1', '15');
INSERT INTO `role_access` VALUES ('22', '1', '16');
INSERT INTO `role_access` VALUES ('23', '1', '17');
INSERT INTO `role_access` VALUES ('24', '1', '18');
INSERT INTO `role_access` VALUES ('25', '1', '19');
INSERT INTO `role_access` VALUES ('26', '1', '20');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_num` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `user_id` int(255) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `student_type` varchar(255) DEFAULT '本科生' COMMENT '本科生，研究生，博士生',
  `birthday` varchar(255) DEFAULT NULL,
  `native_place` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `Ethnicity` varchar(255) DEFAULT NULL COMMENT '民族',
  `nation` varchar(255) DEFAULT NULL COMMENT '国籍',
  `IDnumber` varchar(255) DEFAULT NULL COMMENT '身份证号',
  `political_status` varchar(255) DEFAULT NULL COMMENT '政治面貌 团员党员群众',
  `education` varchar(255) DEFAULT NULL COMMENT '学历     大学本科，研究生',
  `health_condition` varchar(255) DEFAULT NULL COMMENT '健康状况     良好',
  `phone` varchar(255) DEFAULT NULL,
  `familyAddress` varchar(255) DEFAULT NULL,
  `addressDetails` varchar(255) DEFAULT NULL COMMENT '详细门牌号等',
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `user_id` (`user_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '1500502234', '杨文豪', '2', '1', '男', '本科生', '2019/1/15', '广东省/惠州市/惠城区/水口街道', '汉', '中国', '441622199912252599', '共青团员', '本科', '良好', '15013054359', '广东省/惠州市/惠城区/水口街道', '岭头村宜佳百货', '874297001@qq.com');
INSERT INTO `student` VALUES ('2', '1500502231', '埒胭', '3', '1', '女', '本科生', '2019/1/15', '广东省/惠州市/惠城区/水口街道', '汉', '中国', '441622199912252599', '共产党员', '本科', '良好', '15013054359', '广东省/惠州市/惠城区/水口街道', '水口龙湖', '874297001@qq.com');
INSERT INTO `student` VALUES ('3', '1500502233', '新杰', '12', '1', '男', '本科生', '2019/1/15', '广东省/惠州市/惠城区/水口街道', '汉', '中国', '441622199912252599', '共青团员', '本科', '良好', '15013054359', '广东省/惠州市/惠城区/水口街道', '岭头村宜佳百货', '874297001@qq.com');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_num` varchar(255) DEFAULT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `teacher_status` varchar(255) DEFAULT '讲师' COMMENT '讲师，教授，副教授',
  `user_id` int(11) DEFAULT NULL,
  `academy_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`),
  KEY `user_id` (`user_id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`academy_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', 'super_admin', '超级管理员', '系统管理员', '1', '1');
INSERT INTO `teacher` VALUES ('2', 'academy_admin', '易法令', '主任', '5', '1');
INSERT INTO `teacher` VALUES ('3', 'tang', '汤', '讲师', '6', '1');
INSERT INTO `teacher` VALUES ('4', 'yang', '杨', '讲师', '7', '1');
INSERT INTO `teacher` VALUES ('5', 'gongren', '送水工人', '工作人员', '8', '1');
INSERT INTO `teacher` VALUES ('6', 'test', '啦啦啦', '工作人员', '9', '1');
INSERT INTO `teacher` VALUES ('7', '123456789', '啊啊啊', '工作人员', '10', '1');
INSERT INTO `teacher` VALUES ('8', '1055', '张佳达', '讲师', '11', '1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT '123456',
  `state` varchar(255) NOT NULL DEFAULT '启用' COMMENT '状态为启用或者禁用',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '启用');
INSERT INTO `user` VALUES ('2', '123456', '启用');
INSERT INTO `user` VALUES ('3', '123456', '启用');
INSERT INTO `user` VALUES ('4', '123456', '启用');
INSERT INTO `user` VALUES ('5', '123456', '启用');
INSERT INTO `user` VALUES ('6', '123456', '启用');
INSERT INTO `user` VALUES ('7', '123456', '启用');
INSERT INTO `user` VALUES ('8', '123456', '启用');
INSERT INTO `user` VALUES ('9', '123456', '启用');
INSERT INTO `user` VALUES ('10', '123456', '启用');
INSERT INTO `user` VALUES ('11', '123456', '启用');
INSERT INTO `user` VALUES ('12', '123456', '启用');

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `user_id` (`user_id`),
  KEY `access_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1', '1');
INSERT INTO `user_role` VALUES ('3', '2', '3');
INSERT INTO `user_role` VALUES ('4', '6', '2');
INSERT INTO `user_role` VALUES ('5', '7', '2');
INSERT INTO `user_role` VALUES ('6', '8', '2');
INSERT INTO `user_role` VALUES ('7', '9', '2');
INSERT INTO `user_role` VALUES ('8', '10', '2');
INSERT INTO `user_role` VALUES ('9', '11', '2');
INSERT INTO `user_role` VALUES ('10', '5', '4');

-- ----------------------------
-- Table structure for `years`
-- ----------------------------
DROP TABLE IF EXISTS `years`;
CREATE TABLE `years` (
  `year_id` int(11) NOT NULL AUTO_INCREMENT,
  `year_name` varchar(255) DEFAULT NULL,
  `year_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`year_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of years
-- ----------------------------
INSERT INTO `years` VALUES ('1', '三年制', '3');
INSERT INTO `years` VALUES ('2', '四年制', '4');
INSERT INTO `years` VALUES ('3', '五年制', '5');

-- ----------------------------
-- View structure for `academy_v`
-- ----------------------------
DROP VIEW IF EXISTS `academy_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `academy_v` AS select `academy`.`academy_id` AS `academy_id`,`academy`.`academy_name` AS `academy_name`,`academy`.`academy_createtime` AS `academy_createtime`,`academy`.`state` AS `state`,`teacher`.`teacher_name` AS `teacher_name`,`teacher`.`teacher_id` AS `teacher_id`,`role`.`role_name` AS `role_name`,`teacher`.`user_id` AS `user_id`,`role`.`role_id` AS `role_id` from ((((`academy` join `teacher` on((`teacher`.`academy_id` = `academy`.`academy_id`))) join `user` on((`teacher`.`user_id` = `user`.`user_id`))) join `user_role` on((`user_role`.`user_id` = `user`.`user_id`))) join `role` on((`user_role`.`role_id` = `role`.`role_id`))) ;

-- ----------------------------
-- View structure for `classes_v`
-- ----------------------------
DROP VIEW IF EXISTS `classes_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `classes_v` AS select `years`.`year_num` AS `year_num`,`years`.`year_name` AS `year_name`,`classes`.`class_id` AS `class_id`,`classes`.`class_name` AS `class_name`,`classes`.`Admission_time` AS `Admission_time`,`classes`.`year_id` AS `year_id`,`classes`.`major_id` AS `major_id`,`major`.`major_name` AS `major_name`,`academy`.`academy_name` AS `academy_name`,`academy`.`academy_id` AS `academy_id` from (((`classes` join `major` on((`classes`.`major_id` = `major`.`major_id`))) join `years` on((`classes`.`year_id` = `years`.`year_id`))) join `academy` on((`major`.`academy_id` = `academy`.`academy_id`))) ;

-- ----------------------------
-- View structure for `role_access_v`
-- ----------------------------
DROP VIEW IF EXISTS `role_access_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `role_access_v` AS select `role`.`role_id` AS `role_id`,`role`.`role_name` AS `role_name`,`access`.`access_id` AS `access_id`,`access`.`access_name` AS `access_name`,`access`.`access_url` AS `access_url` from ((`access` join `role_access` on((`role_access`.`access_id` = `access`.`access_id`))) join `role` on((`role_access`.`role_id` = `role`.`role_id`))) ;

-- ----------------------------
-- View structure for `student_v`
-- ----------------------------
DROP VIEW IF EXISTS `student_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student_v` AS select `student`.`student_id` AS `student_id`,`student`.`student_num` AS `student_num`,`student`.`student_name` AS `student_name`,`student`.`user_id` AS `user_id`,`user`.`password` AS `password`,`user`.`state` AS `state`,`student`.`class_id` AS `class_id`,`student`.`sex` AS `sex`,`student`.`phone` AS `phone`,`student`.`student_type` AS `student_type`,`classes`.`class_name` AS `class_name`,`student`.`native_place` AS `native_place`,`student`.`Ethnicity` AS `Ethnicity`,`student`.`nation` AS `nation`,`student`.`IDnumber` AS `IDnumber`,`student`.`political_status` AS `political_status`,`student`.`education` AS `education`,`student`.`health_condition` AS `health_condition`,`student`.`email` AS `email`,`student`.`addressDetails` AS `addressDetails`,`student`.`birthday` AS `birthday`,`student`.`familyAddress` AS `familyAddress` from ((`student` join `user` on((`student`.`user_id` = `user`.`user_id`))) join `classes` on((`student`.`class_id` = `classes`.`class_id`))) ;

-- ----------------------------
-- View structure for `teacher_v`
-- ----------------------------
DROP VIEW IF EXISTS `teacher_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `teacher_v` AS select `teacher`.`teacher_num` AS `teacher_num`,`teacher`.`teacher_name` AS `teacher_name`,`teacher`.`user_id` AS `user_id`,`user`.`password` AS `password`,`academy`.`academy_name` AS `academy_name`,`teacher`.`teacher_status` AS `teacher_status`,`user`.`state` AS `state`,`role`.`role_name` AS `role_name`,`role`.`role_id` AS `role_id` from ((((`teacher` join `user` on((`teacher`.`user_id` = `user`.`user_id`))) join `academy` on((`teacher`.`academy_id` = `academy`.`academy_id`))) join `user_role` on((`user_role`.`user_id` = `user`.`user_id`))) join `role` on((`user_role`.`role_id` = `role`.`role_id`))) ;

-- ----------------------------
-- View structure for `user_role_access_v`
-- ----------------------------
DROP VIEW IF EXISTS `user_role_access_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_role_access_v` AS select `user`.`user_id` AS `user_id`,`user`.`password` AS `password`,`role`.`role_id` AS `role_id`,`role`.`role_name` AS `role_name`,`access`.`access_id` AS `access_id`,`access`.`access_name` AS `access_name`,`access`.`access_url` AS `access_url` from ((((`user` join `user_role` on((`user_role`.`user_id` = `user`.`user_id`))) join `role` on((`user_role`.`role_id` = `role`.`role_id`))) join `role_access` on((`role_access`.`role_id` = `role`.`role_id`))) join `access` on((`role_access`.`access_id` = `access`.`access_id`))) ;

-- ----------------------------
-- View structure for `user_role_v`
-- ----------------------------
DROP VIEW IF EXISTS `user_role_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_role_v` AS select `user`.`user_id` AS `user_id`,`user`.`password` AS `password`,`role`.`role_id` AS `role_id`,`role`.`role_name` AS `role_name` from ((`user` join `user_role` on((`user_role`.`user_id` = `user`.`user_id`))) join `role` on((`user_role`.`role_id` = `role`.`role_id`))) ;
