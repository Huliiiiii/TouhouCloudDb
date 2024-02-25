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
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `release_artist` json DEFAULT NULL,
  `override_credit_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `release_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `release_format` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `publisher` json DEFAULT NULL,
  `catalog_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `track_listing` json DEFAULT NULL,
  `classfier` json DEFAULT NULL,
  `ncm_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `release`
--

LOCK TABLES `release` WRITE;
/*!40000 ALTER TABLE `release` DISABLE KEYS */;
INSERT INTO `release` VALUES (1,'Lovelight','[3]',NULL,'2007-12-31','Album','CD',NULL,NULL,'[{\"id\": \"xxx\", \"title\": \"xxx\", \"length\": \"xxx\", \"track_num\": \"xxx\"}]',NULL,NULL,'2024-02-13 22:17:51','2024-02-20 08:47:45',0),(2,'test','[2, 3]',NULL,'2007-05-20','EP','Vinyl','[\"3\"]',NULL,'[[\"A1\", \"1\"], [\"A2\", \"2\"], [\"B\", \"4\"]]',NULL,NULL,'2024-02-13 22:17:51','2024-02-16 13:14:47',0),(4,'testNA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-13 22:17:51','2024-02-13 22:17:51',0),(5,'test','[1]',NULL,'2008-02-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-02-19 23:46:25','2024-02-19 23:46:25',0),(6,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'\"[[\\\"1\\\",\\\"1\\\"],[\\\"2\\\",\\\"2\\\"],[\\\"3\\\",\\\"4\\\"]]\"',NULL,NULL,'2024-02-19 23:52:03','2024-02-19 23:52:03',0),(7,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[[\"1\", \"1\"], [\"2\", \"2\"], [\"3\", \"4\"]]',NULL,NULL,'2024-02-19 23:57:10','2024-02-19 23:57:10',0),(8,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[[\"1\", \"1\"], [\"2\", \"2\"], [\"3\", \"4\"]]',NULL,NULL,'2024-02-19 23:57:22','2024-02-19 23:57:22',0),(9,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[[\"1\", \"1\"], [\"2\", \"2\"], [\"3\", \"4\"]]',NULL,NULL,'2024-02-19 23:58:40','2024-02-19 23:58:40',0),(10,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[[\"1\", \"1\"], [\"2\", \"2\"], [\"3\", \"4\"]]',NULL,NULL,'2024-02-19 23:59:26','2024-02-19 23:59:26',0),(11,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"title\": \"title\", \"length\": \"5:30\", \"track_num\": \"1\"}]',NULL,NULL,'2024-02-20 00:02:01','2024-02-20 08:25:03',0),(12,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"title\": \"title\", \"length\": \"5:30\", \"track_num\": \"1\"}]',NULL,NULL,'2024-02-20 08:26:05','2024-02-20 08:26:05',0),(13,'Lovelight','[3]',NULL,NULL,NULL,NULL,NULL,NULL,'[{\"id\": 1, \"title\": \"title\", \"length\": \"5:30\", \"track_num\": \"1\"}]',NULL,NULL,'2024-02-20 08:26:20','2024-02-20 08:26:20',0);
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

-- Dump completed on 2024-02-20 18:38:24
