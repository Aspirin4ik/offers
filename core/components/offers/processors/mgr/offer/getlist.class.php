<?php

class OffersGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'Offer';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'offers';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        return $object->toArray();
    }
}

return 'OffersGetListProcessor';