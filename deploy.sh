#!/bin/bash

yarn clean
yarn run build
cd dist
git init
git checkout -b master
git add --all
git commit --message 'ci: deploy'
git push --force \
  git@github.com:BlackGlory/2d-game-library-benchmark.git \
  master:gh-pages
cd ..
