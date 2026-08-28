<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed"
    ]);

    exit;
}


/* =====================================================
   GET REQUEST DATA
===================================================== */

$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request data"
    ]);

    exit;
}


$email =
    trim($data["email"] ?? "");

$password =
    $data["password"] ?? "";


/* =====================================================
   VALIDATE
===================================================== */

if (
    $email === "" ||
    $password === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);

    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid email address"
    ]);

    exit;
}


/* =====================================================
   FIND USER
===================================================== */

$stmt = $conn->prepare(
    "SELECT
        user_id,
        first_name,
        last_name,
        email,
        password,
        role
     FROM users
     WHERE email = ?
     LIMIT 1"
);

$stmt->bind_param(
    "s",
    $email
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
        "message" => "No account found with this email."
    ]);

    $stmt->close();
    $conn->close();

    exit;
}


/* =====================================================
   GET USER
===================================================== */

$user =
    $result->fetch_assoc();


/* =====================================================
   CHECK PASSWORD
===================================================== */

if (!password_verify(
    $password,
    $user["password"]
)) {

    echo json_encode([
        "success" => false,
        "message" => "Incorrect password. Please try again."
    ]);

    $stmt->close();
    $conn->close();

    exit;
}


/* =====================================================
   SUCCESS
===================================================== */

echo json_encode([

    "success" => true,

    "message" => "Login successful",

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

]);


$stmt->close();
$conn->close();

?>