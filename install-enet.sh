#!/bin/bash

#version of ENet to use
ENET_VERSION="1.3.5"

# download ENet
if [ ! -e "enet-${ENET_VERSION}.tar.gz" ]
then
  curl -O "http://enet.bespin.org/download/enet-${ENET_VERSION}.tar.gz"
fi

#configure and patch the library
if [ ! -e "enet-${ENET_VERSION}/config.status" ]
then
  tar xzf "enet-${ENET_VERSION}.tar.gz"
  cat protocol.c.exports >> "enet-${ENET_VERSION}/protocol.c"
  pushd "enet-${ENET_VERSION}"
  ./configure
  popd
fi

pushd "enet-${ENET_VERSION}"
#build/rebuild enet
make
sudo make install
popd

