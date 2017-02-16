CREATE DATABASE  IF NOT EXISTS `rot` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `rot`;
-- MySQL dump 10.13  Distrib 5.5.54, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: rot
-- ------------------------------------------------------
-- Server version	5.5.54-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `dni` varchar(30) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surnames` varchar(250) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `date_birthday` varchar(50) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,NULL,'Antonio','Re',NULL,'10212192285389312',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.50.50/p50x50/554732_4034280502361_209786436_n.jpg?oh=3d371f9339319c733d16791b98e50579&oe=593C5D55',''),(0,NULL,'Antonio','Revert',NULL,'103837431672476552892',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',''),(0,NULL,'Antonio','Revert Hinojosa',NULL,'113366650361384627391',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh5.googleusercontent.com/-rHiX0PH0gmc/AAAAAAAAAAI/AAAAAAAAACE/lBRhl_FhuE4/photo.jpg?sz=50',''),(0,NULL,'megathorin','default',NULL,'16418779',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://pbs.twimg.com/profile_images/2563464086/4xmrux2ve12jua1p6uu1_normal.jpeg',''),(0,NULL,'Antonio Revert Hinojosa',NULL,NULL,'megathorin@gmail.com','$2a$10$qvNWebIOtCimIxXVM5woT.C4dx4Qeiq0BzsuV4h.V/3RCpo997i9G',NULL,NULL,NULL,NULL,NULL,NULL,NULL,''),(0,NULL,'Toni',NULL,NULL,'test2@test.com','$2a$10$eRidrWTJZJUVhFPvNficL.vp7DmevIDiilffU0Y4pbh9rJgkkhfDC',NULL,NULL,NULL,NULL,NULL,NULL,'images/avatar.png',''),(0,NULL,'Antonio','Revert Hinojosa','626123456','test@test.com','$2a$10$hg26pgMosz.EJ00vj.6DZ.dQk.5FPtBpgU5yBtIfpfuCR2JnBVNBy',NULL,'admin','Spain','Valencia','Ontinyent','Furs, 36','images/avatar.png','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technicians`
--

DROP TABLE IF EXISTS `technicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `technicians` (
  `id` int(11) NOT NULL,
  `id_card` varchar(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname1` varchar(100) DEFAULT NULL,
  `surname2` varchar(100) DEFAULT NULL,
  `street` varchar(100) NOT NULL,
  `street_number` varchar(20) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `post_code` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `points` float NOT NULL,
  `val_qty` float NOT NULL,
  `time_start` time NOT NULL,
  `time_end` time NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technicians`
--

LOCK TABLES `technicians` WRITE;
/*!40000 ALTER TABLE `technicians` DISABLE KEYS */;
INSERT INTO `technicians` VALUES (1,'00000000A','José','Dominguez','Llanos','Pio XII','50','Ontinyent','46870','jose@test.com',100,1,'08:30:00','19:30:00',38.8204,-0.599243),(2,'00000000B','Francisco','Gomis','Gandia','Fra Lluis Galiana','15','Ontinyent','46870','fco@test.com',100,2,'08:30:00','19:30:00',38.8253,-0.600362),(3,'00000000C','Toño','Lopez','Sanches','Pare Fullana','29','Ontinyent','46870','antonio@test.com',100,1,'08:30:00','19:30:00',38.8242,-0.613326),(4,'00000000D','Intered, S.L.','','','Salvador Tormo','37','Ontinyent','46870','intered@test.com',100,1,'09:30:00','19:30:00',38.8236,-0.599889),(5,'00000000E','Tio','Pepe','Madrid','Pedro Leal','44','Albacete','46870','tio@test.com',100,1,'08:30:00','19:30:00',38.8707,-1.09971),(6,'00000000F','Manuel','Reguart','Madrid','Pedro Leal','44','Albacete','46870','tio@test.com',100,1,'08:30:00','19:30:00',38.8607,-1.08971),(7,'00000000G','David','Ureña','Madrid','Calle de Serrano Anguita','25','Madrid','28000','test@test.com',100,3,'08:30:00','19:30:00',40.4274,-3.69809);
/*!40000 ALTER TABLE `technicians` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-16 21:03:53
