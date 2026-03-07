<?php

class ProductGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'msProduct';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        /* === JOIN TV: цена === */
        $c->leftJoin('modTemplateVarResource', 'PriceTV', "
            PriceTV.contentid = msProduct.id 
            AND PriceTV.tmplvarid = (
                SELECT id FROM {$this->modx->getTableName('modTemplateVar')}
                WHERE name = 'productprice' LIMIT 1
            )
        ");

        /* === JOIN ms2Gallery: главное фото === */
        $c->leftJoin('msResourceFile', 'Gallery', "
            Gallery.resource_id = msProduct.id
            AND Gallery.rank = 0
        ");

        /* === SELECT === */
        $c->select([
            'msProduct.id',
            'msProduct.pagetitle AS name_prod',
            'PriceTV.value AS price',
            'Gallery.url AS thumb',
            'Gallery.file AS image'
        ]);

        /* === Фильтр по категории === */
        $categoryId = (int)$this->getProperty('category_id');
        if ($categoryId) {

            // Получаем все дочерние ресурсы категории (включая подкатегории)
            $children = $this->modx->getChildIds($categoryId, 10);
            $children[] = $categoryId;

            // Фильтруем только товары (msProduct)
            $c->where([
                'msProduct.id:IN' => $children,
                'msProduct.class_key' => 'msProduct',
                'msProduct.template' => 5
            ]);
        }

        /* === Поиск === */
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'msProduct.pagetitle:LIKE' => "%{$query}%"
            ]);
        }

        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        $arr = $object->toArray();

        /* Цена как число */
        $arr['price'] = (float)$arr['price'];

        /* Приводим пути к изображениям */
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
