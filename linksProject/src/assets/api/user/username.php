<?php

include "../cors.php";
include "../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "POST" ) {
    $content = file_get_contents("php://input");
    $decoded = json_decode($content);

    $username = $decoded->username;

    try {
        $sql = "SELECT username FROM user WHERE username='$username';";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch();

        echo json_encode($result['username']);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

include "../closing_connection.php";
exit();
?>
