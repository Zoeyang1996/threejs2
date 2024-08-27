// JavaScript Document
var counter = 0;

function swap(selected) {
	// First do not display all div id contents
	document.getElementById('home').style.display = 'none';
	document.getElementById('foguangsi').style.display = 'none';
	document.getElementById('wucai').style.display = 'none';
	document.getElementById('duowucai').style.display = 'none';
	
	// Then display the selected div id contents	
	document.getElementById(selected).style.display = 'block';
}
