-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2018 at 02:43 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blockchain`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `candidateID` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `partyName` varchar(30) NOT NULL,
  `voteCount` int(10) NOT NULL,
  `parcetange` int(5) NOT NULL,
  `marginWL` int(10) NOT NULL,
  `winloss` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `condidatesdata`
--

CREATE TABLE `condidatesdata` (
  `candidateId` int(11) NOT NULL,
  `candidateName` varchar(50) NOT NULL,
  `partyName` varchar(50) NOT NULL,
  `TranscationHash` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `etheraddress`
--

CREATE TABLE `etheraddress` (
  `address` varchar(80) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `etheraddress`
--

INSERT INTO `etheraddress` (`address`, `id`) VALUES
('0x82e8d9c942248e24c0f8d78be0b99ca0b48032a2', 12);

-- --------------------------------------------------------

--
-- Table structure for table `uservotedata`
--

CREATE TABLE `uservotedata` (
  `voterAddress` varchar(80) NOT NULL,
  `candidateId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `voters`
--

CREATE TABLE `voters` (
  `voterID` int(10) NOT NULL,
  `voterAddress` varchar(80) NOT NULL,
  `voterElectionId` varchar(100) NOT NULL,
  `voterFastName` varchar(50) NOT NULL,
  `voterLastName` varchar(30) NOT NULL,
  `voterGender` int(2) NOT NULL,
  `voterVoted` tinyint(1) NOT NULL,
  `TranscationHash` varchar(50) NOT NULL,
  `vid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`candidateID`);

--
-- Indexes for table `condidatesdata`
--
ALTER TABLE `condidatesdata`
  ADD PRIMARY KEY (`candidateId`);

--
-- Indexes for table `etheraddress`
--
ALTER TABLE `etheraddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uservotedata`
--
ALTER TABLE `uservotedata`
  ADD PRIMARY KEY (`voterAddress`);

--
-- Indexes for table `voters`
--
ALTER TABLE `voters`
  ADD PRIMARY KEY (`vid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `etheraddress`
--
ALTER TABLE `etheraddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `voters`
--
ALTER TABLE `voters`
  MODIFY `vid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
