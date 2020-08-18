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
                if(is_file($dir."/".$content)){
                    $arr = explode('.', $content);                    
                    if(end($arr) != 'cs'){
                        $a[] = $content;  
                    }                  
                } 
                else if(is_dir($dir."/".$content)){
                    $a[$content]['name'] = $content;                    
                    $a[$content]['children'] = dir2json($dir."/".$content);                       
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
 > php dir2json <targetFolder>

EXAMPLE:
 > php dir2json ./images

  http://php.net/manual/en/function.json-encode.php

------------------------------------------------------
EOT;
    exit;
}

$argv2 = "JSON_PRETTY_PRINT";

if (empty($argv2)) $argv2 = 0;
else $argv2 = constant($argv2);

if (empty($argv2)) {
    echo "invalid arguments";
    exit;
}

$arr = dir2json($argv1);
$eee = [];
$eee = explode("\\",$argv1);

$rootName = end($eee);
$arr1 = [];
$arr1['name'] = $rootName;
$arr1['children'] = $arr;
$json = json_encode($arr1, $argv2);

file_put_contents('data.json', $json);
?>
