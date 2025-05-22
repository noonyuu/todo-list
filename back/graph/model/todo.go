package model

import "time"

type Todo struct {
	ID          string    `json:"id" grom:"primaryKey"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	StartDate   time.Time `json:"startDate"`
	EndDate     time.Time `json:"endDate"`
	Priority    int       `json:"priority"`
	Labels      []string  `json:"labels" gorm:"type:text[]"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
