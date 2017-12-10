SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE `dianaweb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;

USE `dianaweb`;

CREATE TABLE IF NOT EXISTS `categorii`(
`id_categorie` number PRIMARY KEY AUTO_INCREMENT,
`denumire_categorie` varchar(100),
`nr_evenimente` number
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `evenimente`(
`id_eveniment` number PRIMARY KEY AUTO_INCREMENT,
`denumire_eveniment` varchar(100),
`data` timestamp,
`locatie` varchar(50),
`intrare` smallint(2) --1 daca e intrare pe baza completarii unui form/achizitionare bilet, etc si 0 daca intrarea este libera--
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF EXISTS `rezervare`(
`id_rezervare` number PRIMARY KEY AUTO_INCREMENT,
`nume_complet` varchar(50),
`email` varchar(20),
`telefon` number(10),
`id_eveniment` number FOREIGN KEY
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;