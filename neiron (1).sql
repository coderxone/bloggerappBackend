-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2020 at 10:42 AM
-- Server version: 8.0.16
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neiron`
--

-- --------------------------------------------------------

--
-- Table structure for table `appParams`
--

CREATE TABLE `appParams` (
  `id` bigint(20) NOT NULL,
  `pricevideo` int(11) NOT NULL,
  `peoplecount` bigint(20) NOT NULL DEFAULT '0',
  `minviews` int(11) NOT NULL DEFAULT '0',
  `minvideos` int(11) NOT NULL DEFAULT '0',
  `workPrice` decimal(10,2) NOT NULL,
  `mintaskcount` int(20) NOT NULL,
  `stockprice` decimal(10,2) NOT NULL,
  `totalStock` int(11) NOT NULL,
  `countBoughtstocks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `appParams`
--

INSERT INTO `appParams` (`id`, `pricevideo`, `peoplecount`, `minviews`, `minvideos`, `workPrice`, `mintaskcount`, `stockprice`, `totalStock`, `countBoughtstocks`) VALUES
(1, 100, 0, 100, 1, '1.00', 20, '100.00', 10000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `carddata`
--

CREATE TABLE `carddata` (
  `id` bigint(20) NOT NULL,
  `cardnumber` bigint(20) NOT NULL,
  `cardname` varchar(200) NOT NULL,
  `location_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location_point` text NOT NULL,
  `address` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `bankname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carddata`
--

INSERT INTO `carddata` (`id`, `cardnumber`, `cardname`, `location_name`, `location_point`, `address`, `user_email`, `bankname`) VALUES
(4, 4444444444444441, 'amir tyras', 'New York', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:3:{i:0;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:8:\"New York\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:2:\"NY\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:109:\"<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:17:\"New York, NY, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:40.7127753;s:3:\"lng\";d:-74.0059728;}s:8:\"viewport\";a:4:{s:5:\"south\";d:40.4773991;s:4:\"west\";d:-74.25908989999999;s:5:\"north\";d:40.9175771;s:4:\"east\";d:-73.7002721;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7eae6a016a9c6f58e2044573fb8f14227b6e1f96\";s:4:\"name\";s:8:\"New York\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:498;s:17:\"html_attributions\";a:1:{i:0;s:86:\"<a href=\"https://maps.google.com/maps/contrib/110599717529221836319/photos\">Amer Z</a>\";}s:5:\"width\";i:999;}i:1;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/109563403909369877892/photos\">Manfred White</a>\";}s:5:\"width\";i:600;}i:2;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/110161312347829694373/photos\">Roisin McGarry</a>\";}s:5:\"width\";i:1080;}i:3;a:3:{s:6:\"height\";i:720;s:17:\"html_attributions\";a:1:{i:0;s:109:\"<a href=\"https://maps.google.com/maps/contrib/109211857686808261282/photos\">Вячеслав Сысоев</a>\";}s:5:\"width\";i:1280;}i:4;a:3:{s:6:\"height\";i:1082;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/104726016541182086111/photos\">giacomo orlando</a>\";}s:5:\"width\";i:1080;}i:5;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/111376783004243095356/photos\">Allen Todd</a>\";}s:5:\"width\";i:2268;}i:6;a:3:{s:6:\"height\";i:3006;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/102539025756009807530/photos\">Barbara Felder</a>\";}s:5:\"width\";i:5344;}i:7;a:3:{s:6:\"height\";i:3840;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/108734159295953479798/photos\">sriram *</a>\";}s:5:\"width\";i:2160;}i:8;a:3:{s:6:\"height\";i:3036;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/112016336994989292437/photos\">Hillary Dovel</a>\";}s:5:\"width\";i:4048;}i:9;a:3:{s:6:\"height\";i:2048;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/116808183867255260610/photos\">Ramón Vinyeta</a>\";}s:5:\"width\";i:1536;}}s:8:\"place_id\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:9:\"reference\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:87:\"https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62\";s:10:\"utc_offset\";i:-240;s:8:\"vicinity\";s:8:\"New York\";s:7:\"website\";s:19:\"http://www.nyc.gov/\";s:17:\"html_attributions\";a:0:{}}}}', '1225 flushing ave', '2clickorg@gmail.com', 'american bank'),
(5, 4443222345332235, 'aibit carlos', 'Los Angeles', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:4:{i:0;a:3:{s:9:\"long_name\";s:11:\"Los Angeles\";s:10:\"short_name\";s:11:\"Los Angeles\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Los Angeles County\";s:10:\"short_name\";s:18:\"Los Angeles County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:112:\"<span class=\"locality\">Los Angeles</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:20:\"Los Angeles, CA, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:34.0522342;s:3:\"lng\";d:-118.2436849;}s:8:\"viewport\";a:4:{s:5:\"south\";d:33.7036519;s:4:\"west\";d:-118.6681759;s:5:\"north\";d:34.3373061;s:4:\"east\";d:-118.1552891;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7f7b7d8118ae8db8ed3f541159ac928c484d12ad\";s:4:\"name\";s:11:\"Los Angeles\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:535;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/103332637656610292865/photos\">Roony Golf</a>\";}s:5:\"width\";i:802;}i:1;a:3:{s:6:\"height\";i:678;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/104450334649774418724/photos\">Uriel Nieto</a>\";}s:5:\"width\";i:1200;}i:2;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:96:\"<a href=\"https://maps.google.com/maps/contrib/105049828994536941898/photos\">Michaela Müller</a>\";}s:5:\"width\";i:2448;}i:3;a:3:{s:6:\"height\";i:433;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/104949121987198987785/photos\">Vladimir Iliev</a>\";}s:5:\"width\";i:650;}i:4;a:3:{s:6:\"height\";i:1920;s:17:\"html_attributions\";a:1:{i:0;s:105:\"<a href=\"https://maps.google.com/maps/contrib/109264179898303407123/photos\">Martín Suárez Carzoglio</a>\";}s:5:\"width\";i:2560;}i:5;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:96:\"<a href=\"https://maps.google.com/maps/contrib/101894883490462941291/photos\">The Mojado Power</a>\";}s:5:\"width\";i:1536;}i:6;a:3:{s:6:\"height\";i:3265;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/104194521796425707300/photos\">TRAN AN</a>\";}s:5:\"width\";i:4898;}i:7;a:3:{s:6:\"height\";i:565;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/104949121987198987785/photos\">Vladimir Iliev</a>\";}s:5:\"width\";i:850;}i:8;a:3:{s:6:\"height\";i:960;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/100122364025727921400/photos\">William andry</a>\";}s:5:\"width\";i:1280;}i:9;a:3:{s:6:\"height\";i:2080;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/111996083847537481108/photos\">Józef Jakubina</a>\";}s:5:\"width\";i:4160;}}s:8:\"place_id\";s:27:\"ChIJE9on3F3HwoAR9AhGJW_fL-I\";s:9:\"reference\";s:27:\"ChIJE9on3F3HwoAR9AhGJW_fL-I\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:90:\"https://maps.google.com/?q=Los+Angeles,+CA,+USA&ftid=0x80c2c75ddc27da13:0xe22fdf6f254608f4\";s:10:\"utc_offset\";i:-420;s:8:\"vicinity\";s:11:\"Los Angeles\";s:7:\"website\";s:22:\"http://www.lacity.org/\";s:17:\"html_attributions\";a:0:{}}}}', '9 street', '2clickorg@gmail.com', 'fargo bank');

-- --------------------------------------------------------

--
-- Table structure for table `complete_approve_task`
--

CREATE TABLE `complete_approve_task` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL COMMENT 'user complete task',
  `task_id` bigint(20) NOT NULL COMMENT 'UsersData table id',
  `payed` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complete_approve_task`
--

INSERT INTO `complete_approve_task` (`id`, `user_email`, `task_id`, `payed`) VALUES
(56, '2clickorg@gmail.com', 38, 0),
(57, '2clickorg@gmail.com', 40, 0);

-- --------------------------------------------------------

--
-- Table structure for table `complete_task`
--

CREATE TABLE `complete_task` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL COMMENT 'user complete task',
  `task_id` bigint(20) NOT NULL COMMENT 'UsersData table id',
  `payed` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complete_task`
--

INSERT INTO `complete_task` (`id`, `user_email`, `task_id`, `payed`) VALUES
(6, '2clickorg@gmail.com', 37, 0),
(7, '2clickorg@gmail.com', 35, 0);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` bigint(20) NOT NULL,
  `ru_kzt_russia` decimal(10,2) NOT NULL DEFAULT '0.00',
  `ru_usd` decimal(10,2) NOT NULL DEFAULT '0.00',
  `unix_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `ru_kzt_russia`, `ru_usd`, `unix_time`) VALUES
(1, '5.88', '76.00', '1606127607945');

-- --------------------------------------------------------

--
-- Table structure for table `EmailTasks`
--

CREATE TABLE `EmailTasks` (
  `id` bigint(20) NOT NULL,
  `data` text NOT NULL COMMENT 'html data',
  `date` int(11) NOT NULL COMMENT 'created date',
  `role` int(11) NOT NULL DEFAULT '4' COMMENT 'role'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EmailTasks`
--

INSERT INTO `EmailTasks` (`id`, `data`, `date`, `role`) VALUES
(1, '<h1>test data</h1>', 1234421212, 4);

-- --------------------------------------------------------

--
-- Table structure for table `FavoritefromUsersData`
--

CREATE TABLE `FavoritefromUsersData` (
  `id` bigint(20) NOT NULL,
  `usersdata_page_Id` bigint(100) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `FavoritefromUsersData`
--

INSERT INTO `FavoritefromUsersData` (`id`, `usersdata_page_Id`, `email`) VALUES
(4, 24, 'astana7777777@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text NOT NULL,
  `prioritynumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `title`, `text`, `prioritynumber`) VALUES
(1, NULL, 'Completed task is the video you created. You must tell in a video about the topic of the assignment. The task is considered completed after a set of views in the task counter. For the view counter to work, you must click on the \"copy url to share\" button to copy the link and paste it under the video on YouTube and Instagram. So that people follow it. The accumulated number of clicks on the link serves as a guarantee that the task is completed correctly.', NULL),
(2, NULL, 'You must specify the banking information in the tab \"Bank Information\" so that at the end of the required number of tasks you can receive payments.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `investors`
--

CREATE TABLE `investors` (
  `id` bigint(20) NOT NULL,
  `sum` decimal(10,2) NOT NULL,
  `stockprice` bigint(20) NOT NULL,
  `count` decimal(10,2) NOT NULL,
  `useremail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investors`
--

INSERT INTO `investors` (`id`, `sum`, `stockprice`, `count`, `useremail`) VALUES
(1, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(2, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(3, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(4, '1000.00', 100, '10.00', '2clickorg@gmail.com'),
(5, '1000.00', 100, '10.00', '2clickorg@gmail.com'),
(6, '11.00', 100, '0.00', '2clickorg@gmail.com'),
(7, '11.00', 100, '0.11', '2clickorg@gmail.com'),
(8, '1.00', 100, '0.00', '2clickorg@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `id` bigint(20) NOT NULL,
  `fromEmail` varchar(60) NOT NULL,
  `toEmail` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `date` bigint(100) NOT NULL,
  `read_status` int(100) NOT NULL DEFAULT '0' COMMENT '0 - false, 1 - true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`id`, `fromEmail`, `toEmail`, `message`, `date`, `read_status`) VALUES
(1, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test1', 1556578455340, 1),
(2, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test2', 1556578484154, 1),
(3, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test3', 1556584446728, 1),
(4, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test 4', 1556584609127, 1),
(5, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'dfdfdfd', 1556585722029, 1),
(6, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'ssd', 1556585983535, 1),
(7, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', '', 1556585987470, 1),
(8, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test6', 1556586010654, 1),
(9, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test7', 1556586037350, 1),
(10, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test8', 1556586051000, 1),
(11, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test 9', 1556588421494, 1),
(12, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test 9', 1556588429260, 1),
(13, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test10', 1556588619082, 1),
(14, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'text', 1556588809580, 1),
(15, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'ssdsds', 1556589491739, 1),
(16, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test', 1556590475758, 1),
(17, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test', 1556590478806, 1),
(18, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test', 1556590479415, 1),
(19, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556590564645, 1),
(20, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556590625079, 1),
(21, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556590654286, 1),
(22, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556590656821, 1),
(23, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556590705918, 1),
(24, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556591007157, 1),
(25, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'dddd', 1556593488418, 1),
(26, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'dddddd', 1556593493012, 1),
(27, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'dddddd', 1556593496336, 1),
(28, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'dddddd', 1556593500680, 1),
(29, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'ddd', 1556593637120, 1),
(30, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594222830, 1),
(31, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594227927, 1),
(32, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594291102, 1),
(33, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594297212, 1),
(34, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594302868, 1),
(35, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594358918, 1),
(36, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', '', 1556594374550, 1),
(37, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594380799, 1),
(38, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594416626, 1),
(39, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556594442378, 1),
(40, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test4', 1556594447024, 1),
(41, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test', 1556594487431, 1),
(42, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test5', 1556594552376, 1),
(43, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test6', 1556594567019, 1),
(44, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test7', 1556594578767, 1),
(45, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', '', 1556595045093, 1),
(46, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'test', 1556595115786, 1),
(47, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test5', 1556663714625, 1),
(48, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test5', 1556664736342, 1),
(49, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'teee', 1556665145933, 1),
(50, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'eerere', 1556665151913, 1),
(51, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test5', 1556665311399, 1),
(52, 'astana7777777@gmail.com', 'electroninsuranse@gmail.com', 'teee', 1556665326333, 1),
(53, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'dfdfd', 1556665435397, 1),
(54, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test read message', 1556824616781, 1),
(55, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'test read2', 1556824852818, 1),
(56, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'teetete', 1556824985730, 1),
(57, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'csdssds', 1556825023605, 1),
(58, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'testttte', 1556825118111, 1),
(59, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'sdssdsds', 1556825169192, 1),
(60, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'sdssdsd', 1556825276734, 1),
(61, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'ddfdfdfd', 1556825387506, 1),
(62, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'dfdfdfdfd', 1556825467778, 1),
(63, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'dfdfdfdfd', 1556825631269, 1),
(64, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'fdfddfd', 1556825716300, 1),
(65, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'fdfdfdfd', 1556825731305, 1),
(66, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'tetetete', 1556825765946, 1),
(67, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'ddfdfdfd', 1556825776939, 1),
(68, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'latest message', 1556825997078, 1),
(69, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'last message', 1556826026526, 1),
(70, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'testes', 1556826124450, 1),
(71, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'latest test', 1556828184078, 1),
(72, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'dddd', 1556828201864, 1),
(73, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'new message', 1556840047316, 1),
(74, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'ddfdfdf', 1556840192281, 1),
(75, 'astana7777777@gmail.com', 'gulim10071991@gmail.com', 'sdsdssdsds', 1557722786665, 1),
(76, 'astana7777777@gmail.com', 'gulim10071991@gmail.com', 'sdsdsdsdsds', 1557722786665, 1),
(77, 'electroninsuranse@gmail.com', 'astana7777777@gmail.com', 'Проверьте пожалуйста свой список задач', 1565562465248, 1),
(78, 'electroninsuranse@gmail.com', 'neirointellectinfo@gmail.com', 'Проверьте пожалуйста свой список задач', 1566613974298, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payout`
--

CREATE TABLE `payout` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `sum` decimal(10,2) NOT NULL,
  `date` bigint(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payout`
--

INSERT INTO `payout` (`id`, `user_email`, `sum`, `date`, `status`) VALUES
(2, '2clickorg@gmail.com', '1.00', 1565133592, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sendmessages`
--

CREATE TABLE `sendmessages` (
  `id` bigint(20) NOT NULL,
  `text` text NOT NULL,
  `type` int(1) NOT NULL COMMENT '1 - after registration',
  `role` int(11) NOT NULL,
  `fromEmail` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sendmessages`
--

INSERT INTO `sendmessages` (`id`, `text`, `type`, `role`, `fromEmail`) VALUES
(1, 'Проверьте пожалуйста свой список задач', 1, 1, 'neirointellectinfo@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `TimesLogs`
--

CREATE TABLE `TimesLogs` (
  `id` bigint(20) NOT NULL,
  `insideTime` bigint(100) NOT NULL DEFAULT '0',
  `outsideTime` bigint(100) NOT NULL DEFAULT '0',
  `roomId` bigint(100) NOT NULL,
  `userId` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TimesLogs`
--

INSERT INTO `TimesLogs` (`id`, `insideTime`, `outsideTime`, `roomId`, `userId`) VALUES
(46, 1555355773099, 1555355764725, 16, 1),
(47, 1555355799376, 1555355798700, 16, 4),
(48, 1555355867645, 1555355866987, 16, 3),
(49, 1555358412889, 1555358407449, 16, 1),
(50, 1555358421482, 1555358419603, 16, 2);

-- --------------------------------------------------------

--
-- Table structure for table `uniquenames`
--

CREATE TABLE `uniquenames` (
  `id` bigint(20) NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `uniquenames`
--

INSERT INTO `uniquenames` (`id`, `project_id`, `user_email`, `hash`) VALUES
(1, 38, '2clickorg@gmil.com', 'r3B2Sx6PMUf1erjwyL2F3s'),
(2, 38, '2clickorg@gmil.com', '3Rf572Wzt8xDeSsfYuLHHF'),
(3, 38, '2clickorg@gmail.com', 'oJTBPYRLt3Err9zeDuWngh'),
(4, 35, '2clickorg@gmail.com', '8etfaL7gCgtkkLQwJrecvi'),
(5, 40, '2clickorg@gmail.com', 'nErWSi77rAdFjoM3PvYtvU');

-- --------------------------------------------------------

--
-- Table structure for table `UserApproveTasks`
--

CREATE TABLE `UserApproveTasks` (
  `id` bigint(20) NOT NULL,
  `fromPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `toPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date` bigint(100) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sum` decimal(10,0) NOT NULL,
  `time` bigint(100) NOT NULL,
  `weight` int(100) DEFAULT NULL,
  `status` int(100) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_points` text,
  `peoplecount` bigint(100) DEFAULT NULL,
  `pay_status` int(11) NOT NULL DEFAULT '0',
  `countvideo` int(11) NOT NULL DEFAULT '0',
  `lat` float(10,6) DEFAULT NULL,
  `lng` float(10,6) DEFAULT NULL,
  `countarticles` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL DEFAULT '1',
  `approvetask` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `UserApproveTasks`
--

INSERT INTO `UserApproveTasks` (`id`, `fromPoint`, `toPoint`, `date`, `description`, `role`, `email`, `sum`, `time`, `weight`, `status`, `url`, `location_name`, `location_points`, `peoplecount`, `pay_status`, `countvideo`, `lat`, `lng`, `countarticles`, `priority`, `approvetask`) VALUES
(38, NULL, NULL, 1562731200000, 'TEST', 2, 'gulim10071991@gmail.com', '126', 1562739925954, NULL, 1, 'http://kazpoisk.kz', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:2;a:3:{s:6:\"height\";i:2534;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101282448764437270487/photos\">Luis Larco</a>\";}s:5:\"width\";i:10040;}i:3;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:4;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:5;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:6;a:3:{s:6:\"height\";i:1836;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/104537838038272350709/photos\">Carol McCarty</a>\";}s:5:\"width\";i:3264;}i:7;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:8;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:99:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina Schützle</a>\";}s:5:\"width\";i:914;}i:9;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101529687799567002536/photos\">Adam Duerk</a>\";}s:5:\"width\";i:1836;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 3, 37.090240, -95.712891, 10, 10, 1),
(40, NULL, NULL, 1564545600000, 'test', 2, '2clickorg@gmail.com', '100', 1564629750516, NULL, 1, 'http://test.kz', 'San Francisco', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"San Francisco\";s:10:\"short_name\";s:2:\"SF\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:20:\"San Francisco County\";s:10:\"short_name\";s:20:\"San Francisco County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:114:\"<span class=\"locality\">San Francisco</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:22:\"San Francisco, CA, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.7749295;s:3:\"lng\";d:-122.41941550000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:37.70339999999999;s:4:\"west\";d:-122.52699999999999;s:5:\"north\";d:37.812;s:4:\"east\";d:-122.34820000000002;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a\";s:4:\"name\";s:13:\"San Francisco\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:588;s:17:\"html_attributions\";a:1:{i:0;s:92:\"<a href=\"https://maps.google.com/maps/contrib/105610147900941467457/photos\">ozioma erike</a>\";}s:5:\"width\";i:736;}i:1;a:3:{s:6:\"height\";i:854;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/101523784147670981135/photos\">Alex Romero</a>\";}s:5:\"width\";i:960;}i:2;a:3:{s:6:\"height\";i:2770;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/102346012754464346877/photos\">Dholyan</a>\";}s:5:\"width\";i:5775;}i:3;a:3:{s:6:\"height\";i:1102;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/113482343908983147932/photos\">Randolfo Santos</a>\";}s:5:\"width\";i:735;}i:4;a:3:{s:6:\"height\";i:1536;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/118366622035212955924/photos\">Ray Gallagher</a>\";}s:5:\"width\";i:2048;}i:5;a:3:{s:6:\"height\";i:1852;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/112550240505523839845/photos\">Stacey R</a>\";}s:5:\"width\";i:3192;}i:6;a:3:{s:6:\"height\";i:2736;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/110404506754636833347/photos\">Mat San</a>\";}s:5:\"width\";i:3648;}i:7;a:3:{s:6:\"height\";i:1440;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/108340892165463045643/photos\">joan manel rovira fernandez</a>\";}s:5:\"width\";i:1440;}i:8;a:3:{s:6:\"height\";i:1089;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/103762737330285100881/photos\">vienna boy</a>\";}s:5:\"width\";i:1452;}i:9;a:3:{s:6:\"height\";i:3096;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/104045426349853231072/photos\">michael scanlon</a>\";}s:5:\"width\";i:4128;}}s:8:\"place_id\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:9:\"reference\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:92:\"https://maps.google.com/?q=San+Francisco,+CA,+USA&ftid=0x80859a6d00690021:0x4a501367f076adff\";s:10:\"utc_offset\";i:-420;s:8:\"vicinity\";s:13:\"San Francisco\";s:7:\"website\";s:17:\"http://sfgov.org/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 3, 37.774929, -122.419418, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '0',
  `image_url` varchar(255) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL DEFAULT '0',
  `phone` varchar(50) NOT NULL DEFAULT '0',
  `online` int(50) NOT NULL DEFAULT '0' COMMENT 'true = 1, false = 0',
  `online_latest_time` bigint(100) NOT NULL DEFAULT '0' COMMENT 'latest online time',
  `socketid` varchar(255) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `firebaseToken` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'not',
  `webtoken` varchar(255) NOT NULL DEFAULT 'not',
  `approvestatus` int(11) DEFAULT '0' COMMENT '0 dont approve default,1 approved - all task completed',
  `sendmail_status` int(11) NOT NULL DEFAULT '1' COMMENT 'send email service'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `image_url`, `role`, `phone`, `online`, `online_latest_time`, `socketid`, `password`, `firebaseToken`, `webtoken`, `approvestatus`, `sendmail_status`) VALUES
(10, 'Dulat A', 'astana7777777@gmail.com', 'https://lh4.googleusercontent.com/-Y2EJgSMb5Gk/AAAAAAAAAAI/AAAAAAAAAe0/rpIte2XUERg/s96-c/photo.jpg', 1, '+77081110019', 0, 1562728401181, 'E2m3vaHlRBGTxg33AAAD', '12', 'not', 'not', 0, 2),
(11, 'Electron Insuranse', 'electroninsuranse@gmail.com', 'https://lh6.googleusercontent.com/-AdCV33Isw8M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rffkZZf7XZ3uz2QT-cmVe2pmwOBIA/s96-c/photo.jpg', 2, '+77081110019', 0, 1557732039562, 'GWSvR6c_yb9JtnhEAAAA', '0', 'not', 'not', 0, 2),
(39, 'name12', 'u@gmail.com', '0', 1, '+19179820851', 0, 1557558253722, 'S2T52IKp0l5duL3FAAAC', '12', 'not', 'not', 0, 2),
(50, 'Gulim Kanatovna', 'gulim10071991@gmail.com', 'https://lh3.googleusercontent.com/--BvBB0Aclv4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdnMQMpcdcSEKQc28Du668b0cCDzQ/s96-c/photo.jpg', 2, '+15075911237', 0, 1562729380784, 'uxIpSJx7UmfZLRtBAAAN', '0', 'not', 'not', 0, 2),
(59, 'kazpoisk neiron', 'neirointellectinfo@gmail.com', 'https://lh6.googleusercontent.com/-klcgICAoeqo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfgfW184mfojn7hVPlTFZsvfdNBcg/s96-c/photo.jpg', 3, '+12334444455', 0, 1566702418879, '2JJaVAaErSjSn9tsAABP', '0', 'not', 'cZVsVm9BN4o:APA91bE-w4Q2cynhyAWpC9SZFHyf2X8ZPo_CtFc9NPIoQGiNuWSIBo6cGFrEOkoCo1euUPQQ1PEGai-5mI4h6gvTelyhhGD21SIqffWguiFLBo3at9mxEUliyS8PW4uuOnq1nzexEul_', 0, 2),
(61, 'owner', '2clickorg@gmail.com', '0', 2, '+9179820851', 0, 1603986051196, 'kWrWqw7l81IEmaPWAAAA', '12345', 'not', 'not', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `usersarticles`
--

CREATE TABLE `usersarticles` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersarticles`
--

INSERT INTO `usersarticles` (`id`, `url`, `project_id`, `user_email`) VALUES
(1, 'https://drongeek.ru/novichkam/vybiraem-dvigatel#i-9', 38, '2clickorg@gmail.com'),
(2, 'https://www.ecalc.ch/xcoptercalc.php', 38, '2clickorg@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `UsersData`
--

CREATE TABLE `UsersData` (
  `id` bigint(20) NOT NULL,
  `fromPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `toPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date` bigint(100) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sum` decimal(10,0) NOT NULL,
  `time` bigint(100) NOT NULL,
  `weight` int(100) DEFAULT NULL,
  `status` int(100) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_points` text,
  `peoplecount` bigint(100) DEFAULT NULL,
  `pay_status` int(11) NOT NULL DEFAULT '0',
  `countvideo` int(11) NOT NULL DEFAULT '0',
  `lat` float(10,6) DEFAULT NULL,
  `lng` float(10,6) DEFAULT NULL,
  `countarticles` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL DEFAULT '1',
  `approvetask` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `UsersData`
--

INSERT INTO `UsersData` (`id`, `fromPoint`, `toPoint`, `date`, `description`, `role`, `email`, `sum`, `time`, `weight`, `status`, `url`, `location_name`, `location_points`, `peoplecount`, `pay_status`, `countvideo`, `lat`, `lng`, `countarticles`, `priority`, `approvetask`) VALUES
(35, NULL, NULL, 1562299200000, '2lick about', 2, 'gulim10071991@gmail.com', '1', 1562362392248, NULL, 1, '2click.org', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:2;a:3:{s:6:\"height\";i:2534;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101282448764437270487/photos\">Luis Larco</a>\";}s:5:\"width\";i:10040;}i:3;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:4;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:5;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:6;a:3:{s:6:\"height\";i:1836;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/104537838038272350709/photos\">Carol McCarty</a>\";}s:5:\"width\";i:3264;}i:7;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:8;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:99:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina Schützle</a>\";}s:5:\"width\";i:914;}i:9;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101529687799567002536/photos\">Adam Duerk</a>\";}s:5:\"width\";i:1836;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 1200, 1, 1, 37.090240, -95.712891, 0, 1, 0),
(37, NULL, NULL, 1562472000000, 'dfdfddfd', 2, 'gulim10071991@gmail.com', '293', 1562486723001, NULL, 1, 'example.com', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:2;a:3:{s:6:\"height\";i:2534;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101282448764437270487/photos\">Luis Larco</a>\";}s:5:\"width\";i:10040;}i:3;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:4;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:5;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:6;a:3:{s:6:\"height\";i:1836;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/104537838038272350709/photos\">Carol McCarty</a>\";}s:5:\"width\";i:3264;}i:7;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:8;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:99:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina Schützle</a>\";}s:5:\"width\";i:914;}i:9;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101529687799567002536/photos\">Adam Duerk</a>\";}s:5:\"width\";i:1836;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 63600, 1, 1, 37.090240, -95.712891, 0, 1, 0),
(38, NULL, NULL, 1562731200000, 'TEST', 2, 'gulim10071991@gmail.com', '126', 1562739925954, NULL, 1, 'http://kazpoisk.kz', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:2;a:3:{s:6:\"height\";i:2534;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101282448764437270487/photos\">Luis Larco</a>\";}s:5:\"width\";i:10040;}i:3;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:4;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:5;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:6;a:3:{s:6:\"height\";i:1836;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/104537838038272350709/photos\">Carol McCarty</a>\";}s:5:\"width\";i:3264;}i:7;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:8;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:99:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina Schützle</a>\";}s:5:\"width\";i:914;}i:9;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101529687799567002536/photos\">Adam Duerk</a>\";}s:5:\"width\";i:1836;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 1200, 1, 1, 37.090240, -95.712891, 10, 10, 0),
(40, NULL, NULL, 1564545600000, 'test', 2, '2clickorg@gmail.com', '100', 1564629750516, NULL, 1, 'http://test.kz', 'San Francisco', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"San Francisco\";s:10:\"short_name\";s:2:\"SF\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:20:\"San Francisco County\";s:10:\"short_name\";s:20:\"San Francisco County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:114:\"<span class=\"locality\">San Francisco</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:22:\"San Francisco, CA, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.7749295;s:3:\"lng\";d:-122.41941550000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:37.70339999999999;s:4:\"west\";d:-122.52699999999999;s:5:\"north\";d:37.812;s:4:\"east\";d:-122.34820000000002;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a\";s:4:\"name\";s:13:\"San Francisco\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:588;s:17:\"html_attributions\";a:1:{i:0;s:92:\"<a href=\"https://maps.google.com/maps/contrib/105610147900941467457/photos\">ozioma erike</a>\";}s:5:\"width\";i:736;}i:1;a:3:{s:6:\"height\";i:854;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/101523784147670981135/photos\">Alex Romero</a>\";}s:5:\"width\";i:960;}i:2;a:3:{s:6:\"height\";i:2770;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/102346012754464346877/photos\">Dholyan</a>\";}s:5:\"width\";i:5775;}i:3;a:3:{s:6:\"height\";i:1102;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/113482343908983147932/photos\">Randolfo Santos</a>\";}s:5:\"width\";i:735;}i:4;a:3:{s:6:\"height\";i:1536;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/118366622035212955924/photos\">Ray Gallagher</a>\";}s:5:\"width\";i:2048;}i:5;a:3:{s:6:\"height\";i:1852;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/112550240505523839845/photos\">Stacey R</a>\";}s:5:\"width\";i:3192;}i:6;a:3:{s:6:\"height\";i:2736;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/110404506754636833347/photos\">Mat San</a>\";}s:5:\"width\";i:3648;}i:7;a:3:{s:6:\"height\";i:1440;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/108340892165463045643/photos\">joan manel rovira fernandez</a>\";}s:5:\"width\";i:1440;}i:8;a:3:{s:6:\"height\";i:1089;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/103762737330285100881/photos\">vienna boy</a>\";}s:5:\"width\";i:1452;}i:9;a:3:{s:6:\"height\";i:3096;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/104045426349853231072/photos\">michael scanlon</a>\";}s:5:\"width\";i:4128;}}s:8:\"place_id\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:9:\"reference\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:92:\"https://maps.google.com/?q=San+Francisco,+CA,+USA&ftid=0x80859a6d00690021:0x4a501367f076adff\";s:10:\"utc_offset\";i:-420;s:8:\"vicinity\";s:13:\"San Francisco\";s:7:\"website\";s:17:\"http://sfgov.org/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 37.774929, -122.419418, 0, 1, 0),
(42, NULL, NULL, 1564804800000, ' ', 2, '2clickorg@gmail.com', '100', 1564890993899, NULL, 1, 'http://kas.com', 'Russia', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:6:\"Russia\";s:10:\"short_name\";s:2:\"RU\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:40:\"<span class=\"country-name\">Russia</span>\";s:17:\"formatted_address\";s:6:\"Russia\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:61.52401;s:3:\"lng\";d:105.31875600000001;}s:8:\"viewport\";a:4:{s:5:\"south\";i:40;s:4:\"west\";i:27;s:5:\"north\";i:70;s:4:\"east\";i:179;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"3f14907a93797a1e130cd8faca37906f1389995a\";s:4:\"name\";s:6:\"Russia\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:720;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/107753272111097591230/photos\">javier esteban</a>\";}s:5:\"width\";i:720;}i:1;a:3:{s:6:\"height\";i:526;s:17:\"html_attributions\";a:1:{i:0;s:103:\"<a href=\"https://maps.google.com/maps/contrib/116763479770200733815/photos\">Arvinthking Arvinthking</a>\";}s:5:\"width\";i:940;}i:2;a:3:{s:6:\"height\";i:1000;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/110337096860051233702/photos\">Sunil Thaor</a>\";}s:5:\"width\";i:750;}i:3;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:100:\"<a href=\"https://maps.google.com/maps/contrib/105192808379985901513/photos\">Stanislav Samburskiy</a>\";}s:5:\"width\";i:3024;}i:4;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/109822148804361708727/photos\">nafaa dz</a>\";}s:5:\"width\";i:600;}i:5;a:3:{s:6:\"height\";i:4000;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/100363126765819627404/photos\">Eduardo Vidal</a>\";}s:5:\"width\";i:6000;}i:6;a:3:{s:6:\"height\";i:3255;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/103482420329483006026/photos\">Alexey S</a>\";}s:5:\"width\";i:4883;}i:7;a:3:{s:6:\"height\";i:4128;s:17:\"html_attributions\";a:1:{i:0;s:113:\"<a href=\"https://maps.google.com/maps/contrib/113870914075750086387/photos\">Наталия Должикова</a>\";}s:5:\"width\";i:3096;}i:8;a:3:{s:6:\"height\";i:667;s:17:\"html_attributions\";a:1:{i:0;s:86:\"<a href=\"https://maps.google.com/maps/contrib/117910251562300487047/photos\">Kirill</a>\";}s:5:\"width\";i:1000;}i:9;a:3:{s:6:\"height\";i:1024;s:17:\"html_attributions\";a:1:{i:0;s:97:\"<a href=\"https://maps.google.com/maps/contrib/112356836870203145786/photos\">Benjamin P. Ellis</a>\";}s:5:\"width\";i:1536;}}s:8:\"place_id\";s:27:\"ChIJ-yRniZpWPEURE_YRZvj9CRQ\";s:9:\"reference\";s:27:\"ChIJ-yRniZpWPEURE_YRZvj9CRQ\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:76:\"https://maps.google.com/?q=Russia&ftid=0x453c569a896724fb:0x1409fdf86611f613\";s:10:\"utc_offset\";i:420;s:7:\"website\";s:18:\"http://www.gov.ru/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 61.524010, 105.318756, 0, 1, 0),
(43, NULL, NULL, 1564891200000, '1. You should make video about stream comunity and say text in video. \r\nText \"Good day everyone! I join the community stream effect because I want to make money talking about various projects on my channels with the whole community. Community Stream Effect - This is when people work together promoting one product. I advise you to join the community or use the services of the streaming community, and everyone will find out about your business, because every member of our community will tell about it. Come on stream.io I will leave the link under the video. Thanks!\" It will entrance examination for you. Thanks!', 2, '2clickorg@gmail.com', '100', 1564896784764, NULL, 1, 'http://stream.io', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/103700589738958165786/photos\">Kettering</a>\";}s:5:\"width\";i:2988;}i:2;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:3;a:3:{s:6:\"height\";i:402;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/104494000466617447205/photos\">Manju Gupta</a>\";}s:5:\"width\";i:720;}i:4;a:3:{s:6:\"height\";i:3303;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/112477639438108541847/photos\">Farida Astreani</a>\";}s:5:\"width\";i:4843;}i:5;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:6;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:7;a:3:{s:6:\"height\";i:1944;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/115797438876271741733/photos\">Kenny Reed</a>\";}s:5:\"width\";i:2592;}i:8;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/110304708925818081691/photos\">Don Gleeson</a>\";}s:5:\"width\";i:2988;}i:9;a:3:{s:6:\"height\";i:600;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/114173531507304228614/photos\">Rick Rendon</a>\";}s:5:\"width\";i:900;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 37.090240, -95.712891, 0, 10, 0),
(44, NULL, NULL, 1566014400000, 'test.com', 2, '2clickorg@gmail.com', '100', 1566031985513, NULL, 1, 'http://test.com', 'New York', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:3:{i:0;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:8:\"New York\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:2:\"NY\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:109:\"<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:17:\"New York, NY, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:40.7127753;s:3:\"lng\";d:-74.0059728;}s:8:\"viewport\";a:4:{s:5:\"south\";d:40.4773991;s:4:\"west\";d:-74.25908989999999;s:5:\"north\";d:40.9175771;s:4:\"east\";d:-73.7002721;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7eae6a016a9c6f58e2044573fb8f14227b6e1f96\";s:4:\"name\";s:8:\"New York\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:1;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/109563403909369877892/photos\">Manfred White</a>\";}s:5:\"width\";i:600;}i:2;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/110161312347829694373/photos\">Roisin McGarry</a>\";}s:5:\"width\";i:1080;}i:3;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina</a>\";}s:5:\"width\";i:914;}i:4;a:3:{s:6:\"height\";i:3006;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/102539025756009807530/photos\">Barbara Felder</a>\";}s:5:\"width\";i:5344;}i:5;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:98:\"<a href=\"https://maps.google.com/maps/contrib/100282683248686649512/photos\">Carolina Abuchalja</a>\";}s:5:\"width\";i:3024;}i:6;a:3:{s:6:\"height\";i:3036;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/112016336994989292437/photos\">Hillary Dovel</a>\";}s:5:\"width\";i:4048;}i:7;a:3:{s:6:\"height\";i:1200;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/116982568915071656346/photos\">David VanHelden</a>\";}s:5:\"width\";i:3840;}i:8;a:3:{s:6:\"height\";i:1398;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/116522566196014882453/photos\">Rade Spasovski</a>\";}s:5:\"width\";i:2048;}i:9;a:3:{s:6:\"height\";i:4048;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/111761530785391278514/photos\">Juraj Maksi</a>\";}s:5:\"width\";i:3036;}}s:8:\"place_id\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:9:\"reference\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:87:\"https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62\";s:10:\"utc_offset\";i:-240;s:8:\"vicinity\";s:8:\"New York\";s:7:\"website\";s:19:\"http://www.nyc.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 40.712776, -74.005974, 0, 1, 0),
(45, NULL, NULL, 1570766400000, 'success', 2, '2clickorg@gmail.com', '100', 1570841010301, NULL, 1, 'http://success.io', 'New York', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:3:{i:0;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:8:\"New York\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:2:\"NY\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:109:\"<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:17:\"New York, NY, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:40.7127753;s:3:\"lng\";d:-74.0059728;}s:8:\"viewport\";a:4:{s:5:\"south\";d:40.4773991;s:4:\"west\";d:-74.25908989999999;s:5:\"north\";d:40.9175771;s:4:\"east\";d:-73.7002721;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7eae6a016a9c6f58e2044573fb8f14227b6e1f96\";s:4:\"name\";s:8:\"New York\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:1;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/109563403909369877892/photos\">Manfred White</a>\";}s:5:\"width\";i:600;}i:2;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/110161312347829694373/photos\">Roisin McGarry</a>\";}s:5:\"width\";i:1080;}i:3;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina</a>\";}s:5:\"width\";i:914;}i:4;a:3:{s:6:\"height\";i:3006;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/102539025756009807530/photos\">Barbara Felder</a>\";}s:5:\"width\";i:5344;}i:5;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:98:\"<a href=\"https://maps.google.com/maps/contrib/100282683248686649512/photos\">Carolina Abuchalja</a>\";}s:5:\"width\";i:3024;}i:6;a:3:{s:6:\"height\";i:3036;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/112016336994989292437/photos\">Hillary Dovel</a>\";}s:5:\"width\";i:4048;}i:7;a:3:{s:6:\"height\";i:1200;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/116982568915071656346/photos\">David VanHelden</a>\";}s:5:\"width\";i:3840;}i:8;a:3:{s:6:\"height\";i:1398;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/116522566196014882453/photos\">Rade Spasovski</a>\";}s:5:\"width\";i:2048;}i:9;a:3:{s:6:\"height\";i:4048;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/111761530785391278514/photos\">Juraj Maksi</a>\";}s:5:\"width\";i:3036;}}s:8:\"place_id\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:9:\"reference\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:87:\"https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62\";s:10:\"utc_offset\";i:-240;s:8:\"vicinity\";s:8:\"New York\";s:7:\"website\";s:19:\"http://www.nyc.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 40.712776, -74.005974, 0, 1, 0),
(46, NULL, NULL, 1570852800000, 'https://e.mail.ru/messages/inbox/', 2, '2clickorg@gmail.com', '100', 1570893461809, NULL, 1, 'https://e.mail.ru/messages/inbox/', 'New York', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:3:{i:0;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:8:\"New York\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:2:\"NY\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:109:\"<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:17:\"New York, NY, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:40.7127753;s:3:\"lng\";d:-74.0059728;}s:8:\"viewport\";a:4:{s:5:\"south\";d:40.4773991;s:4:\"west\";d:-74.25908989999999;s:5:\"north\";d:40.9175771;s:4:\"east\";d:-73.7002721;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7eae6a016a9c6f58e2044573fb8f14227b6e1f96\";s:4:\"name\";s:8:\"New York\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:1;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/109563403909369877892/photos\">Manfred White</a>\";}s:5:\"width\";i:600;}i:2;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/110161312347829694373/photos\">Roisin McGarry</a>\";}s:5:\"width\";i:1080;}i:3;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina</a>\";}s:5:\"width\";i:914;}i:4;a:3:{s:6:\"height\";i:3006;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/102539025756009807530/photos\">Barbara Felder</a>\";}s:5:\"width\";i:5344;}i:5;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:98:\"<a href=\"https://maps.google.com/maps/contrib/100282683248686649512/photos\">Carolina Abuchalja</a>\";}s:5:\"width\";i:3024;}i:6;a:3:{s:6:\"height\";i:3036;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/112016336994989292437/photos\">Hillary Dovel</a>\";}s:5:\"width\";i:4048;}i:7;a:3:{s:6:\"height\";i:1200;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/116982568915071656346/photos\">David VanHelden</a>\";}s:5:\"width\";i:3840;}i:8;a:3:{s:6:\"height\";i:1398;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/116522566196014882453/photos\">Rade Spasovski</a>\";}s:5:\"width\";i:2048;}i:9;a:3:{s:6:\"height\";i:4048;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/111761530785391278514/photos\">Juraj Maksi</a>\";}s:5:\"width\";i:3036;}}s:8:\"place_id\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:9:\"reference\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:87:\"https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62\";s:10:\"utc_offset\";i:-240;s:8:\"vicinity\";s:8:\"New York\";s:7:\"website\";s:19:\"http://www.nyc.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 1, 40.712776, -74.005974, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usersvideo`
--

CREATE TABLE `usersvideo` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersvideo`
--

INSERT INTO `usersvideo` (`id`, `url`, `project_id`, `user_email`, `date`) VALUES
(2, 'https://www.youtube.com/watch?v=gh4k0Q1Pl7E', 38, '2clickorg@gmail.com', 1556578455340),
(3, 'https://www.youtube.com/watch?v=7N9CHEF2214', 38, '2clickorg@gmail.com', 1556578455340),
(4, 'https://www.youtube.com/watch?v=PHAaMcK6wkA', 38, '2clickorg@gmail.com', 1556578455340),
(5, 'https://www.youtube.com/watch?v=ECNZWorh6O4', 43, '2clickorg@gmail.com', 1556578455340),
(7, 'https://www.youtube.com/watch?v=wejA_4joyW8', 43, '2clickorg@gmail.com', 1556578455340);

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` bigint(20) NOT NULL,
  `date` bigint(20) NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `date`, `ip`, `hash`) VALUES
(2, 1563561713433, '173.129.5.24', 'oJTBPYRLt3Err9zeDuWngh'),
(3, 1563573225936, '173.129.1.142', 'oJTBPYRLt3Err9zeDuWngh'),
(4, 1563596884881, '184.207.180.196', '8etfaL7gCgtkkLQwJrecvi'),
(5, 1564630404978, '184.248.121.106', 'nErWSi77rAdFjoM3PvYtvU');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appParams`
--
ALTER TABLE `appParams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carddata`
--
ALTER TABLE `carddata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complete_approve_task`
--
ALTER TABLE `complete_approve_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complete_task`
--
ALTER TABLE `complete_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `EmailTasks`
--
ALTER TABLE `EmailTasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `FavoritefromUsersData`
--
ALTER TABLE `FavoritefromUsersData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investors`
--
ALTER TABLE `investors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payout`
--
ALTER TABLE `payout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sendmessages`
--
ALTER TABLE `sendmessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TimesLogs`
--
ALTER TABLE `TimesLogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uniquenames`
--
ALTER TABLE `uniquenames`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserApproveTasks`
--
ALTER TABLE `UserApproveTasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersarticles`
--
ALTER TABLE `usersarticles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UsersData`
--
ALTER TABLE `UsersData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersvideo`
--
ALTER TABLE `usersvideo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appParams`
--
ALTER TABLE `appParams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carddata`
--
ALTER TABLE `carddata`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `complete_approve_task`
--
ALTER TABLE `complete_approve_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `complete_task`
--
ALTER TABLE `complete_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `EmailTasks`
--
ALTER TABLE `EmailTasks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `FavoritefromUsersData`
--
ALTER TABLE `FavoritefromUsersData`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `payout`
--
ALTER TABLE `payout`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sendmessages`
--
ALTER TABLE `sendmessages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `TimesLogs`
--
ALTER TABLE `TimesLogs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `uniquenames`
--
ALTER TABLE `uniquenames`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `UserApproveTasks`
--
ALTER TABLE `UserApproveTasks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `usersarticles`
--
ALTER TABLE `usersarticles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `UsersData`
--
ALTER TABLE `UsersData`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `usersvideo`
--
ALTER TABLE `usersvideo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
