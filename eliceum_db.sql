-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 01, 2023 at 05:36 PM
-- Server version: 8.0.32
-- PHP Version: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eliceum_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `login` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `login`, `password`) VALUES
(1, 'steps', 'stair');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `value`) VALUES
(1, 1),
(2, 2),
(3, 5),
(4, 8),
(5, 3),
(6, 4),
(8, 6),
(9, 7),
(10, 9),
(11, 10),
(12, 11);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int NOT NULL,
  `token` varchar(32) NOT NULL,
  `user_id` int NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `token`, `user_id`, `expiration_date`) VALUES
(869, '8053a9f580cb351e590a240abb93d629', 1, '2023-08-10'),
(870, 'fb8728b40f7e4e32701140d7687d9358', 1, '2023-08-10'),
(871, '0c169fce0e5387dffd9432df51feb9f3', 1, '2023-08-10'),
(872, '8dff559fc34241e6e5b599d449f9ec28', 1, '2023-08-10'),
(873, 'a3d57c7f5073c78680827396452ae870', 1, '2023-08-10'),
(874, '015cc8cadb408d6efea96a58aeccbba3', 1, '2023-08-10'),
(875, '6cc3070c2675f1afc8ae2801fba2ab23', 1, '2023-08-10'),
(876, 'ec49df1cf71c29f6bc9fad33f557888a', 1, '2023-08-10'),
(877, '4339c68fda6f2a63e4356d5c4d1eae9f', 1, '2023-08-10'),
(878, '2932a28f888cbcbcbdc0ea0ddc850daf', 1, '2023-08-10'),
(879, 'ed5d13686d73325c70eb2fc9e80489b1', 1, '2023-08-10'),
(880, '147c3599503c0b4a1eb1f93dffd11d9f', 1, '2023-08-10'),
(881, 'df5755384dbf0e18ae467e19e77eeadf', 1, '2023-08-10'),
(882, 'eb15dcaf37e0b46d90145e41174669a1', 1, '2023-08-18'),
(883, '18f0b20bfed0f637a248a62fc4c6d0db', 1, '2023-08-28'),
(884, '97c95146bea083cee749aedd0f2fb2ea', 1, '2023-08-29'),
(885, '8c8185fcd7011284427a8fe862b27907', 1, '2023-08-29'),
(886, 'bf59fd330a1b2d453e92a249ebbcb4a9', 1, '2023-08-29'),
(887, 'd8844f33567c146eb27b1a547515c7c2', 1, '2023-08-29'),
(888, '3f941847cdf08f7fc869493e8d3cdd02', 1, '2023-08-29'),
(889, 'f75eedb27a030e4b9455c0492a2dda0e', 1, '2023-08-29'),
(890, 'd8e6e4dd81fe30a81b00057dc1861291', 1, '2023-08-29'),
(891, '64e568130941bc20936759c9eebbaef7', 1, '2023-08-29'),
(892, '53beb830b05523fcb39925c0d8d466d9', 1, '2023-08-29'),
(893, '82fb480e6b3f2b8605cc3132009a36e6', 1, '2023-08-29'),
(894, 'cb70dbf023225c90375352310813e37e', 1, '2023-08-29'),
(895, 'c5c2472041c23ee64edb299a44590e61', 1, '2023-08-29'),
(896, 'c716e4c26c907a6c54147f28c1b112ab', 1, '2023-08-29'),
(897, '74a3f66ec9d118f81328843c3c23a533', 1, '2023-08-29'),
(898, '7746afcb2d16ce6dbd2c11e8c751d5c8', 1, '2023-08-29');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int NOT NULL,
  `property` varchar(64) NOT NULL,
  `content` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `property`, `content`) VALUES
(1, 'user_password', '234');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int NOT NULL,
  `firstname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `login` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `class_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `student`
--
DELIMITER $$
CREATE TRIGGER `delete_student` BEFORE DELETE ON `student` FOR EACH ROW BEGIN
  UPDATE topic
  SET student_id = NULL
  WHERE student_id = OLD.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int NOT NULL,
  `fullname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `teacher_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `class_id` int NOT NULL,
  `selection_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `topic`
--
DELIMITER $$
CREATE TRIGGER `clear_date` BEFORE UPDATE ON `topic` FOR EACH ROW BEGIN
  IF NEW.student_id IS NULL THEN
    SET NEW.selection_date = NULL;
  END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_ibfk_1` (`class_id`),
  ADD KEY `topic_ibfk_2` (`student_id`),
  ADD KEY `topic_ibfk_3` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=899;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topic_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `topic_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
