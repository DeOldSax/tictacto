<?php
/* 
 * This function should only been called once for each user 
 * The first player writes his player name X in the file
 * The second player writes his player name U in the file
 * 
 * */

	$gameID = $_GET["gameID"];

	if(!is_file("ids/" . $gameID . ".ini")) {
		echo "X";
	} else {
		echo "U";
	}	
?>
