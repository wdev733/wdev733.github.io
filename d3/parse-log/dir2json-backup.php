<?php
// ------------------------------------------------------
function dir2json($dir)
{
    $a = [];
    if($handler = opendir($dir))
    {
        while (($content = readdir($handler)) !== FALSE)
        {
            if ($content != "." && $content != ".." && $content != "Thumb.db")
            {
                if(is_file($dir."/".$content)) {
                    $a[] = $content;
                } else if(is_dir($dir."/".$content)){
                  $a[$content] = dir2json($dir."/".$content);   
                } 
            } 
        }    
        closedir($handler); 
    } 
    return $a;    
}
$argv1 = $argv[1];

if (stripos($argv1,"-h") !== false) 
{
echo <<<EOT
------------------------------------------------------
dir2json - v0.1.1b

------------------------------------------------------
        
USAGE (from CLI):
 > php dir2json <targetFolder> <outputFile> [JSON_OPTIONS]

EXAMPLE:
 > php dir2json ./images out.json JSON_PRETTY_PRINT

  http://php.net/manual/en/function.json-encode.php

------------------------------------------------------
EOT;
    exit;
}

$argv2 = $argv[2];
$argv3 = $argv[3];
if (empty($argv3)) $argv3 = 0;
else $argv3 = constant($argv3);

if (empty($argv2)) {
    echo "invalid arguments";
    exit;
}

$arr = dir2json($argv1);
$eee = [];
$eee = explode("\\",$argv1);

$rootName = end($eee);
$arr1 = [];
$arr1[$rootName] = $arr;
$json = json_encode($arr1, $argv3);

file_put_contents($argv2, $json);
?>
