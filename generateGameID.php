<?php

	$basedir = "ids";
	$filetype = ".nextID";
	
	// not used really, keep data and programms in seperate dirs!
	if(!file_exists($basedir)) {
		mkdir($basedir);
	}

	if(!file_exists($basedir . "/started.true")) {
		fopen($basedir . "/started.true", "w");
		fopen($basedir . "/0" . $filetype, "w");
	}

	foreach (glob($basedir . "/*" . $filetype) as $filename) {
		$currentID = basename($filename, $filetype);  
	}

	rename($basedir . "/" . $currentID . $filetype, $basedir . "/" . ($currentID + 1) . $filetype);
	fopen($basedir . "/" . $currentID . ".ini", "w");
		
	echo $currentID;

?>
