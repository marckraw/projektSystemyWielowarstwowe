<?php

include "../../cors.php";
include "../../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "GET" ) {
    $current_userId = $_GET['id'];

    try {
        $sql = "SELECT * FROM user usr INNER JOIN user_data udata ON usr.user_id = udata.user_id WHERE usr.user_id='$current_userId'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result[0]);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

include "../../closing_connection.php";
exit();
?>
