(function($){

  var playing = false,
      playtimer,
      count = 0,
      interval = 60000 / 200 / 4,
      slots,
      canvas,
      ctx;


  function step(){
    if( !playing ) return;

    fadeOut();

    $('#board ul:eq(' + count +')')
      .find('li.selected').each(function () {
        var audio = $('#sounds .' + this.className.replace(/\s+.*$/, ''))[0];
        // chrome is lame!, toss off
        audio.currentTime = 0;
        audio.play();
        drawCircle();
      }).end()
      .addClass('active').siblings('ul').removeClass('active');

    if( ++count >= slots.length )
      return (playtimer = setTimeout( round, interval ));
    else
      playtimer = setTimeout( step, interval );
  }

  function round(){
    clearTimeout( playtimer );
    playing = true;
    count = 0;
    step();
  }

  function padify () {
    $('#board li').click(function () {
      var toinsert = { pad : $(this).attr('id') };
      relay.insert("654401F2-23A7-45AB-BBA1-DAB1103D0A6F", toinsert);
    });
  }

  function bpm () {
    $('#bpm input').change(function () {
      interval = 60000 / parseInt(this.value) / 4 ;
    });
  }

  function clear () {
    $('#clear').click(function () {
      $('ul li').each(function (){
        $(this).removeClass('selected');
      });
    });
  }

  function play () {
    round();
  }

  function pause(){
    playing = false;
    clearTimeout( playtimer );
  }

  function play_pause(e){
    if(e) e.preventDefault();
    playing = !playing;
    if( playing )
      $('#play').text('PAUSE') && play();
    else
      $('#play').text('PLAY') && pause();
  }

  function selectPad (item) {
    $('#' + item.pad).toggleClass('selected');
  }
  window.selectPad = selectPad;

  function visualize () {
    canvas = $('#visualization'),
    ctx = canvas[0].getContext('2d');
  }

  function rand (top) {
    return Math.round(Math.random() * top);
  }

  function drawCircle () {
    ctx.beginPath();
    ctx.arc(rand(1000), rand(400), rand(100), 0, Math.PI*2, true);
    ctx.fillStyle = 'rgba('+rand(254)+','+rand(254)+','+rand(254)+', 0.4)';
    ctx.fill();
  }

  function fadeOut(){
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.rect(0,0,960,600);
    ctx.fill();
  }

  $(document).ready(function(){
    slots = $('#board ul');
    padify();
    visualize();
    bpm();
    clear();
    $('#play').click(play_pause);
  });

})(jQuery);