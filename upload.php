<?php 
require_once 'module/SDK.class.php';
require_once 'module/checkCode.class.php';
$rs = array();
if($_FILES){
	if(checkCode::getCheck() == strtoupper($_POST['checkCode'])){
		$file = $_FILES['upload-file']['tmp_name'];
		$fileName = $_POST['key'] == '' ? time() : $_POST['key'];
		$qiniu = new SDK('access_token','secret_token','bucket');
		$rs = $qiniu->upload($file,$fileName);
	}else{
		$rs['error'] = 'Authentication failure';
	}
}else{
	$rs['error'] = 'file does not exist';
}
echo json_encode($rs);

