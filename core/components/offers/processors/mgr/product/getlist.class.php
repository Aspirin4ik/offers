<?php

class ProductGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'modResource';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'offers.product';

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
        if ($categoryId > 0) {

            // Получаем все дочерние категории
            $children = $this->modx->getChildIds($categoryId, 10);
            $children[] = $categoryId;

            // Ищем товары, у которых parent — одна из категорий
            $c->where([
                'modResource.parent:IN' => $children,
                'modResource.class_key' => 'msProduct'
            ]);
        } else {
            // Если категория не выбрана — не показываем ничего
            $c->where(['modResource.id' => 0]);
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
