-- MySQL dump 10.13  Distrib 5.7.16, for Linux (x86_64)
--
-- Host: localhost    Database: rot
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

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
  `token` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,NULL,'David','Ureña Gil',NULL,'106413312577512018835',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh5.googleusercontent.com/-LNo7acbXvxI/AAAAAAAAAAI/AAAAAAAAAYE/E99sCiSem6U/photo.jpg?sz=50',NULL),(0,NULL,'David','Ureña Gil',NULL,'1421289397944822',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://scontent.xx.fbcdn.net/v/t1.0-1/c14.14.172.172/s50x50/163818_114597158614059_7443194_n.jpg?oh=e86e4fe0e263a263eebbe151ea4866f4&oe=593B1AF8',NULL),(0,NULL,'Davidpelutkw','default',NULL,'731778396',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://pbs.twimg.com/profile_images/768183969733107712/42VQ_Z4h_normal.jpg',NULL),(0,NULL,'david',NULL,NULL,'daurgil@gmail.com','$2a$10$pI2Ox2jJ8EqoNBRcr9Kn9OU5c9egCWmve9lktAuihFbU./scBA5fy',NULL,NULL,NULL,NULL,NULL,NULL,'images/avatar.png',NULL),(1,'470Z','Toni','Revert','612789456','test@test.com','$2y$10$A2C4tI75JCHc6b7atpohSe9UXQBaNesy0zFF6emzYJhcCEXUF5sXe','05/05/1981','individual','AT','default_province','default_city','Calle','./media/default-avatar.png','14a40272b4c4a9f052d3f72fc00d2f8a'),(0,NULL,'yomogan',NULL,NULL,'yomogan@gmail.com','$2a$10$E6zNm7OLWsJKfTERSqzeEue0xEDAPESVFQG5pxwMRg8IwyZLpcwMy',NULL,NULL,NULL,NULL,NULL,NULL,'images/avatar.png',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-14 12:14:28
