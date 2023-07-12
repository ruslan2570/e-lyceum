-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 12, 2023 at 09:41 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `token`, `user_id`, `expiration_date`) VALUES
(869, '8053a9f580cb351e590a240abb93d629', 1, '2023-08-10'),
(870, 'fb8728b40f7e4e32701140d7687d9358', 1, '2023-08-10');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int NOT NULL,
  `property` varchar(64) NOT NULL,
  `content` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `property`, `content`) VALUES
(1, 'user_password', '1234');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `firstname`, `lastname`, `login`, `class_id`) VALUES
(34, 'Роман', 'Кочетков', 'kochan', 3),
(35, 'Анатолий', 'Царёв', 'plasticine', 4);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `fullname`) VALUES
(1, 'Иванова Мария Ивановна'),
(2, 'Петрова Татьяна Владимировна'),
(6, 'Скуратова Ольга Викторовна'),
(8, 'Митрофанова Ольга Викторовна'),
(10, 'Джонатан Стетхэм');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`id`, `name`, `teacher_id`, `student_id`, `class_id`, `selection_date`) VALUES
(1, 'Развитие краткосрочного кредитования в комерческом банке', 1, NULL, 1, NULL),
(2, 'Порядок работы с сомнительными, неплатежеспособными и имеющими признаки подделки денежными знаками Банка России в кредитных организациях ', 1, NULL, 1, NULL),
(3, 'Проектирование архитектуры высоконагруженных приложений', 2, NULL, 1, NULL),
(4, 'Программирование микроконтроллеров STM32', 2, 34, 3, '2023-07-12 21:06:11'),
(5, 'Проектирование парты', 2, NULL, 4, NULL),
(6, 'Самые необычные театры в Москве', 8, NULL, 4, NULL),
(7, 'По следам Шерлока Холмса, или методы решения логических задач', 2, NULL, 4, NULL),
(8, 'Гастрономическая Москва', 1, NULL, 2, NULL),
(16, '\"Панки хой!\" или как зарождался тамбовский панк-рок', 1, 35, 3, '2023-07-11 00:39:47'),
(17, 'Промизы в JS', 6, NULL, 5, NULL),
(23, 'Самые известные цитаты Джонатана Стетхэма', 10, NULL, 4, NULL),
(24, 'Загрузка сайта на хостинг', 10, NULL, 12, NULL);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=871;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
