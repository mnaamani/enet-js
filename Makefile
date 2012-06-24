NODE_PREFIX = /usr/local
CXX = g++
CFLAGS = 
NODE_CFLAGS := -g -O2 -fPIC -DPIC -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64 -D_GNU_SOURCE -DEV_MULTIPLICITY=0 -I$(NODE_PREFIX)/include/node
CCLD = $(CXX)
LDFLAGS = 
NODE_LDFLAGS = 
LIBS = -lenet

module:
	node-waf configure build
	mkdir -p node_modules
	rm -rf node_modules/enet
	mkdir -p node_modules/enet/lib
	cp package.json node_modules/enet
	cp enet.js node_modules/enet/lib
	cp build/Release/enetnat.node node_modules/enet/lib
clean:
	node-waf distclean
	rm -fR node_modules/
install:
	cp -r node_modules/enet ~/.node_libraries/
