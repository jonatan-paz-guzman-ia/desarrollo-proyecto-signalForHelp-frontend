# Makefile para desarrollo-proyecto-signalForHelp-frontend

# Instalar dependencias
.PHONY: install
install:
	npm install

# Levantar servidor de desarrollo
.PHONY: run
run:
	npm run dev

# Ejecutar tests
.PHONY: test
test:
	npm test

# Build producción
.PHONY: build
build:
	npm run build

# Construir imagen Docker
.PHONY: docker-build
docker-build:
	docker build -t usuario/signalforhelp-frontend:latest .

# Ejecutar contenedor Docker en puerto 5173
.PHONY: docker-run
docker-run:
	docker run -p 5173:5173 usuario/signalforhelp-frontend:latest