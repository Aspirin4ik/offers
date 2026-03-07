<?php

class OfferItemCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'OfferItem';

    public function beforeSet() {
        $price = (float)$this->getProperty('price');
        $qty = (int)$this->getProperty('quantity');

        $this->setProperty('total', $price * $qty);

        return parent::beforeSet();
    }
}

return 'OfferItemCreateProcessor';