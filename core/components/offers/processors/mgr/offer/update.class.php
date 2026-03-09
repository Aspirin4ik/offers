<?php

class OfferUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'Offer';
    public $objectType = 'offers.offer';
    public $languageTopics = ['offers'];
}

return 'OfferUpdateProcessor';