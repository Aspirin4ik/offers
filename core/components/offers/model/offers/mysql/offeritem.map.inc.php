<?php
$xpdo_meta_map['OfferItem']= array (
  'package' => 'offers',
  'version' => NULL,
  'table' => 'offer_items',
  'extends' => 'xPDOSimpleObject',
  'engine' => 'InnoDB',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'offer_id' => NULL,
    'name' => NULL,
    'price' => NULL,
    'quantity' => NULL,
  ),
  'fieldMeta' => 
  array (
    'offer_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
    ),
    'price' => 
    array (
      'dbtype' => 'decimal',
      'precision' => '10,2',
      'phptype' => 'float',
      'null' => false,
    ),
    'quantity' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
  ),
  'aggregates' => 
  array (
    'Offer' => 
    array (
      'class' => 'Offer',
      'local' => 'offer_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
