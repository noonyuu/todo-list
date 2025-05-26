package model

type Label struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Todos []*Todo `gorm:"many2many:todo_labels;" json:"todos"`
}
