package model

import "time"

type Todo struct {
	ID          string     `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Title       string     `gorm:"not null" json:"title"`
	Description *string    `json:"description"`
	StartDate   *time.Time `json:"startDate"`
	EndDate     *time.Time `json:"endDate"`
	PriorityID  string     `gorm:"not null" json:"priorityId"`
	Priority    *Priority  `json:"priority"`
	StatusID    string     `gorm:"not null" json:"statusId"`
	Status      *Status    `json:"status"`
	Labels      []*Label   `gorm:"many2many:todo_labels;" json:"labels"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}
