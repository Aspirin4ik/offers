<?php

class ProductGetCategoriesProcessor extends modProcessor {

    public function process() {
        // Узел, который раскрываем
        $parent = (int)$this->getProperty('node', 0);
        if (!$parent) {
            $parent = (int)$this->getProperty('id', 0);
        }

        // Если пришёл root/0 — считаем корнем каталог с ID 8
        if (!$parent) {
            $parent = 8;
        }

        // Получаем только категории miniShop2
        $criteria = [
            'parent'    => $parent,
            'deleted'   => 0,
            'published' => 1,
            'class_key' => 'msCategory',
        ];

        $children = $this->modx->getCollection('modResource', $criteria);

        $list = [];

        foreach ($children as $child) {

            // Есть ли подкатегории
            $hasChildren = $this->modx->getCount('modResource', [
                'parent'    => $child->get('id'),
                'deleted'   => 0,
                'published' => 1,
                'class_key' => 'msCategory',
            ]) > 0;

            $list[] = [
                'text' => $child->get('pagetitle'),
                'id'   => $child->get('id'),
                'leaf' => !$hasChildren,
                'cls'  => 'folder',
            ];
        }

        return $this->outputArray($list);
    }
}

return 'ProductGetCategoriesProcessor';
