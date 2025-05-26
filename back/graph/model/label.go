package model

type Label struct {
	ID    string  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name  string  `gorm:"not null" json:"name"`
	Todos []*Todo `gorm:"many2many:todo_labels;" json:"todos"`
}
