<?php

include "../cors.php";
include "../connection.php";

if( $_SERVER['REQUEST_METHOD'] == "GET" ) {
    $link_id = $_GET['id'];

    print_r($link_id);

    try {
        $sql = "DELETE from links WHERE links.link_id='$link_id'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

include "../closing_connection.php";
exit();
?>
