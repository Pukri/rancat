FROM golang:latest
ADD . /go/src/app
WORKDIR /go/src/app

# Get dependencies
RUN go get -d github.com/gorilla/mux
RUN go get -d github.com/rs/cors

CMD ["go", "run", "main.go"]