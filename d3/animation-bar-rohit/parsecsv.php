<?php
    if ( isset($_FILES["csvfile"])) {
        //if there was an error uploading the file
        if ($_FILES["csvfile"]["error"] > 0) {
            echo "Return Code: " . $_FILES["csvfile"]["error"] . "<br />";
        }
        else {
            $fh = fopen($_FILES['csvfile']['tmp_name'], 'r+');

            $lines = array();
            while( ($row = fgetcsv($fh, 8192)) !== FALSE ) {
                $lines[] = $row;
            }
            echo json_encode($lines);
        }
    } else {
        echo "No file selected <br />";
    }
?>