<?php

class ProductGetCategoriesProcessor extends modProcessor {

    public function process() {
        $parent = (int)$this->getProperty('id', 8);

        $children = $this->modx->getCollection('modResource', [
            'parent' => $parent,
            'class_key' => 'msCategory'
        ]);

        $list = [];

        foreach ($children as $child) {
            $list[] = [
                'text' => $child->get('pagetitle'),
                'id' => $child->get('id'),
                'leaf' => false,
                'cls' => 'folder'
            ];
        }

        return $this->modx->toJSON($list);
    }
}

return 'ProductGetCategoriesProcessor';
