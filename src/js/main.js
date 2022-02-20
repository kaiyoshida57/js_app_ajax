// const { output } = require("../../webpack.config");

const btns = document.querySelectorAll('.button');
const outPut = document.querySelector('#cardWrap');

if (btns) {
	btns.forEach((btn) => {
		btn.addEventListener('click', () => {

				//非同期関数。引数dirで、ボタンのdata値入れて、取得APIのURLを判別させる。
				const getMovieData = async (dir) => {
					// URLの取得（サイトで登録したキー含む）
					const url = `https://api.themoviedb.org/3/movie/${dir}?api_key=f424bf39ad620f93e06361406698d85f&language=ja&page=1`;

					const json = await fetch(url)
						.then((response) => {
							console.log('これは非同期処理成功!');
							return response.json();
						}).catch(error => {
							console.error('これは非同期処理失敗!', error);
							return null;
						});

					// console.log(json.results);

					//配列を全て加工
					json.results.map((movie) => {

						// img
						let mvImgSrc = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;

						let listContent = `
							<li class="card">
								<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" rel="noopener">
									<p class="mvTitle">${movie.title}</p>
									<img src="${mvImgSrc}" class="mvImg">
								</a>
							</li>
						`;

						const outPut = document.querySelector('#cardWrap');

						// isShowがついていなければulに挿入
						if (! outPut.classList.contains('isShow')) {
							outPut.insertAdjacentHTML("afterbegin", listContent);
						}
						// すでにあれば上に追加。
						 else if(outPut.classList.contains('isShow') ) {
							outPut.insertAdjacentHTML("afterbegin", listContent);
						}
					});

					// 表示状態付け替え
					if (outPut.classList.contains('isHidden')) {
						outPut.classList.remove('isHidden');
						outPut.classList.add('isShow', dir);
					}

					// 表示判別テキスト
					const desc = document.querySelector('#desc');
					let dirName = '';
					switch(dir) {
						case 'now_playing':
							dirName = '上映中'
							break;
						case 'popular':
							dirName = '人気'
							break;
						case 'top_rated':
							dirName = '高評価'
							break;
					}
					desc.textContent = dirName;
				}

				//btnのdata値により発火
				const movieType = btn.dataset.movie;
				getMovieData(movieType);


		});
	});


	const resetBtn = document.querySelector('#buttonReset');
	if(resetBtn) {
		resetBtn.addEventListener('click', function() {
			outPut.innerHTML = '';
			if (outPut.classList.contains('isShow')) {
				outPut.classList.remove('isShow');
				outPut.classList.add('isHidden');
			}
			desc.textContent = '';
		});
	}

}
