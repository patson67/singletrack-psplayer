$(document).ready(function(){
	// les vars globales
	var url = '';
	var audio = document.getElementById('audio');
	var playLoop = 0;
	var leftMark = 0;
	var rightMark = 0;

	function timeUpdate() {
		var currentTime = audio.currentTime;
		var duration = audio.duration;

		// est-ce qu'on veux boucler oui ou non !!
		if(playLoop == 1){
			if(rightMark > leftMark+1){
				if(audio.currentTime >= rightMark){
					audio.currentTime = leftMark;
				}
			}
			else{
				// si leftMark >= rightMark  --> on éteint le bouton playloop
				playLoop = 0;
				$('#btnPlayLoop').removeClass('playLoopOn');
				$('#btnPlayLoop').addClass('playLoopOff');
			}
		}

		// afficher tps avant
		var m = Math.trunc(currentTime/60);
		var s = Math.trunc(currentTime-(m*60));
		if (m<10) { m="0"+m; }
		if (s<10) { s="0"+s; }
		var tpsAvant = m+":"+s;

		// afficher tps apres
		var m = Math.trunc((duration-currentTime)/60);
		var s = Math.trunc((duration-currentTime)-(m*60));
		if (m<10) { m="0"+m; }
		if (s<10) { s="0"+s; }
		var tpsApres = m+":"+s;

		$('#tpsAvant').html(tpsAvant);
		if(!isNaN(duration)){
			$('#tpsApres').html(tpsApres);
		}

		// bouger le curseur
		var cursorMargin = (currentTime / duration) * 200;
		$('.cursor').css('margin-left',cursorMargin + 'px');

		//  que fait-on quand on arrive au bout du mp3
		if(currentTime >= duration){
			audio.pause();
			$('#btn_play').removeClass('player_btn_active');
			$('#btn_pause').removeClass('player_btn_active');	
			audio.currentTime = 0;
			$('.cursor').css('margin-left', '0px');
			$('#cursor').removeClass('cursorAnim');
		}
	}

	$('#timeline').click(function(){
		var audio = document.getElementById('audio');
		var duration = audio.duration;

		// trouver les positions en cliquant dans timeline
		var coordX = event.pageX;
		var lecteurOffsetX = document.getElementById ('lecteurAudio').offsetLeft;
		var timelineOffsetX = this.offsetLeft;

		// css -> transform: translateX(-50%); <- garde malheureusement les coord d'origine. Pas cool !!
		var offset = coordX - lecteurOffsetX - timelineOffsetX - 7;
		var coefficient = (duration/200);
		var position = offset * coefficient;
		audio.currentTime = position;
	});


    // cliquer sur content music démarre le lecteur
	$('.btn_lecteur').click(function(){
		var url = $(this).data('url');
		audio.src = url;
		var res = url.split('/');
		var filename = res[res.length - 1];
		$('#textUrl').html(filename);
		$('#downloadUrl').attr('href', url);
		audio.play();
		audio.addEventListener("timeupdate", timeUpdate, false);
		$('#btn_pause').removeClass('player_btn_active');
		$('#btn_play').addClass('player_btn_active');
		$('#btn_stop').removeClass('player_btn_active');
		$('#lecteurAudio').removeClass('playerHide');
		$('#cursor').addClass('cursorAnim');
	});

	// lecteur btn play
	// pas résolu si url n'existe pas !!!!
	$('#btn_play').click(function(){
		// if(url != ''){
			audio.play();
			$('#btn_play').addClass('player_btn_active');
			$('#btn_pause').removeClass('player_btn_active');
			$('#btn_stop').removeClass('player_btn_active');
			$('#cursor').addClass('cursorAnim');
		// }
	});

	// lecteur btn pause
	$('#btn_pause').click(function(){
			audio.pause();
			$('#btn_play').removeClass('player_btn_active');
			$('#btn_pause').addClass('player_btn_active');
			$('#btn_stop').removeClass('player_btn_active');
	});

	// lecteur btn stop
	$('#btn_stop').click(function(){
			audio.pause();
			$('#btn_play').removeClass('player_btn_active');
			$('#btn_pause').removeClass('player_btn_active');	
			$('#btn_stop').addClass('player_btn_active');
			audio.currentTime = 0;
			$('.cursor').css('margin-left', '0px');
			$('#cursor').removeClass('cursorAnim');
	});

	$('#btnPlayLoop').click(function(){
		if(playLoop == 0){
			playLoop = 1;
			$('#btnPlayLoop').addClass('playLoopOn');
			$('#btnPlayLoop').removeClass('playLoopOff');
		}
		else{
			playLoop = 0;
			$('#btnPlayLoop').removeClass('playLoopOn');
			$('#btnPlayLoop').addClass('playLoopOff');
		}
	});

	$('#btn_repereA').click(function(){
		var currentTime = audio.currentTime;
		leftMark = currentTime;
		var m = Math.trunc(currentTime/60);
		var s = Math.trunc(currentTime-(m*60));
		if (m<10) { m="0"+m; }
		if (s<10) { s="0"+s; }
		var time = m+":"+s;
		$('#repereA').html(time);
	});

	$('#btn_repereB').click(function(){
		var currentTime = audio.currentTime;
		rightMark = currentTime;
		var m = Math.trunc(currentTime/60);
		var s = Math.trunc(currentTime-(m*60));
		if (m<10) { m="0"+m; }
		if (s<10) { s="0"+s; }
		var time = m+":"+s;
		$('#repereB').html(time);
	});

	$('#closePlayer').click(function(){
		audio.pause();
		$('#lecteurAudio').addClass('playerHide');
		$('#aide_lecteur').addClass('aide_hide');
		$('#aide_lecteur').removeClass('aide_show');
	});

});