#!/bin/bash
mkdir -p ../backend/public
rm -rf ../backend/public/*
cp -r dist/* ../backend/public
