#!/bin/bash

echo "Cleaning Jekyll..."
jekyll clean

echo "Compiling Sass..."
sass _sass/main.scss assets/main.css --style expanded

echo "Building Jekyll site..."
jekyll build

echo "Starting Jekyll server..."
jekyll serve --host 0.0.0.0