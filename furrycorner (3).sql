-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2026 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furrycorner`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_emails`
--

CREATE TABLE `admin_emails` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_emails`
--

INSERT INTO `admin_emails` (`id`, `email`, `created_at`) VALUES
(1, 'qjraoira@tip.edu.ph', '2026-08-21 07:44:03'),
(2, 'qjfbuenavista@tip.edu.ph', '2026-08-21 07:44:03'),
(3, 'qinoor@tip.edu.ph', '2026-08-21 07:44:03'),
(4, 'qcfpardo@tip.edu.ph', '2026-08-21 07:44:03'),
(5, 'qratorres@tip.edu.ph', '2026-08-21 07:44:03');

-- --------------------------------------------------------

--
-- Table structure for table `admin_otp_codes`
--

CREATE TABLE `admin_otp_codes` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `otp_hash` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `pet_name` varchar(50) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_contact` varchar(100) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time` varchar(20) NOT NULL,
  `status` enum('Pending','Confirmed','Cancelled','Completed') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `user_id`, `service_id`, `pet_name`, `customer_name`, `customer_contact`, `booking_date`, `booking_time`, `status`, `created_at`) VALUES
(1, 2, 1, 'Bella', 'Noor ', 'qinoor@tip.edu.ph', '2026-08-29', '9:00 AM', 'Pending', '2026-08-05 05:55:52'),
(2, 2, 1, 'Dog', 'Noor ', 'qinoor@tip.edu.ph', '2026-08-31', '5:00 PM', 'Pending', '2026-08-05 06:37:06'),
(4, 2, 2, 'Bella', 'Noor ', 'qinoor@tip.edu.ph', '2026-08-31', '7:00 PM', 'Pending', '2026-08-22 13:50:46'),
(5, 7, 1, 'Bella', 'Mobile Test', 'ilhamnoor2019@gmail.com', '2026-09-05', '7:00 PM', 'Pending', '2026-08-24 11:04:33');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Processing','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `first_name`, `last_name`, `address`, `city`, `province`, `postal_code`, `phone`, `payment_method`, `subtotal`, `shipping_fee`, `total_amount`, `status`, `order_date`) VALUES
(1, NULL, 'JOCIELLE', 'BUENAVISTA', 'blk1 lot 2, diamond st. ', 'angono', 'rizal', '1920', '09123456789', 'Cash on Delivery', 741.16, 50.00, 791.16, 'Pending', '2026-08-03 19:32:29'),
(2, NULL, 'Ilham', 'Noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', '0', 3002.32, 50.00, 3052.32, 'Cancelled', '2026-08-05 03:27:54'),
(3, NULL, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', '0', 35.00, 50.00, 85.00, 'Cancelled', '2026-08-05 06:35:50'),
(4, NULL, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', '0', 741.00, 50.00, 791.00, 'Processing', '2026-08-05 07:05:20'),
(5, NULL, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', '0', 741.00, 50.00, 791.00, 'Processing', '2026-08-20 08:04:52'),
(6, 2, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'Cash on Delivery', 741.00, 50.00, 791.00, 'Cancelled', '2026-08-20 10:05:17'),
(7, 2, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'Cash on Delivery', 239.00, 50.00, 289.00, 'Delivered', '2026-08-21 07:20:52'),
(9, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 741.00, 0.00, 741.00, 'Pending', '2026-08-24 07:13:35'),
(10, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 200.00, 0.00, 200.00, 'Pending', '2026-08-24 07:31:18'),
(11, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:36:14'),
(12, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:45:51'),
(13, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:47:20'),
(14, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:49:26'),
(15, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:50:28'),
(16, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:50:50'),
(17, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 07:59:04'),
(18, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 150.00, 0.00, 150.00, 'Pending', '2026-08-24 08:03:53'),
(19, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 180.00, 0.00, 180.00, 'Pending', '2026-08-24 08:07:42'),
(20, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 180.00, 0.00, 180.00, 'Pending', '2026-08-24 08:09:57'),
(21, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 180.00, 0.00, 180.00, 'Pending', '2026-08-24 08:14:07'),
(22, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 239.00, 0.00, 239.00, 'Pending', '2026-08-24 08:25:37'),
(23, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 239.00, 0.00, 239.00, 'Pending', '2026-08-24 08:32:15'),
(24, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 239.00, 0.00, 239.00, 'Cancelled', '2026-08-24 08:38:27'),
(25, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 1520.00, 0.00, 1520.00, 'Pending', '2026-08-24 09:54:16'),
(30, 7, 'ilham', 'noor', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441', 'cod', 1482.00, 0.00, 1482.00, 'Cancelled', '2026-08-24 10:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`item_id`, `order_id`, `product_id`, `product_name`, `price`, `quantity`, `item_total`) VALUES
(1, 1, 2, 'Air-Dried Dog Food', 741.16, 1, 741.16),
(2, 2, 1, 'Kibble Dog Food', 760.00, 2, 1520.00),
(3, 2, 2, 'Air-Dried Dog Food', 741.16, 2, 1482.32),
(4, 3, 8, 'Fish Wet Food', 35.00, 1, 35.00),
(5, 4, 2, 'Air-Dried Dog Food', 741.00, 1, 741.00),
(6, 5, 2, 'Air-Dried Dog Food', 741.00, 1, 741.00),
(7, 6, 2, 'Air-Dried Dog Food', 741.00, 1, 741.00),
(8, 7, 4, 'Baked Dog Treat', 239.00, 1, 239.00),
(10, 9, 2, 'Air-Dried Dog Food', 741.00, 1, 741.00),
(11, 10, 29, 'Chew Toy', 200.00, 1, 200.00),
(12, 11, 28, 'Ball Toy', 150.00, 1, 150.00),
(13, 12, 28, 'Ball Toy', 150.00, 1, 150.00),
(14, 13, 28, 'Ball Toy', 150.00, 1, 150.00),
(15, 14, 28, 'Ball Toy', 150.00, 1, 150.00),
(16, 15, 28, 'Ball Toy', 150.00, 1, 150.00),
(17, 16, 28, 'Ball Toy', 150.00, 1, 150.00),
(18, 17, 28, 'Ball Toy', 150.00, 1, 150.00),
(19, 18, 28, 'Ball Toy', 150.00, 1, 150.00),
(20, 19, 6, 'Canned Wet Food', 180.00, 1, 180.00),
(21, 20, 17, 'Collar', 180.00, 1, 180.00),
(22, 21, 17, 'Collar', 180.00, 1, 180.00),
(23, 22, 15, 'Chewy Treat', 239.00, 1, 239.00),
(24, 23, 15, 'Chewy Treat', 239.00, 1, 239.00),
(25, 24, 15, 'Chewy Treat', 239.00, 1, 239.00),
(26, 25, 1, 'Kibble Dog Food', 760.00, 2, 1520.00),
(27, 30, 2, 'Air-Dried Dog Food', 741.00, 2, 1482.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `subcategory` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category`, `subcategory`, `price`, `stock`, `date_updated`, `image`) VALUES
(1, 'Kibble Dog Food', 'Food', 'Dry Food', 760.00, 2, '2026-08-24 09:30:54', 'images/product-1.png'),
(2, 'Air-Dried Dog Food', 'Food', 'Dry Food', 741.00, 0, '2026-08-24 10:06:41', 'images/product-2.png'),
(3, 'Freeze-Dried Dog Food', 'Food', 'Dry Food', 149.00, 20, '2026-08-05 00:28:40', 'images/product-3.png'),
(4, 'Baked Dog Treat', 'Food', 'Dry Food', 239.00, 20, '2026-08-05 00:28:40', 'images/product-4.png'),
(5, 'Frozen Pet Food', 'Food', 'Dry Food', 169.00, 20, '2026-08-05 00:28:40', 'images/product-5.png'),
(6, 'Canned Wet Food', 'Food', 'Wet Food', 180.00, 20, '2026-08-05 00:28:40', 'images/product-6.png'),
(7, 'Poultry Wet Food', 'Food', 'Wet Food', 39.00, 20, '2026-08-05 00:28:40', 'images/product-7.png'),
(8, 'Fish Wet Food', 'Food', 'Wet Food', 35.00, 20, '2026-08-05 00:28:40', 'images/product-8.png'),
(9, 'Meat Wet Food', 'Food', 'Wet Food', 59.00, 20, '2026-08-05 00:28:40', 'images/product-9.png'),
(10, 'Diet Dog Food', 'Food', 'Wet Food', 489.00, 20, '2026-08-05 00:28:40', 'images/product-10.png'),
(11, 'Pastry Treat', 'Food', 'Treats', 398.00, 20, '2026-08-05 00:28:40', 'images/product-11.png'),
(12, 'Dental Stix', 'Food', 'Treats', 219.00, 20, '2026-08-05 00:28:40', 'images/product-12.png'),
(13, 'Protein Treat', 'Food', 'Treats', 130.00, 20, '2026-08-05 00:28:40', 'images/product-13.png'),
(14, 'Training Treat', 'Food', 'Treats', 129.00, 20, '2026-08-05 00:28:40', 'images/product-14.png'),
(15, 'Chewy Treat', 'Food', 'Treats', 239.00, 20, '2026-08-05 00:28:40', 'images/product-15.png'),
(16, 'Harness', 'Accessories', 'Walking Essentials', 350.00, 20, '2026-08-05 00:28:40', 'images/product-16.png'),
(17, 'Collar', 'Accessories', 'Walking Essentials', 180.00, 20, '2026-08-05 00:28:40', 'images/product-17.png'),
(18, 'Leash', 'Accessories', 'Walking Essentials', 250.00, 20, '2026-08-05 00:28:40', 'images/product-18.png'),
(19, 'Pet Shoes', 'Accessories', 'Walking Essentials', 450.00, 20, '2026-08-05 00:28:40', 'images/product-19.png'),
(20, 'Pet Stroller', 'Accessories', 'Walking Essentials', 2300.00, 20, '2026-08-05 00:28:40', 'images/product-20.png'),
(21, 'Pet Bed', 'Accessories', 'Home Gear', 850.00, 20, '2026-08-05 00:28:40', 'images/product-21.png'),
(22, 'Pet Cage', 'Accessories', 'Home Gear', 1500.00, 20, '2026-08-05 00:28:40', 'images/product-22.png'),
(23, 'Food & Water Bowl', 'Accessories', 'Home Gear', 250.00, 20, '2026-08-05 00:28:40', 'images/product-23.png'),
(24, 'Potty Pads', 'Accessories', 'Home Gear', 450.00, 20, '2026-08-05 00:28:40', 'images/product-24.png'),
(25, 'Brush / Comb', 'Accessories', 'Home Gear', 220.00, 20, '2026-08-05 00:28:40', 'images/product-25.png'),
(26, 'Plush Toy', 'Accessories', 'Toys', 180.00, 20, '2026-08-05 00:28:40', 'images/product-26.png'),
(27, 'Squeaky Toy', 'Accessories', 'Toys', 150.00, 20, '2026-08-05 00:28:40', 'images/product-27.png'),
(28, 'Ball Toy', 'Accessories', 'Toys', 150.00, 20, '2026-08-05 00:28:40', 'images/product-28.png'),
(29, 'Chew Toy', 'Accessories', 'Toys', 200.00, 20, '2026-08-05 00:28:40', 'images/product-29.png'),
(30, 'Interactive Toy', 'Accessories', 'Toys', 150.00, 20, '2026-08-05 02:49:20', 'images/product-30.png'),
(37, 'test', 'food', '', 120.00, 0, '2026-08-21 07:17:25', '');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` varchar(100) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `category`, `price`, `duration`, `status`, `image`) VALUES
(1, 'Tooth Brushing', 'Grooming', '100.00', '15 min', 'Active', 'images/service-tooth-brushing.jpg'),
(2, 'Haircut', 'Grooming', '350 - 750', '1 hr', 'Active', 'images/service-haircut.jpg'),
(3, 'Bath', 'Grooming', '700 - 2,000', '1 hr', 'Active', 'images/service-bath.jpg'),
(4, 'Nail Care', 'Grooming', '100', '15 min', 'Active', 'images/service-nail-care.jpg'),
(5, 'Ear Cleaning', 'Grooming', '100', '15 min', 'Active', 'images/service-ear-cleaning.jpg'),
(6, 'Dental', 'Care', '300 - 3,000', '1 hr', 'Active', 'images/service-dental.jpg'),
(7, 'Prescription / Consultation', 'Care', '500', '30 min', 'Active', 'images/service-consultation.png'),
(8, 'Vaccination', 'Care', '350 - 4,500', '30 min', 'Active', 'images/service-vaccination.jpg'),
(9, 'Spaying', 'Care', '1,000 - 2,500', '2 hrs', 'Active', 'images/service-spaying.jpg'),
(10, 'Medicine', 'Care', '99 - 1,000', '10 min', 'Active', 'images/service-medicine.jpg'),
(11, 'Fostering', 'Boarding', 'Free', 'Daily', 'Active', 'images/service-fostering.jpg'),
(12, 'Day Boarding', 'Boarding', '350 - 695 / day', 'Daily', 'Active', 'images/service-day-boarding.jpg'),
(13, 'Spa / Leisure', 'Boarding', '350 - 850', '2 hrs', 'Active', 'images/service-spa-leisure.jpg'),
(14, 'Veterinary Boarding', 'Boarding', '450 - 850 / day', 'Daily', 'Active', 'images/service-vet-boarding.jpg'),
(15, 'Overnight Boarding', 'Boarding', '450 - 899', 'Overnight', 'Active', 'images/service-overnight-boarding.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `created_at`, `role`, `address`, `city`, `province`, `postal_code`, `phone`) VALUES
(2, 'Noor', '', 'qinoor@tip.edu.ph', '$2y$10$73oQ10gBboK0z0Mx9QMAduWWS81JjUFqaQWWVI2YCHiP3kbpUYXfi', '2026-08-05 04:34:09', 'customer', 'Blk 6 Lot 6 Buttercup Street Spring Country Filinvest 2 Brangay Bagong Silangam Quezon City', 'Quezon City', 'Metro Manila', '1119', '09661657441'),
(3, 'Admin', 'FurryCorner', 'admin@furrycorner.com', '$2y$10$3z26qkfZ3JHzCWfWQ9hLQOjMRbUhm6owVY4V.2GhtkMS1vqfN5axu', '2026-08-05 04:42:31', 'admin', NULL, NULL, NULL, NULL, NULL),
(7, 'Mobile', 'Test', 'ilhamnoor2019@gmail.com', '$2y$10$N1rUEwtnXP4IVBOgUq45auQbJEM7.Vp3vja2O.SvO4uFnIxZI4uLi', '2026-08-24 05:00:29', 'customer', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_emails`
--
ALTER TABLE `admin_emails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admin_otp_codes`
--
ALTER TABLE `admin_otp_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `fk_booking_user` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_emails`
--
ALTER TABLE `admin_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `admin_otp_codes`
--
ALTER TABLE `admin_otp_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_booking_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
