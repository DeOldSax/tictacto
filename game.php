<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Tic Tac To</title>
	<link rel="stylesheet" href="style.css">
	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
	<script src="script.js" ></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>

	<div id=prompt style="display: none">
		<h1>Copy url to invite your Friend!</h1>
		<input id="gameIDPrompt" class="textField" value="" type="text" readonly></input>
		<button class="startBtn">Start Tic Tac To!</button>
	</div>

	<div id="hide" style="display: none">

		<div id="gameurl">
			<input class="textField" id="gameIDField" value="" type="text" readonly></input>
		</div>

		<div id="field">
			<div class="row">
				<div id="f11" class="column" state="off">
				</div>
				<div id="f12" class="column" state="off">
				</div>
				<div id="f13" class="column" state="off">
				</div>
			</div>
			<div class="clear"></div>
			<div class="row">
				<div id="f21" class="column" state="off">
				</div>
				<div id="f22" class="column" state="off">
				</div>
				<div id="f23" class="column" state="off">
				</div>
			</div>
			<div class="clear"></div>
			<div class="row">
				<div id="f31" class="column" state="off">
				</div>
				<div id="f32" class="column" state="off">
				</div>
				<div id="f33" class="column" state="off">
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</body>
</html>
