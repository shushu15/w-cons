<?php
//ini_set('error_reporting', E_ALL);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1); 
// список языков
$sites = array(
    "ru" => "http://w-cons.com/ru/",
    "en" => "http://w-cons.com/en/",
 //   "de" => "http://w-cons.com/de/",
 //   "cz" => "http://w-cons.com/cz/",
);
// получаем язык
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
// проверяем язык
if (!in_array($lang, array_keys($sites))){
    $lang = 'ru';
}
header('Location: ' . $sites[$lang]);
?>

