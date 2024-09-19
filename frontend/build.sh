#!/bin/bash
mkdir -p ../backend/public
rm -rf ../backend/public/*
cp -r dist/* ../backend/public
cp src/assets/teal-climate-logo-1.svg ../backend/public/assets
