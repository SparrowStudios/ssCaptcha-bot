-- DROP DATABASE IF EXISTS `logger-bot`;

CREATE DATABASE IF NOT EXISTS `bot-ssCaptcha`;

USE `bot-ssCaptcha`;

DROP TABLE IF EXISTS 
    `infoMessages`,
    `captchas`,
    `users`;



-- -----[ Users Table | Start ]-----
CREATE TABLE `users` (
    `id`                    INT NOT NULL AUTO_INCREMENT,
    `userId`                VARCHAR(40) NOT NULL,
    `passedCaptcha`         BOOLEAN NOT NULL DEFAULT false,
    `captchaFails`          INT NOT NULL DEFAULT 0,
    `updated`               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created`               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Users 
        PRIMARY KEY (id),
    CONSTRAINT UK_Users_UserId
        UNIQUE (userId)
);
CREATE INDEX IDX_UserId ON users(userId);
-- -----[ Users Table | End ]-----

-- -----[ Captchas Table | Start ]-----
CREATE TABLE `captchas` (
    `id`                    INT NOT NULL AUTO_INCREMENT,
    `assignedUser`          INT NOT NULL,
    `image`                 LONGBLOB NOT NULL,
    `value`                 CHAR(6) NOT NULL,
    `dataUrl`                 TEXT NOT NULL,
    `expires`               TIMESTAMP DEFAULT NULL,
    `updated`               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created`               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Captchas 
        PRIMARY KEY (id),
    CONSTRAINT FK_Captchas_AssignedUser FOREIGN KEY (assignedUser) 
        REFERENCES users(id),
    CONSTRAINT UK_Captchas_AssignedUser
        UNIQUE (assignedUser)
);
CREATE INDEX IDX_AssignedUserId ON captchas(assignedUser);
-- -----[ Captchas Table | End ]-----

-- -----[ InfoMessages Table | Start ]-----
CREATE TABLE `infoMessages` (
    `id`                    INT NOT NULL AUTO_INCREMENT,
    `messageId`             VARCHAR(40) NOT NULL,
    `messageName`           VARCHAR(255) NOT NULL,
    `updated`               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created`               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_InfoMessages 
        PRIMARY KEY (id),
    CONSTRAINT UK_InfoMessages_MessageId 
        UNIQUE(messageId),
    CONSTRAINT UK_InfoMessages_MessageName 
        UNIQUE(messageName)
);
-- -----[ InfoMessages Table | End ]-----