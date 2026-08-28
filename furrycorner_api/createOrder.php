<?php

header("Content-Type: application/json");

require_once "db.php";

$transactionStarted = false;

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
            "message" => "No order data received"
        ]);

        exit;
    }


    /* =========================================
       CUSTOMER INFORMATION
    ========================================= */

    $userId =
        intval($data["user_id"] ?? 0);

    $firstName =
        trim($data["first_name"] ?? "");

    $lastName =
        trim($data["last_name"] ?? "");

    $address =
        trim($data["address"] ?? "");

    $city =
        trim($data["city"] ?? "");

    $province =
        trim($data["province"] ?? "");

    $postalCode =
        trim($data["postal_code"] ?? "");

    $phone =
        trim($data["phone"] ?? "");

    $paymentMethod =
        trim($data["payment_method"] ?? "COD");

    $shippingFee =
        floatval($data["shipping_fee"] ?? 0);

    $items =
        $data["items"] ?? [];


    /* =========================================
       VALIDATION
    ========================================= */

    if (
        $userId <= 0 ||
        $firstName === "" ||
        $lastName === "" ||
        $address === "" ||
        $city === "" ||
        $province === "" ||
        $postalCode === "" ||
        $phone === "" ||
        empty($items)
    ) {

        echo json_encode([
            "success" => false,
            "message" => "Missing required order information"
        ]);

        exit;
    }


    /* =========================================
       START TRANSACTION
    ========================================= */

    $conn->begin_transaction();

    $transactionStarted = true;


    /* =========================================
       VARIABLES
    ========================================= */

    $verifiedSubtotal = 0;


    /* =========================================
       PREPARE PRODUCT QUERY
    ========================================= */

    $productSql = "
        SELECT
            product_id,
            product_name,
            price,
            stock
        FROM products
        WHERE product_id = ?
        FOR UPDATE
    ";

    $productStmt =
        $conn->prepare($productSql);

    if (!$productStmt) {

        throw new Exception(
            $conn->error
        );
    }


    /* =========================================
       PREPARE STOCK UPDATE
    ========================================= */

    $stockSql = "
        UPDATE products
        SET stock = stock - ?
        WHERE product_id = ?
        AND stock >= ?
    ";

    $stockStmt =
        $conn->prepare($stockSql);

    if (!$stockStmt) {

        throw new Exception(
            $conn->error
        );
    }


    /* =========================================
       CHECK PRODUCTS AND STOCK
    ========================================= */

    $verifiedItems = [];


    foreach ($items as $item) {

        $productId =
            intval($item["id"] ?? 0);

        $quantity =
            intval($item["quantity"] ?? 0);


        if (
            $productId <= 0 ||
            $quantity <= 0
        ) {

            throw new Exception(
                "Invalid order item."
            );
        }


        /* =====================================
           GET REAL PRODUCT FROM DATABASE
        ===================================== */

        $productStmt->bind_param(
            "i",
            $productId
        );

        $productStmt->execute();


        $result =
            $productStmt->get_result();


        if ($result->num_rows === 0) {

            throw new Exception(
                "Product ID " .
                $productId .
                " was not found."
            );
        }


        $product =
            $result->fetch_assoc();


        $productName =
            $product["product_name"];

        $price =
            floatval($product["price"]);

        $stock =
            intval($product["stock"]);


        /* =====================================
           CHECK STOCK
        ===================================== */

        if ($quantity > $stock) {

            throw new Exception(
                "Only " .
                $stock .
                " item" .
                ($stock == 1 ? "" : "s") .
                " of " .
                $productName .
                " available."
            );
        }


        /* =====================================
           CALCULATE USING DATABASE PRICE
        ===================================== */

        $itemTotal =
            $price * $quantity;


        $verifiedSubtotal +=
            $itemTotal;


        /* =====================================
           SAVE VERIFIED ITEM
        ===================================== */

        $verifiedItems[] = [

            "product_id" =>
                $productId,

            "product_name" =>
                $productName,

            "price" =>
                $price,

            "quantity" =>
                $quantity,

            "item_total" =>
                $itemTotal

        ];
    }


    $productStmt->close();


    /* =========================================
       CALCULATE TOTAL
    ========================================= */

    $totalAmount =
        $verifiedSubtotal +
        $shippingFee;


    /* =========================================
       INSERT ORDER
    ========================================= */

    $orderSql = "
        INSERT INTO orders (
            user_id,
            first_name,
            last_name,
            address,
            city,
            province,
            postal_code,
            phone,
            payment_method,
            subtotal,
            shipping_fee,
            total_amount,
            status
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, 'Pending'
        )
    ";


    $orderStmt =
        $conn->prepare($orderSql);


    if (!$orderStmt) {

        throw new Exception(
            $conn->error
        );
    }


    $orderStmt->bind_param(
        "issssssssddd",
        $userId,
        $firstName,
        $lastName,
        $address,
        $city,
        $province,
        $postalCode,
        $phone,
        $paymentMethod,
        $verifiedSubtotal,
        $shippingFee,
        $totalAmount
    );


    $orderStmt->execute();


    $orderId =
        $conn->insert_id;


    $orderStmt->close();


    /* =========================================
       PREPARE ORDER ITEMS
    ========================================= */

    $itemSql = "
        INSERT INTO order_items (
            order_id,
            product_id,
            product_name,
            price,
            quantity,
            item_total
        )
        VALUES (?, ?, ?, ?, ?, ?)
    ";


    $itemStmt =
        $conn->prepare($itemSql);


    if (!$itemStmt) {

        throw new Exception(
            $conn->error
        );
    }


    /* =========================================
       INSERT ITEMS + DEDUCT STOCK
    ========================================= */

    foreach ($verifiedItems as $item) {

        $productId =
            $item["product_id"];

        $productName =
            $item["product_name"];

        $price =
            $item["price"];

        $quantity =
            $item["quantity"];

        $itemTotal =
            $item["item_total"];


        /* =====================================
           DEDUCT STOCK
        ===================================== */

        $stockStmt->bind_param(
            "iii",
            $quantity,
            $productId,
            $quantity
        );


        $stockStmt->execute();


        if ($stockStmt->affected_rows !== 1) {

            throw new Exception(
                "Unable to update stock for " .
                $productName
            );
        }


        /* =====================================
           INSERT ORDER ITEM
        ===================================== */

        $itemStmt->bind_param(
            "iisdid",
            $orderId,
            $productId,
            $productName,
            $price,
            $quantity,
            $itemTotal
        );


        $itemStmt->execute();
    }


    $itemStmt->close();

    $stockStmt->close();


    /* =========================================
       COMMIT
    ========================================= */

    $conn->commit();

    $transactionStarted = false;


    /* =========================================
       SUCCESS
    ========================================= */

    echo json_encode([

        "success" =>
            true,

        "message" =>
            "Order created successfully",

        "order_id" =>
            $orderId,

        "subtotal" =>
            $verifiedSubtotal,

        "shipping_fee" =>
            $shippingFee,

        "total_amount" =>
            $totalAmount

    ]);


} catch (Exception $e) {


    /* =========================================
       ROLLBACK
    ========================================= */

    if ($transactionStarted) {

        $conn->rollback();
    }


    echo json_encode([

        "success" =>
            false,

        "message" =>
            $e->getMessage()

    ]);
}

?>