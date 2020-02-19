
all: revealjs

revealjs : purescript.md
	pandoc -t revealjs --slide-level=6 -s -o purescript.html purescript.md -V revealjs-url=./reveal.js -V theme=${THEME}
