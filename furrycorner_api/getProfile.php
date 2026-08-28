<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once "db.php";


/* =====================================================
   ONLY GET REQUESTS
===================================================== */

if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([
        "success" => false,
        "message" => "Only GET requests are allowed"
    ]);

    exit;
}


/* =====================================================
   GET USER ID
===================================================== */

$user_id = $_GET["user_id"] ?? "";


if ($user_id === "") {

    echo json_encode([
        "success" => false,
        "message" => "User ID is required"
    ]);

    exit;
}


/* =====================================================
   GET USER FROM DATABASE
===================================================== */

$stmt = $conn->prepare(
    "SELECT
        user_id,
        first_name,
        last_name,
        email,
        role
     FROM users
     WHERE user_id = ?
     LIMIT 1"
);


$stmt->bind_param(
    "i",
    $user_id
);


$stmt->execute();


$result =
    $stmt->get_result();


/* =====================================================
   USER NOT FOUND
===================================================== */

if ($result->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);

    $stmt->close();
    $conn->close();

    exit;
}


/* =====================================================
   USER FOUND
===================================================== */

$user =
    $result->fetch_assoc();


echo json_encode([

    "success" => true,

    "user" => [

        "user_id" =>
            $user["user_id"],

        "first_name" =>
            $user["first_name"],

        "last_name" =>
            $user["last_name"],

        "email" =>
            $user["email"],

        "role" =>
            $user["role"]

    ]

]);


$stmt->close();
$conn->close();

?>