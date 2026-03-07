<?php

class ProductGetCategoriesProcessor extends modProcessor {

    public function process() {
        // Узел, который раскрываем
        $parent = (int)$this->getProperty('node', 8);

        // Получаем только категории miniShop2
        $children = $this->modx->getCollection('modResource', [
            'parent' => $parent,
            'deleted' => 0,
            'published' => 1,
            'class_key' => 'msCategory'
        ]);

        $list = [];

        foreach ($children as $child) {

            // Проверяем, есть ли у категории подкатегории
            $hasChildren = $this->modx->getCount('modResource', [
                'parent' => $child->get('id'),
                'deleted' => 0,
                'published' => 1,
                'class_key' => 'msCategory'
            ]) > 0;

            $list[] = [
                'text' => $child->get('pagetitle'),
                'id' => $child->get('id'),
                'leaf' => !$hasChildren, // если нет подкатегорий — лист
                'cls' => 'folder'
            ];
        }

        return $this->outputArray($list);
    }
}

return 'ProductGetCategoriesProcessor';
