package model

type Priority struct {
	ID    string `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name  string `gorm:"not null" json:"name"`
	Order int    `gorm:"not null" json:"order"`
}
