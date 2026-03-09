<?php

class OfferCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'Offer';
    public $objectType = 'offers.offer';
    public $languageTopics = ['offers:default'];
    
    public function afterSave() {
        $items = json_decode($this->getProperty('items'), true); 
        if (!empty($items)) { 
            foreach ($items as $item) { 
            /** @var OfferItem $oi */ 
            $oi = $this->modx->newObject('OfferItem'); 
            
            $oi->fromArray([
                'offer_id' => $this->object->get('id'), 
                'name_prod' => $item['name_prod'], 
                'price' => $item['price'], 
                'quantity' => $item['quantity'], 
                'thumb' => $item['thumb'], 
                'image' => $item['image'], 
                'total' => $item['total'],
            ]); 
            
            $oi->save(); 
        } 
    } 
    
    return parent::afterSave();
        
}
    
    public function beforeSet() {
       
        // created_at — ОБЯЗАТЕЛЬНОЕ поле
        $this->setProperty('created_at', date('Y-m-d H:i:s'));
        

        // client — если пусто, ставим пустую строку
        if (!$this->getProperty('client')) {
            $this->setProperty('client', '');
        }

        // total — если пусто, ставим 0
        if (!$this->getProperty('total')) {
            $this->setProperty('total', 0);
        }

        // pdf_path — если пусто, ставим пустую строку
        if (!$this->getProperty('pdf_path')) {
            $this->setProperty('pdf_path', '');
        }

        return parent::beforeSet();
    }
}

return 'OfferCreateProcessor';
