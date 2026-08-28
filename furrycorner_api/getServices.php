<?php

header("Content-Type: application/json");

require_once "db.php";

try {

    $sql = "
        SELECT
            service_id,
            service_name,
            category,
            price,
            duration,
            status,
            image
        FROM services
        WHERE status = 'Active'
        ORDER BY service_id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    $services = [];

    while ($row = $result->fetch_assoc()) {

        $services[] = [

            "id" =>
                $row["service_id"],

            "category" =>
                $row["category"],

            "name" =>
                $row["service_name"],

            "price" =>
                $row["price"],

            "image" =>
                $row["image"],

            "duration" =>
                $row["duration"],

            /*
             * Your current database does not
             * have an "includes" column.
             *
             * We can leave this empty for now.
             */

            "includes" => ""

        ];

    }

    echo json_encode([

        "success" => true,

        "services" => $services

    ]);

} catch (Exception $e) {

    echo json_encode([

        "success" => false,

        "message" => $e->getMessage()

    ]);

}

?>