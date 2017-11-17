CREATE DATABASE IF NOT EXISTS `minishop` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `minishop`;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `wishlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `liked` BOOLEAN NOT NULL DEFAULT 1,
   PRIMARY KEY (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB;

INSERT IGNORE INTO `products` (`id`, `name`, `image`) VALUES
    (1, 'Glass Shell', 'http://www.freeimageslive.com/galleries/objects/translucent/pics/glassshell3021.jpg'),
    (2, 'Fake Gold', 'http://www.freeimageslive.com/galleries/objects/general/pics/abstractglass0477.jpg'),
    (3, 'Perfume', 'http://www.freeimageslive.com/galleries/objects/translucent/pics/perfume2217.jpg');