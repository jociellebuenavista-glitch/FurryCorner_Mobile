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

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request data"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Get data from mobile app
|--------------------------------------------------------------------------
*/

$first_name = trim($data["firstName"] ?? "");
$last_name  = trim($data["lastName"] ?? "");
$email      = trim($data["email"] ?? "");
$password   = $data["password"] ?? "";


/*
|--------------------------------------------------------------------------
| Validate required fields
|--------------------------------------------------------------------------
*/

if (
    $first_name === "" ||
    $last_name === "" ||
    $email === "" ||
    $password === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "All required fields must be filled"
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


if (strlen($password) < 6) {

    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Check if email already exists
|--------------------------------------------------------------------------
*/

$check = $conn->prepare(
    "SELECT user_id FROM users WHERE email = ?"
);

$check->bind_param("s", $email);

$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Email already registered"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Hash password
|--------------------------------------------------------------------------
*/

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);


/*
|--------------------------------------------------------------------------
| Create customer account
|--------------------------------------------------------------------------
*/

$role = "customer";

$stmt = $conn->prepare(
    "INSERT INTO users
    (first_name, last_name, email, password, role)
    VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "sssss",
    $first_name,
    $last_name,
    $email,
    $hashedPassword,
    $role
);


if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Account created successfully",
        "user_id" => $stmt->insert_id,
        "first_name" => $first_name,
        "last_name" => $last_name,
        "email" => $email,
        "role" => $role
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to create account"
    ]);
}


$stmt->close();
$conn->close();