module:
	node-gyp configure
	node-gyp build
	rm -rf node_modules/enet
	mkdir -p node_modules/enet/lib
	cp package.json node_modules/enet
	cp enet.js node_modules/enet/lib
	cp build/Release/lib.target/enetnat.node node_modules/enet/lib
clean:
	node-gyp clean
	rm -fr node_modules/
	rm -fr enet-1.3.5/
install:
	mkdir -p ~/.node_libraries/enet
	cp -r node_modules/enet ~/.node_libraries/

uninstall:
	rm -fr ~/.node_libraries/enet

enet-patch:
	bash install-enet.sh
