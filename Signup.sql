-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 06, 2024 at 06:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Signup`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `email`, `password`, `created_by`, `created_at`) VALUES
(11, 'shrota@gmail.com', 'M@chine673', 'ukrish@gmail.com', '2024-05-11 04:26:26'),
(12, 'pawan@gmail.com', 'M@chine673', 'shrota@gmail.com', '2024-05-11 04:28:02'),
(13, 'nitesh1@gmail.com', 'M@chine673', 'shrota@gmail.com', '2024-05-20 11:01:58'),
(15, 'snehasingh@gmail.com', 'M@chine673', 'shrota@gmail.com', '2024-05-23 09:12:15');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `product_name`, `category`, `quantity`, `price`, `timestamp`) VALUES
(131, 'Local Cucumber', 'Vegetables', 1, 3005.00, '2024-05-23 07:14:20'),
(132, 'Orange - Terai', 'Fruits', 1, 200.00, '2024-05-23 07:19:18'),
(133, 'Sweet Pineapples', 'Fruits', 1, 400.00, '2024-05-23 09:13:19');

-- --------------------------------------------------------

--
-- Table structure for table `farmer`
--

CREATE TABLE `farmer` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `farmName` varchar(255) NOT NULL,
  `farmerAddress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmer`
--

INSERT INTO `farmer` (`id`, `fullName`, `email`, `phoneNumber`, `farmName`, `farmerAddress`, `password`) VALUES
(4, 'Sneha', 'sneha@gmail.com', '9818252988', 'farms', 'Imadole', 'sneha'),
(5, 'Pawan Karki', 'pawanthe@gmail.com', '9841567827', 'pawanfarm', 'imadole', 'Wh@t1234');

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `farmer_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `farm_name` varchar(255) DEFAULT NULL,
  `farmer_address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`farmer_id`, `name`, `email`, `phone_number`, `farm_name`, `farmer_address`, `password`, `created_at`) VALUES
(1, 'Sneha', 'sneha@gmail.com', '9862366698', 'fruits', 'Kathmandu', '1234', '2024-04-11 05:10:06'),
(2, 'Farmer', 'farmer@gmail.com', '1234567892', 'khadkas farm', 'kalanki', '12345', '2024-04-11 08:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `farmer_product`
--

CREATE TABLE `farmer_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `farmerName` varchar(255) NOT NULL,
  `farmer_id` int(11) DEFAULT NULL,
  `farmer_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmer_product`
--

