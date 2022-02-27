"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t){var n={};function e(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===_typeof(t)&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var s in t)e.d(o,s,function(n){return t[n]}.bind(null,s));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s="./src/js/main.js")}({"./src/js/main.js":function srcJsMainJs(module,exports){eval("// const { output } = require(\"../../webpack.config\");\n\nconst btns = document.querySelectorAll('.button');\nconst outPut = document.querySelector('#cardWrap');\n\nif (btns) {\n\tbtns.forEach((btn) => {\n\t\tbtn.addEventListener('click', () => {\n\n\t\t\t\t//非同期関数。引数dirで、ボタンのdata値入れて、取得APIのURLを判別させる。\n\t\t\t\tconst getMovieData = async (dir) => {\n\t\t\t\t\t// URLの取得（サイトで登録したキー含む）\n\t\t\t\t\tconst url = `https://api.themoviedb.org/3/movie/${dir}?api_key=f424bf39ad620f93e06361406698d85f&language=ja&page=1`;\n\n\t\t\t\t\tconst json = await fetch(url)\n\t\t\t\t\t\t.then((response) => {\n\t\t\t\t\t\t\tconsole.log('これは非同期処理成功!');\n\t\t\t\t\t\t\treturn response.json();\n\t\t\t\t\t\t}).catch(error => {\n\t\t\t\t\t\t\tconsole.error('これは非同期処理失敗!', error);\n\t\t\t\t\t\t\treturn null;\n\t\t\t\t\t\t});\n\n\t\t\t\t\t// console.log(json.results);\n\n\t\t\t\t\tif (json.results) {\n\t\t\t\t\t\t// map内だと加工の都度消してしまうので、成功判定あれば中身を消す。\n\t\t\t\t\t\toutPut.textContent = '';\n\t\t\t\t\t}\n\t\t\t\t\t// 配列を全て（一つ一つ）加工\n\t\t\t\t\tjson.results.map((movie) => {\n\n\t\t\t\t\t\t// img\n\t\t\t\t\t\tlet mvImgSrc = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;\n\n\t\t\t\t\t\tlet listContent = `\n\t\t\t\t\t\t\t<li class=\"card\">\n\t\t\t\t\t\t\t\t<a href=\"https://www.themoviedb.org/movie/${movie.id}\" target=\"_blank\" rel=\"noopener\">\n\t\t\t\t\t\t\t\t\t<p class=\"mvTitle\">${movie.title}</p>\n\t\t\t\t\t\t\t\t\t<img src=\"${mvImgSrc}\" class=\"mvImg\">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t`;\n\n\t\t\t\t\t\tconst outPut = document.querySelector('#cardWrap');\n\n\t\t\t\t\t\t// isShowがついていなければulに挿入\n\t\t\t\t\t\tif (! outPut.classList.contains('isShow')) {\n\t\t\t\t\t\t\toutPut.insertAdjacentHTML(\"afterbegin\", listContent);\n\t\t\t\t\t\t}\n\t\t\t\t\t\t// すでにあれば上に追加。\n\t\t\t\t\t\t else if(outPut.classList.contains('isShow') ) {\n\t\t\t\t\t\t\toutPut.insertAdjacentHTML(\"afterbegin\", listContent);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\n\t\t\t\t\t// 表示状態付け替え\n\t\t\t\t\tif (outPut.classList.contains('isHidden')) {\n\t\t\t\t\t\toutPut.classList.remove('isHidden');\n\t\t\t\t\t\toutPut.classList.add('isShow', dir);\n\t\t\t\t\t}\n\n\t\t\t\t\t// 表示判別テキスト\n\t\t\t\t\tconst desc = document.querySelector('#desc');\n\t\t\t\t\tlet dirName = '';\n\t\t\t\t\tswitch(dir) {\n\t\t\t\t\t\tcase 'now_playing':\n\t\t\t\t\t\t\tdirName = '上映中'\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'popular':\n\t\t\t\t\t\t\tdirName = '人気'\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'top_rated':\n\t\t\t\t\t\t\tdirName = '高評価'\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tdesc.textContent = dirName;\n\t\t\t\t}\n\n\t\t\t\t//btnのdata値により発火\n\t\t\t\tconst movieType = btn.dataset.movie;\n\t\t\t\tgetMovieData(movieType);\n\n\n\t\t});\n\t});\n\n\n\tconst resetBtn = document.querySelector('#buttonReset');\n\tif(resetBtn) {\n\t\tresetBtn.addEventListener('click', () => {\n\t\t\toutPut.innerHTML = '';\n\t\t\tif (outPut.classList.contains('isShow')) {\n\t\t\t\toutPut.classList.remove('isShow');\n\t\t\t\toutPut.classList.add('isHidden');\n\t\t\t}\n\t\t\tdesc.textContent = '';\n\t\t});\n\t}\n\n}\n\n\n\n// === selectで取得処理 =======\n\nconst select = document.querySelector('#select');\n\nif (select) {\n\tselect.addEventListener('change', () => {\n\t\tconst selectedVal = select.value;\n\n\t\t// console.log(selectedVal);\n\t\tif (selectedVal === '0') {\n\t\t\tconsole.log('okok');\n\t\t\treturn false;\n\t\t}\n\n\t\t//非同期関数。引数dirで、ボタンのvalue値入れて、取得APIのURLを判別させる。\n\t\tconst getPersonData = async (id) => {\n\t\t\t// URLの取得（サイトで登録したキー含む）\n\t\t\tconst url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f424bf39ad620f93e06361406698d85f&language=ja`;\n\n\t\t\tconst json = await fetch(url)\n\t\t\t\t.then((response) => {\n\t\t\t\t\tconsole.log('これは非同期処理成功!');\n\t\t\t\t\treturn response.json();\n\t\t\t\t}).catch(error => {\n\t\t\t\t\tconsole.error('これは非同期処理失敗!', error);\n\t\t\t\t\treturn null;\n\t\t\t\t});\n\n\t\t\t// console.log(json.cast);\n\n\t\t\tif (json.cast) {\n\t\t\t\t// map内だと加工の都度消してしまうので、成功判定あれば中身を消す。\n\t\t\t\toutPut.textContent = '';\n\t\t\t\t// ソート出来ないので有名作が上に来るように配列を逆にする。\n\t\t\t\tjson.cast.reverse();\n\t\t\t}\n\n\t\t\t\t// 配列を全て（一つ一つ）加工\n\t\t\tjson.cast.map((movie) => {\n\n\t\t\t\t// img\n\t\t\t\tlet mvImgSrc = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;\n\n\t\t\t\tlet listContent = `\n\t\t\t\t\t<li class=\"card\">\n\t\t\t\t\t\t<a href=\"https://www.themoviedb.org/movie/${movie.id}\" target=\"_blank\" rel=\"noopener\">\n\t\t\t\t\t\t\t<p class=\"mvTitle\">${movie.title}</p>\n\t\t\t\t\t\t\t<img src=\"${mvImgSrc}\" class=\"mvImg\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t`;\n\n\t\t\t\tconst outPut = document.querySelector('#cardWrap');\n\n\t\t\t\t// isShowがついていなければulに挿入\n\t\t\t\tif (! outPut.classList.contains('isShow')) {\n\t\t\t\t\toutPut.insertAdjacentHTML(\"afterbegin\", listContent);\n\t\t\t\t}\n\t\t\t\t// すでにあれば上に追加。\n\t\t\t\t else if(outPut.classList.contains('isShow') ) {\n\t\t\t\t\toutPut.insertAdjacentHTML(\"afterbegin\", listContent);\n\t\t\t\t}\n\t\t\t});\n\n\t\t\t// 表示状態付け替え\n\t\t\tif (outPut.classList.contains('isHidden')) {\n\t\t\t\toutPut.classList.remove('isHidden');\n\t\t\t\toutPut.classList.add('isShow', 'person');\n\t\t\t}\n\n\t\t\t// 表示判別テキスト\n\t\t\tconst desc = document.querySelector('#desc');\n\t\t\tconst optionText = select.options[select.selectedIndex].text;\n\t\t\tdesc.textContent = optionText + 'の出演作';\n\t\t}\n\n\t\t//btnのvalue値により発火\n\t\tgetPersonData(selectedVal);\n\t});\n}\n\n\n//# sourceURL=webpack:///./src/js/main.js?")}});