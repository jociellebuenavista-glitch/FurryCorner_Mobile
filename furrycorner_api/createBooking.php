<?php

header("Content-Type: application/json");

require_once "db.php";

try {

    /* =========================================
       GET JSON DATA
    ========================================= */

    $rawInput = file_get_contents("php://input");

    $data = json_decode($rawInput, true);


    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {

        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON",
            "json_error" => json_last_error_msg()
        ]);

        exit;
    }


    if (!is_array($data)) {

        echo json_encode([
            "success" => false,
            "message" => "No booking data received"
        ]);

        exit;
    }


    /* =========================================
       GET BOOKING INFORMATION
    ========================================= */

    $userId =
        intval($data["user_id"] ?? 0);

    $serviceId =
        intval($data["service_id"] ?? 0);

    $petName =
        trim($data["pet_name"] ?? "");

    $customerName =
        trim($data["customer_name"] ?? "");

    $customerContact =
        trim($data["customer_contact"] ?? "");

    $bookingDate =
        trim($data["booking_date"] ?? "");

    $bookingTime =
        trim($data["booking_time"] ?? "");


    /* =========================================
       VALIDATION
    ========================================= */

    if (
        $userId <= 0 ||
        $serviceId <= 0 ||
        $petName === "" ||
        $customerName === "" ||
        $customerContact === "" ||
        $bookingDate === "" ||
        $bookingTime === ""
    ) {

        echo json_encode([
            "success" => false,
            "message" => "Missing required booking information"
        ]);

        exit;
    }


    /* =========================================
       CHECK SERVICE
    ========================================= */

    $serviceStmt =
        $conn->prepare("
            SELECT service_id
            FROM services
            WHERE service_id = ?
            AND status = 'Active'
        ");


    if (!$serviceStmt) {

        throw new Exception(
            $conn->error
        );

    }


    $serviceStmt->bind_param(
        "i",
        $serviceId
    );


    $serviceStmt->execute();


    $serviceResult =
        $serviceStmt->get_result();


    if ($serviceResult->num_rows === 0) {

        $serviceStmt->close();

        throw new Exception(
            "Service is not available."
        );

    }


    $serviceStmt->close();


    /* =========================================
       INSERT BOOKING
    ========================================= */

    $sql = "

        INSERT INTO bookings (

            user_id,
            service_id,
            pet_name,
            customer_name,
            customer_contact,
            booking_date,
            booking_time,
            status

        )

        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            'Pending'
        )

    ";


    $stmt =
        $conn->prepare($sql);


    if (!$stmt) {

        throw new Exception(
            $conn->error
        );

    }


    $stmt->bind_param(
        "iisssss",
        $userId,
        $serviceId,
        $petName,
        $customerName,
        $customerContact,
        $bookingDate,
        $bookingTime
    );


    $stmt->execute();


    /* =========================================
       GET BOOKING ID
    ========================================= */

    $bookingId =
        $conn->insert_id;


    $stmt->close();


    /* =========================================
       SUCCESS
    ========================================= */

    echo json_encode([

        "success" => true,

        "message" =>
            "Booking created successfully",

        "booking_id" =>
            $bookingId

    ]);


} catch (Exception $e) {

    echo json_encode([

        "success" => false,

        "message" =>
            $e->getMessage()

    ]);

}

?>