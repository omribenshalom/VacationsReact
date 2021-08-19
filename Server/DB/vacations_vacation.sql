-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(200) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `image` varchar(2000) NOT NULL,
  `price` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (6,'Peru','Colors and flavours','2021-12-31 00:00:00','2022-01-20 00:00:00','https://www.realgap.co.uk/tpl/lib/img/public/compressed-images/tpl/lib/img/private/media/istock-930824730-copy-1200x0-85.jpeg',1500),(10,'Finland','Winter and lights','2022-01-11 00:00:00','2022-01-26 00:00:00','https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2017/11/Aurora-Jokulsarlon-Lagoon-Iceland-www.istockphoto.com_gb_photo_mixed-aurora-dancing-over-the-jokulsarlon-lagoon-iceland-gm488508586-74186641-krissanapongw.jpg',1350),(12,'Singapore','Pearl of urban beauty','2021-07-18 00:00:00','2021-07-31 00:00:00','https://www.costacruises.co.uk/content/dam/costa/inventory-assets/ports/SIN/sin-singapore-port-1.jpg',1490),(13,'Atlantis','Under the ocean myth','2021-07-25 00:00:00','2021-08-07 00:00:00','https://www.moneymuseum.com/images/1187_8a14a26a.jpg',9000),(14,'Solomon Islands','Giant lagoon','2021-07-31 00:00:00','2021-08-28 00:00:00','https://philippineslifestyle.com/wp-content/uploads/Screenshot-2019-07-18-at-16.05.38.png',2500),(15,'Russia','Cold and shamans','2021-07-26 00:00:00','2021-08-07 00:00:00','https://montessori-ami.org/sites/default/files/images/countries/russia.jpg',700),(17,'Korath desert','Wonder if you notice','2021-07-13 00:00:00','2021-07-31 00:00:00','https://cdn.jwplayer.com/v2/media/tNosBVQH/poster.jpg?width=640',5560),(18,'Indonesia','Beautiful. Here. Come','2021-06-29 00:00:00','2021-07-21 00:00:00','https://i.insider.com/56157defbd86ef14008c019d?width=1000&format=jpeg&auto=webp',2540),(19,'Japan','Sushi and Fuji','2021-07-21 00:00:00','2021-07-31 00:00:00','https://evisafor.com/wp-content/uploads/2020/02/Visa-to-enter-Japan.jpg',2200),(20,'Portugal','Ocean and Port-wine','2021-07-14 00:00:00','2021-07-29 00:00:00','https://see.news/wp-content/uploads/2020/09/Portugal.jpg',950),(21,'Brazil','Samba.D jane','2021-07-23 00:00:00','2021-09-03 00:00:00','https://wallpaperaccess.com/full/46576.jpg',2100),(22,'Sinai','Dessert and Beduis','2021-06-29 00:00:00','2021-07-27 00:00:00','https://i0.wp.com/www.touristisrael.com/wp-content/uploads/2014/02/Mount-Sinai-Saint-Catherine-Tour-from-Eilat-or-Tel-Aviv-5.jpg?fit=1200%2C800&ssl=1',150),(23,'Earth','The lucky planet','2021-07-04 00:00:00','2021-07-18 00:00:00','https://cdn.mos.cms.futurecdn.net/paWPwF85Vkcs8YUuyvA3YM.jpg',5),(24,'Australia','Land down under','2021-07-19 00:00:00','2021-07-31 00:00:00','https://dazzlingtravelplanners.com/wp-content/uploads/2019/10/4dbac764773354e75e44a66723c82b51-australia-pacific.jpg',2850),(25,'Ethiopia','African pride','2021-09-22 00:00:00','2021-07-31 00:00:00','https://cdn.cnn.com/cnnnext/dam/assets/171031113729-ethiopia-travel-destination-photo.jpg',1800);
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-10 21:13:03
