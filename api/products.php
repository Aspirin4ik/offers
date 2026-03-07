<?php
$parentId = filter_input(INPUT_GET, 'parent', FILTER_VALIDATE_INT) ?? 0;

if (!$parentId) {
    http_response_code(400);
    exit('Не указан parent ID');
}

$criteria = [
    'parent' => $parentId,
    'template' => 3,
    'published' => 1
];

$products = $modx->getCollection('modResource', $criteria);
$data = [];

foreach ($products as $product) {
    // Получаем цену из TV productprice и очищаем от нечисловых символов
    $priceStr = $product->getTVValue('productprice');
    $priceClean = preg_replace('/[^0-9.,-]/', '', $priceStr); // Удаляем всё, кроме цифр, точки, запятой, минуса
    
    // Преобразуем в число (учитываем локаль: запятая → точка)
    $price = (float)str_replace(',', '.', $priceClean);

    $data[] = [
        'id' => $product->get('id'),
        'pagetitle' => htmlspecialchars($product->get('pagetitle')),
        'price' => is_nan($price) ? 0 : round($price, 2)
    ];
}

header('Content-Type: application/json');
echo json_encode($data, JSON_UNESCAPED_UNICODE);
exit;
