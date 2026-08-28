<?php

header('Content-Type: application/json');

require_once 'db.php';

try {

    if (!isset($_GET['user_id'])) {
        echo json_encode([
            'success' => false,
            'message' => 'User ID is required'
        ]);
        exit;
    }

    $userId = (int) $_GET['user_id'];

    if ($userId <= 0) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid user ID'
        ]);
        exit;
    }


    /*
     * Get all orders belonging to this user
     */

    $orderStmt = $conn->prepare("
        SELECT
            order_id,
            user_id,
            first_name,
            last_name,
            payment_method,
            subtotal,
            shipping_fee,
            total_amount,
            status,
            order_date
        FROM orders
        WHERE user_id = ?
        ORDER BY order_date DESC
    ");

    $orderStmt->bind_param(
        "i",
        $userId
    );

    $orderStmt->execute();

    $orderResult =
        $orderStmt->get_result();


    $orders = [];


    while ($order = $orderResult->fetch_assoc()) {

        /*
         * Get items for this order
         */

        $itemStmt = $conn->prepare("
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
        ");

        $itemStmt->bind_param(
            "i",
            $order['order_id']
        );

        $itemStmt->execute();

        $itemResult =
            $itemStmt->get_result();


        $items = [];


        while ($item = $itemResult->fetch_assoc()) {

            $items[] = $item;

        }


        $itemStmt->close();


        /*
         * Add items to the order
         */

        $order['items'] = $items;


        $orders[] = $order;

    }


    $orderStmt->close();


    echo json_encode([
        'success' => true,
        'orders' => $orders
    ]);


} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);

}

?>