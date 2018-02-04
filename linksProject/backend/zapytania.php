<?php

include('connection.php');

if( $_SERVER['REQUEST_METHOD'] == "POST" ){
    echo "Metoda POST";
}


if( $_SERVER['REQUEST_METHOD'] == "GET" ){
    echo "Metoda GET";
}


include('closing_connection.php');


?>
