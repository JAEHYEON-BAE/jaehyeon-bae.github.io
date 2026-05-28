#!/bin/bash
set -e

echo "Cleaning Jekyll..."
bundle exec jekyll clean

echo "Compiling Sass..."
bundle exec ruby -e 'require "sass-embedded"; r = Sass.compile("_sass/main.scss", style: :expanded, source_map: true); File.write("assets/main.css", r.css + "\n/*# sourceMappingURL=main.css.map */\n"); File.write("assets/main.css.map", r.source_map)'

echo "Building Jekyll site..."
bundle exec jekyll build

echo "Starting Jekyll server..."
bundle exec jekyll serve --host 0.0.0.0
