window.onload = function(){
    setTimeout(function(){
        document.querySelector('#loader').setAttribute('class','container animated fadeOut')
    },2000);
}
/* animation of logo git-grad*/
var moleEl = document.querySelector('#logo-git'),
skewEasing = mojs.easing.path('M0,100 C0,100 18.1450901,69.0663515 24.0949898,99.9609384 C30.0448895,130.855525 100,100 100,100');

new mojs.Tween({
repeat:   3,
duration: 1000,
delay:    1100,
onUpdate: function (progress) {
    var skewProgress = skewEasing(progress);
    moleEl.style['transform'] = 'skewX(' + 75*skewProgress + 'deg)';
}
}).play();