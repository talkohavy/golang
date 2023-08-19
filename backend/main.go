package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)

const (
	reposURL       = "https://api.github.com/orgs/sysdig/repos"
)

type Repository struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	HTMLURL     string `json:"html_url"`
}

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

		resp, err := http.Get(fmt.Sprint(reposURL))

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch repositories"})
			return
		}

		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch repositories"})
			return
		}

		var repositories []Repository

		err = json.NewDecoder(resp.Body).Decode(&repositories)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response"})
			return
		}

		c.JSON(http.StatusOK, repositories)
	})

	// Get Repos Route
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK,"Hello World!")
	})

	router.Run("localhost:8000")
}
