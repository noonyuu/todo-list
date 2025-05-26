package model

type Priority struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Order int    `json:"order"`
}
