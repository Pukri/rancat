package main
import (
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
)

func index_handler(w http.ResponseWriter, r *http.Request) {
    url := "https://cataas.com/cat"
    // don't worry about errors
    response, e := http.Get(url)
    if e != nil {
        log.Fatal(e)
    }
    defer response.Body.Close()

    //open a file for writing
    file, err := os.Create("./assets/gopher.png")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    // Use io.Copy to just dump the response body to the file. This supports huge files
    _, err = io.Copy(file, response.Body)
    if err != nil {
        log.Fatal(err)
    }

    // MAIN SECTION HTML CODE
    fmt.Fprintf(w, "<h1>Random cat picture</h1>")
    fmt.Fprintf(w, "<title>Random cat</title>")
    fmt.Fprintf(w, "<img src='assets/gopher.png' alt='gopher' style='width:235px;height:320px;'>")
    fmt.Fprintf(w, "<div style='padding: 20px'><button style='font-size: 30px' onClick='window.location.reload();'>Refresh</button></div>")
}

func main() {
    var PORT string
    if PORT = os.Getenv("PORT"); PORT == "" {
        PORT = "3001"
    }
    http.HandleFunc("/", index_handler)
    http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./assets"))))
    http.ListenAndServe(":" + PORT, nil)
}