package main
import (
    "io"
    "log"
    "net/http"
    "os"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
    "encoding/json"
)

type Cat struct {
    Path    string
  }

func get_random_cat_pic() {
    url := "https://cataas.com/cat"
    response, e := http.Get(url)
    if e != nil {
        log.Fatal(e)
    }
    defer response.Body.Close()

    // Open a file for writing
    file, err := os.Create("./assets/tmp.png")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    // Dump the response body to the file. This supports huge files
    _, err = io.Copy(file, response.Body)
    if err != nil {
        log.Fatal(err)
    }
}

func cat_url(w http.ResponseWriter, r *http.Request) {
    get_random_cat_pic()

    cat := Cat{"/assets/tmp.png"}

    js, err := json.Marshal(cat)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(js)
}

func main() {
    var PORT string
    if PORT = os.Getenv("PORT"); PORT == "" {
        PORT = "3001"
    }

    get_random_cat_pic()
    router := mux.NewRouter().StrictSlash(true)
    router.HandleFunc("/cat", cat_url).Methods("GET")
    router.Handle("/assets/{rest}",
     http.StripPrefix("/assets/", http.FileServer(http.Dir("./assets"))))

    c := cors.Default() // Use default CORS
    
    handler := c.Handler(router)
    log.Fatal(http.ListenAndServe(":" + PORT, handler))
}