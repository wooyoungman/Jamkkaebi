-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: k11c106.p.ssafy.io    Database: jamkkaebi
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `Cargo`
--

DROP TABLE IF EXISTS `Cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cargo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `cargoInfo` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `destinationLat` varchar(255) NOT NULL,
  `destinationLon` varchar(255) NOT NULL,
  `distance` int NOT NULL,
  `dueDate` datetime(6) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `originLat` varchar(255) NOT NULL,
  `originLon` varchar(255) NOT NULL,
  `routeId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cargo`
--

LOCK TABLES `Cargo` WRITE;
/*!40000 ALTER TABLE `Cargo` DISABLE KEYS */;
INSERT INTO `Cargo` VALUES (1,'2024-11-13 09:19:57.969149','2024-11-13 09:19:58.289825','에어컨 컴프레셔','삼성전자 광주사업장','35.205481','126.81049',78058,'2024-11-24 16:28:03.087000','목포신항','34.757473','126.354478','6733f0aec2512d1c19b2cab5'),(2,'2024-11-18 09:56:48.242363','2024-11-18 09:56:48.562241','항공 장비','광주 광산구 상무대로 420-25','35.139377','126.810907',128126,'2024-11-28 16:28:03.087000','군산공항','35.926148','126.615807','673a90d091e71d4532d7122c'),(3,'2024-11-18 09:58:03.211048','2024-11-18 09:58:03.255105','에어컨','대전 서구 둔산로 100','36.350382','127.384624',164933,'2024-11-28 16:28:03.087000','삼성전자 광주사업장','35.204481','126.807935','673a911b91e71d4532d7122d'),(4,'2024-11-18 09:58:18.736929','2024-11-18 09:58:18.772932','세탁기','세종특별자치시 한누리대로 2130','36.480061','127.289048',176498,'2024-11-28 16:28:03.087000','삼성전자 광주사업장','35.204481','126.807935','673a912a91e71d4532d7122e'),(5,'2024-11-18 09:58:28.766602','2024-11-18 09:58:28.793362','세탁기','충남 홍성군 홍북읍 충남대로 21','36.659759','126.674824',204793,'2024-11-28 16:28:03.087000','삼성전자 광주사업장','35.204481','126.807935','673a913491e71d4532d7122f'),(6,'2024-11-18 09:58:59.625793','2024-11-18 09:58:59.647855','세탁기 수리 부품','경기 수원시 영통구 도청로 30','37.2893','127.053562',278641,'2024-11-28 16:28:03.087000','삼성전자 광주사업장','35.204481','126.807935','673a915391e71d4532d71230'),(7,'2024-11-18 10:00:54.127484','2024-11-18 10:00:54.150103','보세 운송 항목','충북 청주시 청원구 내수읍 오창대로 980','36.72209','127.495917',173981,'2024-11-28 16:28:03.087000','인천공항','37.449639','126.450615','673a91c691e71d4532d71231'),(8,'2024-11-18 10:01:25.354519','2024-11-18 10:01:25.371235','의류','파주 아울렛','37.769243','126.696506',67042,'2024-11-28 16:28:03.087000','인천공항','37.449639','126.450615','673a91e591e71d4532d71232'),(9,'2024-11-18 10:01:53.039506','2024-11-18 10:01:53.057158','디스플레이 부품','파주 LCD 산업단지','37.809877','126.774027',75508,'2024-11-28 16:28:03.087000','인천공항','37.449639','126.450615','673a920191e71d4532d71233'),(10,'2024-11-18 10:02:27.320879','2024-11-18 10:02:27.348555','디스플레이 부품','대구 중구 공평로 88','35.871694','128.601411',330609,'2024-11-28 16:28:03.087000','경기 파주시 월롱면 엘지로 245','37.809877','126.774027','673a922391e71d4532d71234'),(11,'2024-11-18 10:03:21.081792','2024-11-18 10:03:21.106423','연구 물자','KAIST','36.374657','127.361154',279125,'2024-11-28 16:28:03.087000','부산항','35.124392','129.056295','673a925991e71d4532d71235'),(12,'2024-11-18 10:04:18.257300','2024-11-18 10:04:18.280035','건설 장비','울산 북구 산업로 1103','35.594675','129.356764',67398,'2024-11-28 16:28:03.087000','부산항','35.124392','129.056295','673a929291e71d4532d71236'),(13,'2024-11-18 10:04:30.870170','2024-11-18 10:04:30.889603','건설 장비','경북 포항시 남구 동해면 일월로 18','35.984104','129.434031',132159,'2024-11-28 16:28:03.087000','부산항','35.124392','129.056295','673a929e91e71d4532d71237'),(14,'2024-11-18 10:05:20.454364','2024-11-18 10:05:20.486070','과메기','경북 포항시 남구 동해면 일월로 18','35.984104','129.434031',265488,'2024-11-28 16:28:03.087000','충남 천안시 서북구 번영로 156','36.815772','127.115116','673a92d091e71d4532d71238'),(15,'2024-11-18 15:23:21.093305','2024-11-18 15:23:21.431442','화학 약품','충남 천안시 서북구 번영로 156','36.815772','127.115116',265384,'2024-11-28 16:28:03.087000','경북 포항시 남구 동해면 일월로 19','35.988909','129.435059','673add59db895e361988555b');
/*!40000 ALTER TABLE `Cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Delivery`
--

DROP TABLE IF EXISTS `Delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Delivery` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `arrivalDate` datetime(6) DEFAULT NULL,
  `aveSleepIndex` int NOT NULL,
  `avgFocusIndex` int NOT NULL,
  `departureDate` datetime(6) NOT NULL,
  `hasArrived` bit(1) NOT NULL,
  `lowFocusSector` int NOT NULL,
  `sleepSector` int NOT NULL,
  `cargo_id` bigint DEFAULT NULL,
  `vehicle_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKg8ba4si1whwcncway6ha3u7yt` (`cargo_id`),
  KEY `FKa545jo86g2nasjlf55n8ytga9` (`vehicle_id`),
  CONSTRAINT `FKa545jo86g2nasjlf55n8ytga9` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle` (`id`),
  CONSTRAINT `FKs0102wdn5pgadki9lyl4sptn3` FOREIGN KEY (`cargo_id`) REFERENCES `Cargo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Delivery`
