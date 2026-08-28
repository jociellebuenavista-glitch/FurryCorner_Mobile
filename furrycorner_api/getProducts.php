<?php

header('Content-Type: application/json');

require_once 'db.php';

try {

    $stmt = $conn->prepare("
        SELECT
            product_id,
            product_name,
            category,
            subcategory,
            price,
            stock,
            date_updated,
            image
        FROM products
        ORDER BY product_id ASC
    ");

    $stmt->execute();

    $result = $stmt->get_result();

    $products = [];

    while ($product = $result->fetch_assoc()) {

        $products[] = $product;

    }

    $stmt->close();

    echo json_encode([
        'success' => true,
        'products' => $products
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);

}

?>