<?php

class OfferItemGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'OfferItem';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $offerId = $this->getProperty('offer_id');
        if ($offerId) {
            $c->where(['offer_id' => $offerId]);
        }
        return $c;
    }

    public function prepareRow(xPDOObject $object) {
        $arr = $object->toArray();
        $arr['total'] = $arr['price'] * $arr['quantity'];
        return $arr;
    }
}

return 'OfferItemGetListProcessor';