# On Windows with Smart App Control, Go can't run natively: use the docker-* targets.
.PHONY: test run build docker-test
test:
	go vet ./... && go test -race -count=1 ./...
run:
	go run .
build:
	CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o bin/server .
docker-test:
	docker run --rm -v "$(CURDIR):/src" -w /src golang:1.27 sh -c "go vet ./... && go test -race -count=1 ./..."
