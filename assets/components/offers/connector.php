<?php
require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

// ВАЖНО: загружаем пакет offers
$corePath = $modx->getOption('offers_core_path', null, MODX_CORE_PATH . 'components/offers/');
$modx->addPackage('offers', $corePath . 'model/');

$modx->log(modX::LOG_LEVEL_ERROR, 'CONNECTOR: ' . print_r($_REQUEST, true));

$modx->request->handleRequest([
    'processors_path' => $corePath . 'processors/',
    'location' => '',
]);
