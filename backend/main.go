package main

import (
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)

func main() {

	router := gin.Default()

	// CORS Middleware
	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		Credentials:     true,
		ValidateHeaders: false,
	}))

	// Get Repos Route
	router.GET("/repositories", func(c *gin.Context) {
		// TODO: Add the functionality to query GitHub to get the organization's repositories
	})

	router.Run("localhost:4200")

}
