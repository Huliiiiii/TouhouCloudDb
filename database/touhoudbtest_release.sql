-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: touhoudbtest
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `release`
--

DROP TABLE IF EXISTS `release`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `release` (
  `release_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `release_date` date DEFAULT NULL,
  `release_type` varchar(45) DEFAULT NULL,
  `release_format` varchar(45) DEFAULT NULL,
  `release_artist` json DEFAULT NULL,
  `publisher` json DEFAULT NULL,
  `track_listing` json DEFAULT NULL,
  `classfier` json DEFAULT NULL,
  `ncm_id` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`release_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `release`
--

LOCK TABLES `release` WRITE;
/*!40000 ALTER TABLE `release` DISABLE KEYS */;
INSERT INTO `release` VALUES (1,'Lovelight','2007-05-20','Album','CD','[3]','[\"3\"]','[[\"1\", \"1\"], [\"2\", \"2\"], [\"3\", \"4\"]]',NULL,NULL,'2024-02-13 22:17:51','2024-02-13 22:17:51',0),(2,'test','2007-05-20','EP','Vinyl','[\"2\", \"3\"]','[\"3\"]','[[\"A1\", \"1\"], [\"A2\", \"2\"], [\"B\", \"4\"]]',NULL,NULL,'2024-02-13 22:17:51','2024-02-13 22:17:51',0),(4,'testNA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 22:17:51','2024-02-13 22:17:51',0);
/*!40000 ALTER TABLE `release` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-14  4:44:16
