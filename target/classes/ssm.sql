/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.16 : Database - ssm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ssm` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ssm`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `sex` varchar(2) NOT NULL,
  `age` int(11) NOT NULL,
  `tel-number` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`sex`,`age`,`tel-number`) values (1,'梅西','男',32,'10'),(2,'内马尔','男',27,'11'),(4,'马拉多纳','男',59,'10'),(6,'罗纳尔迪尼奥','男',40,'10'),(9,'拉姆','男',36,'21'),(14,'库蒂尼奥','男',26,'7'),(23,'哈维','男',39,'6'),(24,'伊涅斯塔','男',34,'8'),(25,'贝利','男',79,'10'),(26,'穆勒','男',28,'25'),(27,'瓜迪奥拉','男',50,'10'),(28,'苏亚雷斯','男',34,'9'),(29,'克鲁伊夫','男',79,'9'),(30,'皮克','男',34,'3'),(31,'阿比达尔','男',40,'2'),(32,'亨利','男',40,'14');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
