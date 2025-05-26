package model

type Status struct {
	ID    string `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Code  string `gorm:"unique;not null" json:"code"`
	Name  string `gorm:"not null" json:"name"`
	Order int    `gorm:"not null" json:"order"`
}
