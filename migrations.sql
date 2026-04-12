-- Safe migration for existing databases (MySQL 8+)
-- This script creates missing tables/columns and backfills old programs data.

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  office VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  headshot VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  discipline VARCHAR(255),
  meeting_time VARCHAR(255),
  contact VARCHAR(255),
  special_info TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add missing columns to faculty
ALTER TABLE faculty
  ADD COLUMN IF NOT EXISTS first_name VARCHAR(255) NOT NULL,
  ADD COLUMN IF NOT EXISTS last_name VARCHAR(255) NOT NULL,
  ADD COLUMN IF NOT EXISTS department VARCHAR(255) NOT NULL,
  ADD COLUMN IF NOT EXISTS office VARCHAR(255),
  ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS headshot VARCHAR(500),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Add missing columns to programs (canonical schema for admin pages)
ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS name VARCHAR(255) NOT NULL,
  ADD COLUMN IF NOT EXISTS discipline VARCHAR(255),
  ADD COLUMN IF NOT EXISTS meeting_time VARCHAR(255),
  ADD COLUMN IF NOT EXISTS contact VARCHAR(255),
  ADD COLUMN IF NOT EXISTS special_info TEXT,
  ADD COLUMN IF NOT EXISTS image VARCHAR(500),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Optional compatibility columns seen in older data models
ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS advisor VARCHAR(255),
  ADD COLUMN IF NOT EXISTS special_requirements TEXT,
  ADD COLUMN IF NOT EXISTS logo VARCHAR(500);

-- Backfill canonical columns from old columns only when old columns exist
SET @advisor_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'programs'
    AND COLUMN_NAME = 'advisor'
);
SET @sql := IF(
  @advisor_exists > 0,
  'UPDATE programs SET contact = COALESCE(NULLIF(contact, ''''''), advisor)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @special_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'programs'
    AND COLUMN_NAME = 'special_requirements'
);
SET @sql := IF(
  @special_exists > 0,
  'UPDATE programs SET special_info = COALESCE(NULLIF(special_info, ''''''), special_requirements)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @logo_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'programs'
    AND COLUMN_NAME = 'logo'
);
SET @sql := IF(
  @logo_exists > 0,
  'UPDATE programs SET image = COALESCE(NULLIF(image, ''''''), logo)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
