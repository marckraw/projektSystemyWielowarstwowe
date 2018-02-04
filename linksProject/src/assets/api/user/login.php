<?php

include "../cors.php";
include "../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "POST" ) {
    $content = file_get_contents("php://input");
    $decoded = json_decode($content);

    $username = $decoded->username;

    try {
        $sql = "SELECT user_id, username, password FROM user WHERE username='$username';";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $password = hash('sha256', $decoded->password);


        if($password == $result['password']) {
            unset($result['password']);

            echo json_encode($result);
        } else {
            echo json_encode(null);
        }

    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

include "../closing_connection.php";
exit();
?>
