#!/usr/bin/env bash
set -xeu

if [ $(basename $(pwd)) != 'images' ]; then
    exit 1
fi

rm -f ./master.zip
rm -rf ./figma_jp-master
rm -rf ./screenshot
mkdir -p ./screenshot/ja

wget --no-check-certificate https://github.com/junkawa/figma_jp/archive/master.zip
unzip ./master.zip
rm -f ./master.zip
