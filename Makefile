# Makefile para desarrollo-proyecto-signalForHelp-frontend usando uv

# Instalar dependencias con uv
.PHONY: install
install:
    uv sync

# Levantar servidor de desarrollo
.PHONY: run
run:
    uv run npm run dev

# Ejecutar tests
.PHONY: test
test:
    uv run npm test

# Build producción
.PHONY: build
build:
    uv run npm run build

# Construir imagen Docker
.PHONY: docker-build
docker-build:
    docker build -t usuario/signalforhelp-frontend:latest .

# Ejecutar contenedor Docker en puerto 5173
.PHONY: docker-run
docker-run:
    docker run -p 5173:5173 usuario/signalforhelp-frontend:latest