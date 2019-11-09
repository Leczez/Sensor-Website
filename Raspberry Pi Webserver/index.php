<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css">
		<title>Raspberry Pi Sensorer</title>
		<meta http-equiv="refresh" content="10"/>
	</head>
	<BODY>
		<h1 id="rpi">Sensor data</h1>

		<div id="mydata">
			<h2>Huset:</h2>
			<?php
				$file2 = fopen("Huset.txt","r");
				$housestatus = fread($file2,filesize("Huset.txt"));
				echo "<p>$housestatus</p>";
		 	?>
	 </div>
		<!--<embed src="poolenhemma.txt"></embed> -->
		<div id="mydata">
		<h2>Husvagnen:</h2>

			<?php
				$file1 = fopen("Husvagnen.txt","r");
				$caravanstatus = fread($file1,filesize("Husvagnen.txt"));
				echo "<p>$caravanstatus</p>";
			?>
		</div>
		<!--<embed src="batterihusvagn.txt"></embed> -->



		<script>

		//const fs = require('fs');
		//document.write("helloworld");
		//	function readfile(){

	//fs.readFile("batterihusvagn.txt");
	//document.getElementById('battery').innerHTML += fs;

//}
		</script>
	</BODY>
</html>
