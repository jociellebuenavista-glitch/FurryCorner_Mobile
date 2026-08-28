<?php

header('Content-Type: application/json');

require_once 'db.php';

try {

    /* =========================================
       GET ORDER ID
    ========================================= */

    if (!isset($_GET['order_id'])) {

        echo json_encode([
            'success' => false,
            'message' => 'Order ID is required'
        ]);

        exit;
    }


    $orderId =
        (int) $_GET['order_id'];


    if ($orderId <= 0) {

        echo json_encode([
            'success' => false,
            'message' => 'Invalid order ID'
        ]);

        exit;
    }


    /* =========================================
       GET ORDER
    ========================================= */

    $orderStmt =
        $conn->prepare("

            SELECT
                order_id,
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
                status,
                order_date

            FROM orders

            WHERE order_id = ?

            LIMIT 1

        ");


    $orderStmt->bind_param(
        "i",
        $orderId
    );


    $orderStmt->execute();


    $orderResult =
        $orderStmt->get_result();


    if ($orderResult->num_rows === 0) {

        echo json_encode([
            'success' => false,
            'message' => 'Order not found'
        ]);

        exit;
    }


    $order =
        $orderResult->fetch_assoc();


    $orderStmt->close();


    /* =========================================
       GET ORDER ITEMS
    ========================================= */

    $itemStmt =
        $conn->prepare("

            SELECT
                item_id,
                order_id,
                product_id,
                product_name,
                price,
                quantity,
                item_total

            FROM order_items

            WHERE order_id = ?

            ORDER BY item_id ASC

        ");


    $itemStmt->bind_param(
        "i",
        $orderId
    );


    $itemStmt->execute();


    $itemResult =
        $itemStmt->get_result();


    $items = [];


    while (
        $item =
        $itemResult->fetch_assoc()
    ) {

        $items[] = $item;

    }


    $itemStmt->close();


    /* =========================================
       ADD ITEMS TO ORDER
    ========================================= */

    $order['items'] =
        $items;


    /* =========================================
       SUCCESS
    ========================================= */

    echo json_encode([

        'success' => true,

        'order' => $order

    ]);


} catch (Exception $e) {

    echo json_encode([

        'success' => false,

        'message' =>
            $e->getMessage()

    ]);

}

?>