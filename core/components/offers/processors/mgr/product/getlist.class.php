<?php

class ProductGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modResource';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        // JOIN с таблицей ms2 продуктов
        $c->leftJoin('msProductData', 'ProductData', 'ProductData.id = modResource.id');

        // JOIN TV productprice
        $c->leftJoin('modTemplateVarResource', 'PriceTV', "
            PriceTV.contentid = modResource.id 
            AND PriceTV.tmplvarid = (
                SELECT id FROM {$this->modx->getTableName('modTemplateVar')}
                WHERE name = 'productprice' LIMIT 1
            )
        ");

        // Выбираем нужные поля
        $c->select([
            'modResource.id',
            'modResource.pagetitle AS name_prod',
            'PriceTV.value AS price',
            'ProductData.image',
            'ProductData.thumb'
        ]);

        // Фильтр по категории
        $categoryId = (int)$this->getProperty('category_id');
        if ($categoryId) {
            // Получаем все дочерние ресурсы категории
        $children = $this->modx->getChildIds($categoryId, 10); // глубина 10 уровней
        $children[] = $categoryId;

        // Фильтруем только товары (msProduct)
        $c->where([
            'modResource.id:IN' => $children,
            'modResource.class_key' => 'msProduct'
        ]);

        }

        // Поиск
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'modResource.pagetitle:LIKE' => "%{$query}%"
            ]);
        }

        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        $arr = $object->toArray();

        // Цена как число
        $arr['price'] = (float)$arr['price'];

        // Приводим пути к изображениям
        if (!empty($arr['thumb'])) {
            $arr['thumb'] = '/' . ltrim($arr['thumb'], '/');
        }
        if (!empty($arr['image'])) {
            $arr['image'] = '/' . ltrim($arr['image'], '/');
        }

        return $arr;
    }
}

return 'ProductGetListProcessor';