INSERT INTO `farmer_product` (`id`, `name`, `description`, `category`, `price`, `quantity`, `image`, `farmerName`, `farmer_id`, `farmer_email`) VALUES
(65, 'Local Cucumber', 'Our Cucumbers, the perfect blend of refreshment and crunch. Grown with care and harvested at just the right time, these green wonders are packed with hydration and flavor.', 'Vegetables', 30.00, 40, '1716399343293-559335015.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(67, 'Sweet and Juicy Mangoes', 'Best Mangoes in Town!', 'Fruits', 200.00, 30, '1715430744694-620816361.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(68, 'Orange - Terai', 'Peel away the bright orange skin to reveal the succulent segments inside, ready to refresh and invigorate your taste buds. Enjoy them as a healthy snack, squeeze them into fresh juice, or add them to salads for a burst of citrus flavor.', 'Fruits', 200.00, 20, '1715430830687-679039473.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(86, 'Spinach', 'Healthy Greens', 'Vegetable', 90.00, 30, '1716428149330-680180247.png', 'Sneha', 4, 'sneha@gmail.com'),
(87, 'Apple', 'Enjoy the crisp crunch and natural sweetness of our apples! Handpicked for perfection, each apple is bursting with fresh flavor. Whether you snack on them solo or use them in your favorite recipes, these apples are sure to satisfy. We carefully select only the finest apples for you to enjoy, delivered straight to your door for convenience. Treat yourself to the delicious taste of our apples today.', 'Fruits', 400.00, 30, '1716396139852-241019947.jpeg', 'Sneha', 4, 'sneha@gmail.com'),
(89, 'Fresh Farm Apples', 'Discover the crisp and juicy delight of our hand-picked apples, grown with care on our family-owned orchards. Bursting with flavor and natural sweetness, our apples are a delicious and nutritious addition to any meal or snack.', 'Fruits', 300.00, 20, '1715426185792-573729822.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(90, 'Green Apples', ' Savor the refreshing tang of our green apples, hand-selected from our orchards for their vibrant color and tantalizing flavor. With a perfect balance of sweetness and tartness, our green apples are a delightful treat for your taste buds.  Grown with care and harvested at peak ripeness, our green apples boast a crisp texture and juicy flesh that bursts with every bite. Whether enjoyed on their own as a wholesome snack or incorporated into your favorite recipes, these apples add a burst of freshness to any dish.', 'Fruits', 500.00, 40, '1715426596878-385553467.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(91, 'Peas Straight from the Vine', 'Rich in vitamins, minerals, and dietary fiber, our peas not only taste delicious but also provide a nutritious boost to your diet. Add a touch of freshness and flavor to your meals with our premium peas today!', 'Vegetable', 200.00, 30, '1715426781991-34876224.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(92, 'Sweet Pineapples', 'Rich in vitamins, minerals, and antioxidants, our pineapples not only tantalize your taste buds but also provide a nutritious boost to your diet. Bite into the juicy goodness of our premium pineapples and let their tropical flavor transport you to paradise.  Experience the taste of sunshine with our freshly harvested pineapples today - a true delight for your senses!\"', 'Fruits', 400.00, 30, '1715426902394-777749977.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(93, 'Strawberries from Maleku', 'Packed with vitamins, antioxidants, and dietary fiber, our strawberries not only taste incredible but also provide a nutritious boost to your diet', 'Fruits', 350.00, 20, '1715427030575-37364098.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(94, 'Green Cabbage', 'Our crisp cabbage is harvested at peak perfection, delivering a burst of freshness to your table. Packed with vitamins and minerals, it\'s a wholesome addition to your meals.', 'Vegetable', 30.00, 30, '1715427542786-433536127.jpeg', 'Sneha', 1, 'sneha@gmail.com'),
(95, 'Spicy and Vibrant Chili Peppers ', 'Our chili peppers pack a punch of heat and flavor, perfect for adding excitement to your dishes. Grown with care, they\'re bursting with freshness and spice.  Whether sliced, diced, or blended into sauces, our chili peppers bring bold flavor to every bite. Spice up your meals and awaken your taste buds with our vibrant chili peppers.', 'Vegetable', 60.00, 50, '1715427948745-397735120.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(96, 'Solukhumbu\'s Potato', 'Meet our humble yet hearty potatoes, the ultimate comfort food for any occasion. Grown with care, these earthy treasures are rich in flavor and perfect for countless recipes.', 'Vegetable', 140.00, 20, '1715428274272-456500709.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(97, 'Fresh Watermelons', 'Whether enjoyed sliced into wedges, blended into refreshing drinks, or added to fruit salads, our watermelons are a delicious and nutritious addition to any meal. Packed with vitamins, minerals, and antioxidants, they\'re not only delicious but also promote hydration and overall well-being.', 'Fruits', 150.00, 30, '1715428544247-123466975.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(98, 'Farm-Grade Cow\'s Milk', 'Packed with calcium, protein, and essential vitamins, our milk not only tastes great but also supports your overall health and well-being. Treat yourself and your family to the nourishing goodness of our premium cow\'s milk - a timeless classic that never goes out of style.', ' Dairy Products', 110.00, 20, '1715428694217-626546597.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(99, 'Fresh and Vibrant Broccoli ', 'Not only does our broccoli taste delicious, but it also offers numerous health benefits, including support for immune function, digestion, and heart health. Incorporate our premium broccoli into your diet and nourish your body with every bite.', 'Vegetables', 80.00, 18, '1715428863166-969427977.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(100, 'Tender and Versatile Tofu ', 'Not only is our tofu delicious and versatile, but it\'s also packed with nutrients like iron, calcium, and amino acids. Incorporate it into your meals and enjoy the health benefits of this plant-powered protein source.', 'Dairy Products', 30.00, 300, '1715429316881-360876681.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(101, 'Tangy and Sweet Kiwi ', 'Meet our kiwi, the petite powerhouse bursting with flavor and goodness. With its fuzzy brown exterior and vibrant green flesh, this small fruit packs a big punch of tangy sweetness.', 'Fruits', 300.00, 30, '1715429563449-294546596.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(102, 'Red Potato (Terai)', 'Packed with essential nutrients and dietary fiber, our red potatoes not only satisfy your taste buds but also provide a nutritious boost to your diet. Experience the authentic taste of Terai with every bite of our premium red potatoes - a true treasure from the heart of Nepal\'s agricultural belt!', 'Vegetable', 100.00, 20, '1715429687602-700442868.jpeg', 'Sneha', 1, 'sneha@gmail.com\n'),
(103, ' Red Indian Onions', 'Our onions come all the way from India, known for their rich taste and bold color. They add a special kick to any dish, whether you\'re cooking up a stir-fry or enjoying a salad.', 'Vegetable', 70.00, 30, '1715430031196-220581263.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(104, 'Local Cucumber', 'Meet our cucumbers, the perfect blend of refreshment and crunch. Grown with care and harvested at just the right time, these green wonders are packed with hydration and flavor.', 'Vegetable', 30.00, 40, '1715430220690-310340258.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(105, 'Chinese Spinach', 'Packed with vitamins and minerals, Chinese spinach is not only delicious but also good for you. Incorporate it into your meals for a nutritious and flavorful dining experience.', 'Vegetable', 30.00, 2, '1715430537366-777966462.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(106, 'Sweet and Juicy Mangoes', 'Our mangoes are a taste of paradise, straight from the sunny orchards. With their golden hue and fragrant aroma, these tropical delights are bursting with sweet, juicy flavor.', 'Fruits', 200.00, 30, '1715430744694-620816361.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(107, 'Orange - Terau', 'Peel away the bright orange skin to reveal the succulent segments inside, ready to refresh and invigorate your taste buds. Enjoy them as a healthy snack, squeeze them into fresh juice, or add them to salads for a burst of citrus flavor.', 'Fruits', 200.00, 20, '1715430830687-679039473.jpeg', 'Pawan Karki', 5, 'pawanthe@gmail.com'),
(108, 'Cauliflower ', 'Our cauliflower is a kitchen staple, loved for its crunchy texture and mild flavor. Whether steamed, roasted, or mashed, this versatile vegetable adds a nutritious boost to any meal.', 'Vegetable', 50.00, 30, '1715430964518-420779865.jpeg', 'pawan1', 5, 'pawanthe@gmail.com'),
(110, 'Peas', 'vegetables', 'fruits', 30.00, 41, '1716455296540-905918494.jpeg', 'Nitesh Khadka', 9, 'nitesh1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `email`, `phone_number`, `password`, `created_at`) VALUES
(10, 'Pawan Karki', 'pk@gmail.com', '9841235768', 'P@w@n12', '2024-05-22 03:54:22'),
(11, 'Nitesh Khadka', 'nitesh@gmail.com', '9818252988', 'nitesh', '2024-05-22 03:54:22'),
(12, 'Sneha Tamang', 'sneha12@gmail.com', '9818252988', 'sneha', '2024-05-22 03:54:22');

-- --------------------------------------------------------

--
-- Table structure for table `login_activity`
--

CREATE TABLE `login_activity` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_activity`
--

INSERT INTO `login_activity` (`id`, `name`, `email`, `login_time`) VALUES
(1, 'Shrota Ghimire', 'shrotaghimire97@gmail.com', '2024-05-16 00:17:42'),
(2, 'Sneha Tamang', 's@gmail.com', '2024-05-16 08:34:08'),
(3, 'Shrota Ghimire', 'shrotaghimire97@gmail.com', '2024-05-16 10:06:45'),
(4, 'Shrota Ghimire', 'shrotaghimire97@gmail.com', '2024-05-16 10:17:22'),
(5, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:49:04'),
(6, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:49:13'),
(7, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:49:23'),
(8, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:49:38'),
(9, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:50:19'),
(10, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:51:08'),
(11, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:51:34'),
(12, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:52:43'),
(13, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:52:47'),
(14, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:53:09'),
(15, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:53:32'),
(16, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-19 18:53:40'),
(17, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 18:54:52'),
(18, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 18:55:08'),
(19, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 18:56:55'),
(20, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 19:00:17'),
(21, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 19:01:18'),
(22, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 19:09:44'),
(23, 'Pawan Karki', 'pk@gmail.com', '2024-05-19 19:11:21'),
(24, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:26:49'),
(25, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:26:54'),
(26, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:27:14'),
(27, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:27:29'),
(28, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:27:42'),
(29, 'Nitesh Khadka', 'nitesh@gmail.com', '2024-05-25 18:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `buyerName` varchar(255) DEFAULT NULL,
  `buyerPhoneNumber` varchar(20) DEFAULT NULL,
  `buyerLocation` varchar(255) DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `new_id` int(11) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`buyerName`, `buyerPhoneNumber`, `buyerLocation`, `totalPrice`, `orderDate`, `new_id`, `status`) VALUES
('Nitesh Khadka', '9818252988', 'Kalanki', 3855.00, '2024-05-23 09:13:40', 27, 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `orderId` int(11) NOT NULL,
  `orderstatus` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `orderId` int(11) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`orderId`, `productName`, `category`, `quantity`, `price`, `totalPrice`, `productId`) VALUES
(27, 'Local Cucumber', 'Vegetables', 1, 3005.00, 3005.00, 65),
(27, 'Orange - Terai', 'Fruits', 1, 200.00, 200.00, 68),
(27, 'Sweet Pineapples', 'Fruits', 1, 400.00, 400.00, 92);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `price`, `quantity`, `image_path`) VALUES
(1, 'g', 'g', 'g', 5.00, 5, NULL),
(2, 'df', 'dfdf', 'fddf', 2.00, 2, '/tmp/1715181277801-645744767.png'),
(3, 'sdcsdc', 'csdcds', 'csdcsd', 12.00, 2, '/tmp/1715181427860-592741777.png'),
(4, 'Product 1', 'Description 1', 'Category 1', 10.99, 5, 'product1.jpg'),
(5, 'Product 2', 'Description 2', 'Category 2', 15.99, 10, 'product2.jpg'),
(6, 'Product 3', 'Description 3', 'Category 1', 20.99, 8, 'product3.jpg'),
(7, 'golbheda', 'golbheda', 'golbheda here', 100.00, 1, '1715339085915-497675055.png'),
(8, 'Tomato', 'Tasty ', 'vegetable', 100.00, 1, '1715339768677-633778807.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `phone_number`, `password`, `created_at`) VALUES
(1, 'Shrota', 'shro@gmail.com', '9862366698', '12345', '2024-04-11 03:35:08'),
(2, 'nitesh', 'nitesh@gmail.com', '1234567890', 'nitesh', '2024-04-11 08:29:43'),
(3, 'Nitesh Khadka', 'Niteshkh@gmail.com', '1234567899', 'Nitesh21', '2024-04-11 08:37:38'),
(4, 'Shrota Ghimire', 'shrotaghimire97@gmail.com', '9862366698', 'qwerty', '2024-04-12 04:31:13'),
(5, 'Shrota Ghimire', 'shroo@gmail.com', '9862366698', 'qwerty', '2024-04-12 04:33:48');

-- --------------------------------------------------------

--
-- Table structure for table `user_inquiries`
--

CREATE TABLE `user_inquiries` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_inquiries`
--

INSERT INTO `user_inquiries` (`id`, `firstName`, `lastName`, `contactNumber`, `email`, `message`) VALUES
(2, 'Nitesh', 'Khadka', '9818252988', 'nitesh@gmail.com', 'hello I am Nitesh I wanted to ask about the product apple!'),
(3, 'Nitesh ', 'Khadka', '98182693922', 'nitesh@gmail.com', 'Hello'),
(4, 'asasd', 'asdasd', 'asdasd', 'asdasd@njadfnda.com', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `user_messages`
--

CREATE TABLE `user_messages` (
  `id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sender` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_messages`
--

INSERT INTO `user_messages` (`id`, `farmer_id`, `message`, `sender`, `timestamp`) VALUES
(1, 3, 'hello', 'Shrota Ghimire', '2024-05-16 15:31:27'),
(2, 3, 'kfksdfmdsjdnfs', 'Shrota Ghimire', '2024-05-16 15:48:25'),
(3, 3, 'dfdsfdsf', 'Shrota Ghimire', '2024-05-16 15:48:27'),
(4, 3, 'sdfsdf', 'Shrota Ghimire', '2024-05-16 15:48:29'),
(5, 3, 'hello', 'Shrota Ghimire', '2024-05-16 15:57:57'),
(6, 3, 'dfadasd', 'Shrota Ghimire', '2024-05-16 15:59:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmer`
--
ALTER TABLE `farmer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`farmer_id`);

--
-- Indexes for table `farmer_product`
--
ALTER TABLE `farmer_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_activity`
--
ALTER TABLE `login_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`new_id`);

--
-- Indexes for table `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_inquiries`
--
ALTER TABLE `user_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_messages`
--
ALTER TABLE `user_messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `farmer`
--
ALTER TABLE `farmer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `farmer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `farmer_product`
--
ALTER TABLE `farmer_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `login_activity`
--
ALTER TABLE `login_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `new_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_inquiries`
--
ALTER TABLE `user_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_messages`
--
ALTER TABLE `user_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
