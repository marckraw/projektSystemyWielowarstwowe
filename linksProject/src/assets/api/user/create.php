<?php

include "../cors.php";
include "../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "POST" ) {
    $content = file_get_contents("php://input");
    $decoded = json_decode($content);

    $username = $decoded->username;
    $password = $decoded->password;

    $first_name = $decoded->first_name;
    $surname = $decoded->surname;
    $avatar = $decoded->avatar;

    try {
        $pass = hash('sha256', $decoded->password);
        $sql = "INSERT INTO user (username, password) VALUES ('$username', '$pass');";
        $conn->exec($sql);
    } catch(PDOException $e) {
        echo json_encode($e->getMessage());
    }

    try {
        $sql = "SELECT user_id FROM user WHERE username='$username';";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch();

        $current_userId = $result['user_id'];
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }

    try {
        $sql = "INSERT INTO user_data (user_id, first_name, surname) VALUES ('$current_userId', '$first_name', '$surname');";
        $conn->exec($sql);

        echo json_encode('succes');

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