--

LOCK TABLES `Delivery` WRITE;
/*!40000 ALTER TABLE `Delivery` DISABLE KEYS */;
INSERT INTO `Delivery` VALUES (1,'2024-11-18 18:49:46.103231','2024-11-18 18:49:46.103231',NULL,0,0,'2024-11-18 18:49:46.075904',_binary '\0',0,0,1,1),(2,'2024-11-18 18:49:47.612349','2024-11-18 18:49:47.612349','2024-11-10 12:16:47.611917',26,0,'2024-11-10 10:49:47.611917',_binary '',0,1,2,1),(3,'2024-11-18 18:49:54.191225','2024-11-18 18:49:54.191225','2024-11-17 13:09:54.190828',46,0,'2024-11-17 10:49:54.190828',_binary '',0,0,3,1),(4,'2024-11-18 18:49:55.359933','2024-11-18 18:49:55.359933','2024-11-11 12:49:55.359589',35,0,'2024-11-11 10:49:55.359589',_binary '',0,0,4,1),(5,'2024-11-18 18:49:56.467451','2024-11-18 18:49:56.467451','2024-11-17 19:49:56.467071',73,0,'2024-11-17 18:49:56.467071',_binary '',0,1,5,1),(6,'2024-11-18 18:49:57.652777','2024-11-18 18:49:57.652777','2024-11-12 11:59:57.652444',68,0,'2024-11-12 10:49:57.652444',_binary '',0,2,6,1),(7,'2024-11-18 18:49:58.949707','2024-11-18 18:49:58.949707','2024-11-10 22:10:58.949400',43,0,'2024-11-10 18:49:58.949400',_binary '',0,1,7,1),(8,'2024-11-18 18:50:02.548747','2024-11-18 18:50:02.548747','2024-11-13 11:50:02.548010',32,0,'2024-11-13 10:50:02.548010',_binary '',0,0,8,1),(9,'2024-11-18 18:50:03.822340','2024-11-18 18:50:03.822340','2024-11-11 21:03:03.821998',78,0,'2024-11-11 18:50:03.821998',_binary '',0,2,9,1),(10,'2024-11-18 18:50:05.036873','2024-11-18 18:50:05.036873','2024-11-14 13:02:05.036548',28,0,'2024-11-14 10:50:05.036548',_binary '',0,0,10,1),(11,'2024-11-18 18:50:06.581292','2024-11-18 18:50:06.581292','2024-11-12 20:51:06.580895',55,0,'2024-11-12 18:50:06.580895',_binary '',0,1,11,1),(12,'2024-11-18 18:50:07.654847','2024-11-18 18:50:07.654847','2024-11-15 12:50:07.654542',51,0,'2024-11-15 10:50:07.654542',_binary '',0,1,12,1),(13,'2024-11-18 18:50:08.947311','2024-11-18 18:50:08.947311','2024-11-13 19:55:08.946985',65,0,'2024-11-13 18:50:08.946985',_binary '',0,1,13,1),(14,'2024-11-18 18:50:10.052589','2024-11-18 18:50:10.052589','2024-11-16 19:57:10.052288',46,0,'2024-11-16 18:50:10.052288',_binary '',0,1,14,1),(15,'2024-11-18 18:50:11.111891','2024-11-18 18:50:11.111891','2024-11-14 21:01:11.111476',83,0,'2024-11-14 18:50:11.111476',_binary '',0,3,15,1);
/*!40000 ALTER TABLE `Delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Device`
--

DROP TABLE IF EXISTS `Device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Device` (
  `uuid` varchar(255) NOT NULL,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `vehicle_id` bigint DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `UKqoqgtk8wy2jc1j9411kxl21od` (`vehicle_id`),
  CONSTRAINT `FKd4do08s5sg7rccwbekljbo6l7` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Device`
--

LOCK TABLES `Device` WRITE;
/*!40000 ALTER TABLE `Device` DISABLE KEYS */;
INSERT INTO `Device` VALUES ('8084e5e5-45be-44a3-a6d7-efbbe1177c49','2024-11-13 09:11:41.998083','2024-11-14 20:13:17.678763',1);
/*!40000 ALTER TABLE `Device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ManagerAndDriver`
--

DROP TABLE IF EXISTS `ManagerAndDriver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ManagerAndDriver` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `driver_id` bigint DEFAULT NULL,
  `manager_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKj48ilkka6fqo0pl57xjgep8jn` (`driver_id`),
  KEY `FK7f9rpnkdbmepkmbpeiar5aohh` (`manager_id`),
  CONSTRAINT `FK7f9rpnkdbmepkmbpeiar5aohh` FOREIGN KEY (`manager_id`) REFERENCES `Member` (`id`),
  CONSTRAINT `FKna5qfirra7utn2ancusg754p3` FOREIGN KEY (`driver_id`) REFERENCES `Member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ManagerAndDriver`
--

LOCK TABLES `ManagerAndDriver` WRITE;
/*!40000 ALTER TABLE `ManagerAndDriver` DISABLE KEYS */;
INSERT INTO `ManagerAndDriver` VALUES (1,'2024-11-13 09:16:05.131935','2024-11-13 09:16:05.131935',5,4),(2,'2024-11-18 21:07:22.034432','2024-11-18 21:07:22.034432',1,4),(3,'2024-11-18 21:07:23.461811','2024-11-18 21:07:23.461811',2,4),(4,'2024-11-18 21:07:26.053407','2024-11-18 21:07:26.053407',6,4),(5,'2024-11-18 21:07:27.653684','2024-11-18 21:07:27.653684',7,4),(6,'2024-11-18 21:07:29.050490','2024-11-18 21:07:29.050490',8,4),(7,'2024-11-18 21:07:30.114195','2024-11-18 21:07:30.114195',9,4);
/*!40000 ALTER TABLE `ManagerAndDriver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','DRIVER','MANAGER') NOT NULL,
  `username` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `region` varchar(255) NOT NULL,
  `status` enum('IDLE','ON_ROUTE','REST') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK73pcydbur7ap0v0abheab5sfr` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
INSERT INTO `Member` VALUES (1,'2024-11-08 16:35:29.340896','2024-11-08 16:35:29.340896','김현지','$2a$10$shQi73y2Nzuf45pssiMTfePDX5eLHlIWF1vbgyXk0MgcNAcLmKeXK','DRIVER','test1234','010-2850-9910',NULL,'광주','ON_ROUTE'),(2,'2024-11-11 11:53:31.942720','2024-11-11 11:53:31.942720','이예지','$2a$10$01gBNKQuxQHCzo6crvWAWeEKlKsjKJgWtRPtL4N3z5NSmFVBzdgBy','DRIVER','test12','010-2947-0098',NULL,'전남','IDLE'),(3,'2024-11-13 09:10:10.676659','2024-11-13 09:10:10.676659','관리자','$2a$10$AsspfF5GhahI4NtUBoYKnOARGro2HnR29sWK/cKxhzMFCaeDe0eDC','ADMIN','iamnotadmin','010-7483-4622',NULL,'서울','IDLE'),(4,'2024-11-13 09:10:45.633103','2024-11-13 09:10:45.633103','송준혁','$2a$10$Igd7NBGDem1L61vR.AF5WuXkmZhNnvuwdBbyyUJXGkLpI2fZxYlIy','MANAGER','iamnotmanager','010-2947-4288',NULL,'인천','IDLE'),(5,'2024-11-13 09:12:19.360389','2024-11-13 09:12:19.360389','이정준','$2a$10$dPJHP4982m3Hj1QHAsp5YuOzhaj/JnyRozOdJ/IoQ3sMrn9NhHOaq','DRIVER','iamnotdriver','010-5821-1729',NULL,'전남','ON_ROUTE'),(6,'2024-11-17 19:14:29.037032','2024-11-17 19:14:29.037032','정우영','$2a$10$/GmOJeAadi0SjXHQBzKgvuwOOYI/YXvfYBxYCs12CcnGLlIeWJ.XC','DRIVER','test9','010-2213-2512',NULL,'서울','REST'),(7,'2024-11-17 19:21:30.611941','2024-11-17 19:21:30.611941','이도훈','$2a$10$HBEy1d4/GXvfmva.C4rzIeTX8Zv9NeQJZyQXjv8VgM7./cW6aO2ha','DRIVER','test123','010-4821-1292',NULL,'서울','ON_ROUTE'),(8,'2024-11-17 19:30:40.696068','2024-11-17 19:30:40.696068','박건국','$2a$10$TeTOVJe2uLMkp/5OYKyk9uS2B3ivT95DLulgpXZFYNweIWvaC6Q/G','DRIVER','qwer12','010-2957-2941',NULL,'광주','IDLE'),(9,'2024-11-18 11:50:29.325667','2024-11-18 11:50:29.325667','조정훈','$2a$10$s227M31ANqCILKT7GnKNrukCezoT3cGfMBqn8bBePxn6i2frF8XSa','DRIVER','dlswns','010-9357-1294',NULL,'부산','IDLE');
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicle`
--

DROP TABLE IF EXISTS `Vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehicle` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `alertType` enum('ALARM','DISABLED','VOICE') NOT NULL,
  `inUse` bit(1) NOT NULL,
  `vehicleNumber` varchar(255) NOT NULL,
  `driver_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9sv39ti2yxum3v6eugmikbyey` (`driver_id`),
  CONSTRAINT `FKn5t8eq2sg2tjc6fhk4pio9686` FOREIGN KEY (`driver_id`) REFERENCES `Member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicle`
--

LOCK TABLES `Vehicle` WRITE;
/*!40000 ALTER TABLE `Vehicle` DISABLE KEYS */;
INSERT INTO `Vehicle` VALUES (1,'2024-11-14 20:11:22.800571','2024-11-14 20:12:19.786551','DISABLED',_binary '\0','801나 1829',5),(2,'2024-11-18 21:00:47.628648','2024-11-18 21:07:54.190462','DISABLED',_binary '\0','801가 2912',1),(3,'2024-11-18 21:00:53.571332','2024-11-18 21:08:07.663873','DISABLED',_binary '\0','801가 2913',2),(4,'2024-11-18 21:00:56.037134','2024-11-18 21:08:21.717810','DISABLED',_binary '\0','801가 2917',6),(5,'2024-11-18 21:01:04.335172','2024-11-18 21:08:24.509923','DISABLED',_binary '\0','803라 8192',7),(6,'2024-11-18 21:01:06.981667','2024-11-18 21:08:27.952766','DISABLED',_binary '\0','803라 8194',8),(7,'2024-11-18 21:01:29.465610','2024-11-18 21:08:31.729060','DISABLED',_binary '\0','803라 9917',9);
/*!40000 ALTER TABLE `Vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VehicleControlHistory`
--

DROP TABLE IF EXISTS `VehicleControlHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VehicleControlHistory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdDate` datetime(6) DEFAULT NULL,
  `modifiedDate` datetime(6) DEFAULT NULL,
  `controlType` enum('LIGHT','MOTOR','VIBRATION','WINDOW') DEFAULT NULL,
  `driverStatus` enum('ASLEEP','LOST_FOCUS','NORMAL') DEFAULT NULL,
  `manager_id` bigint DEFAULT NULL,
  `vehicle_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK868ofe5dxf0jwmhhc7idnr6ij` (`manager_id`),
  KEY `FKf1ag92uajmn2e2nwavmvj6mca` (`vehicle_id`),
  CONSTRAINT `FK868ofe5dxf0jwmhhc7idnr6ij` FOREIGN KEY (`manager_id`) REFERENCES `Member` (`id`),
  CONSTRAINT `FKf1ag92uajmn2e2nwavmvj6mca` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VehicleControlHistory`
--

LOCK TABLES `VehicleControlHistory` WRITE;
/*!40000 ALTER TABLE `VehicleControlHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `VehicleControlHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19  2:17:02
