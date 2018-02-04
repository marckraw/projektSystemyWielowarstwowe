<?php

include "../cors.php";
include "../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "POST" ) {
    $content = file_get_contents("php://input");
    $decoded = json_decode($content);

    $address = $decoded->address;
    $description = $decoded->description;
    $date = $decoded->date;
    $userId = $decoded->userId;

    try {
        $sql = "INSERT INTO links (address, description, date, user_id) VALUES ('$address', '$description', '$date', '$userId');";
        $conn->exec($sql);
        echo json_encode("udalo sie! ");
    } catch(PDOException $e) {
        echo json_encode($e->getMessage());
    }
}


if( $_SERVER['REQUEST_METHOD'] == "GET" ) {
    echo json_encode("GET Request");
}

include "../closing_connection.php";
exit();
?>
