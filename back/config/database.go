package config

import (
	"fmt"
	"os"

	"github.com/noonyuu/todo-list/graph/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func StartDatabase() (*gorm.DB, error) {
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	port := os.Getenv("POSTGRES_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s",
		host, user, password, dbName, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	if err := migrateDatabase(db); err != nil {
		return nil, err
	}
	return db, err
}

func migrateDatabase(db *gorm.DB) error {
	return db.AutoMigrate(
		model.Todo{},
	)
}
