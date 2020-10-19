jQuery(document).ready(function($){
//toggle 3d navigation
$('.cd-3d-nav-trigger').on('click', function(){
toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
});
//select a new item from the 3d navigation
$('.cd-3d-nav a').on('click', function(){
var selected = $(this);
selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
updateSelectedNav('close');
});
$(window).on('resize', function(){
window.requestAnimationFrame(updateSelectedNav);
});
function toggle3dBlock(addOrRemove) {
if(typeof(addOrRemove)==='undefined') addOrRemove = true;
$('.cd-header').toggleClass('nav-is-visible', addOrRemove);
$('main').toggleClass('nav-is-visible', addOrRemove);
$('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
}
//this function update the .cd-marker position
function updateSelectedNav(type) {
var selectedItem = $('.cd-selected'),
selectedItemPosition = selectedItem.index() + 1,
leftPosition = selectedItem.offset().left,
backgroundColor = selectedItem.data('color');
$('.cd-marker').removeClassPrefix('color').addClass('color-'+ selectedItemPosition).css({
'left': leftPosition,
});
if( type == 'close') {
$('.cd-marker').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
toggle3dBlock(false);
});
}
}
$.fn.removeClassPrefix = function(prefix) {
this.each(function(i, el) {
var classes = el.className.split(" ").filter(function(c) {
return c.lastIndexOf(prefix, 0) !== 0;
});
el.className = $.trim(classes.join(" "));
});
return this;
};
//this is where we apply opacity to the arrow
$(window).scroll( function(){
//get scroll position
var topWindow = $(window).scrollTop();
//multipl by 1.5 so the arrow will become transparent half-way up the page
var topWindow = topWindow * 1.5;
//get height of window
var windowHeight = $(window).height();
//set position as percentage of how far the user has scrolled
var position = topWindow / windowHeight;
//invert the percentage
position = 1 - position;
//define arrow opacity as based on how far up the page the user has scrolled
//no scrolling = 1, half-way up the page = 0
$('.arrow-wrap').css('opacity', position);
});
//Code stolen from css-tricks for smooth scrolling:
$(function() {
$('a[href*=#]:not([href=#])').click(function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
var target = $(this.hash);
target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
if (target.length) {
$('html,body').animate({
scrollTop: target.offset().top
}, 1000);
return false;
}
}
});
});
});
