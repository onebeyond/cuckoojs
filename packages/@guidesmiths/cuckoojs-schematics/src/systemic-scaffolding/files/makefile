

ensure-dependencies:
	@echo "Ensuring docker is installed..."
	@docker info

brand:
	@echo "Creating our <%=directory%> manifest file..."
	@node_modules/make-manifest/bin/make-manifest
	@cat ./manifest.json

package:
	@echo "Building our <%=directory%> docker image..."
	@docker build --tag <%=directory%> .
	@docker images

qa:
	@echo "Checking that our <%=directory%> tests dont fail..."
	@npm run qa
