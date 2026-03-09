<?php
$xpdo_meta_map['Offer']= array (
  'package' => 'offers',
  'version' => NULL,
  'table' => 'offers',
  'extends' => 'xPDOSimpleObject',
  'engine' => 'InnoDB',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' =>
  array (
      'title' => null, 
      'client' => null, 
      'created_at' => null, 
      'total' => null, 
      'pdf_path' => null,
  ),
  
  'fieldMeta' => array (
      'title' => array(
          'dbtype' => 'varchar',
          'precision' => '255',
          'phptype' => 'string',
          'null' => false,
      ), 
      'client' => array(
          'dbtype' => 'varchar',
          'precision' => '255',
          'phptype' => 'string',
          'null' => true,
      ), 
      'created_at' => array(
          'dbtype' => 'datetime',
          'phptype' => 'datetime',
          'null' => false,
      ), 
      'total' => array(
          'dbtype' => 'decimal',
          'precision' => '10,2',
          'phptype' => 'float',
          'null' => true,
      ),
      'pdf_path' => array(
          'dbtype' => 'varchar',
          'precision' => '255',
          'phptype' => 'string',
          'null' => true,
      ),
  ),

  'composites' => 
  array (
    'Items' => 
    array (
      'class' => 'OfferItem',
      'local' => 'id',
      'foreign' => 'offer_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
