<?php

class OffersHomeManagerController extends modExtraManagerController {

    public function initialize() {
        $corePath = $this->modx->getOption('offers_core_path', null, MODX_CORE_PATH . 'components/offers/');
        $this->modx->addPackage('offers', $corePath . 'model/');
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['offers:default'];
    }

    public function getPageTitle() {
        return 'Коммерческие предложения';
    }

    public function loadCustomCssJs() {
        $assetsUrl = $this->modx->getOption('offers_assets_url', null, '/assets/components/offers/');

        $this->addJavascript($assetsUrl . 'js/mgr/offers.js');
        $this->addJavascript($assetsUrl . 'js/mgr/offers.utils.js');

        $this->addJavascript($assetsUrl . 'js/mgr/widgets/offers.grid.js');
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/offers.windows.js');
        
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/categories.tree.js');
        
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/products.grid.js');
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/productselector.window.js');
        
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/offeritems.grid.js');
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/offeritems.windows.js');
        $this->addJavascript($assetsUrl . 'js/mgr/widgets/offeritems.temp.grid.js');

        $this->addCss($assetsUrl . 'css/mgr/offers.css');


        $this->addHtml('<script>
            Ext.onReady(function() {
                MODx.load({ xtype: "offers-page-home" });
            });
        </script>');
    }

    public function getTemplateFile() {
        return $this->modx->getOption('offers_core_path', null, MODX_CORE_PATH . 'components/offers/') . 'templates/home.tpl';
    }
}

return 'OffersHomeManagerController';
