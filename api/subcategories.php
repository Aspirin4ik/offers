<?php
$parentId = filter_input(INPUT_GET, 'parent', FILTER_VALIDATE_INT) ?? 0;

if (!$parentId) {
    http_response_code(400);
    exit('Не указан parent ID');
}

$criteria = [
    'parent' => $parentId,
    'template' => 2,
    'published' => 1
];

$subcats = $modx->getCollection('modResource', $criteria);
$data = [];

foreach ($subcats as $subcat) {
    $data[] = [
        'id' => $subcat->get('id'),
        'pagetitle' => htmlspecialchars($subcat->get('pagetitle'))
    ];
}

header('Content-Type: application/json');
echo json_encode($data, JSON_UNESCAPED_UNICODE);
exit;
