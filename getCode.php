<?php 
require_once 'module/checkCode.class.php';

$code = new checkCode(80,20,5);
$code->getCode();