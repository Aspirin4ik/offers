<?php

class OfferItemUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'OfferItem';
    public $objectType = 'OfferItem';

    public function beforeSet() {

        // Получаем цену и количество
        $price = (float)$this->getProperty('price');
        $qty   = (int)$this->getProperty('quantity');

        // Пересчитываем сумму
        $this->setProperty('total', $price * $qty);

        return parent::beforeSet();
    }
}

return 'OfferItemUpdateProcessor';
