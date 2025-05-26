package model

import "time"

type Todo struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Description *string    `json:"description"`
	StartDate   *time.Time `json:"startDate"`
	EndDate     *time.Time `json:"endDate"`

	PriorityID string    `json:"priorityId"`
	Priority   *Priority `json:"priority"`

	StatusID string  `json:"statusId"`
	Status   *Status `json:"status"`

	Labels []*Label `gorm:"many2many:todo_labels;" json:"labels"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
