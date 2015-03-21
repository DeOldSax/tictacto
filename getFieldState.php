<?php

	$gameID = $_GET["gameID"]; 

	$ini_array = parse_ini_file("ids/" . $gameID . ".ini");

	if(empty($ini_array)) {
		echo "f-1";
	} else {
		echo $ini_array["field"];
	}

?>
