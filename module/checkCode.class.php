<?php 
session_start();
class checkCode{
	// 宽&高
	protected $width;
	protected $height;
	// 验证码长度
	protected $length;

	public function __construct($width=80,$height=20,$length=4){
		$this->width = $width;
		$this->height = $height;
		$this->length = $length;
	}

	public function getCode(){
		function random($len) {
		    $srcstr = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
		    mt_srand();
		    $strs = "";
		    for ($i = 0; $i < $len; $i++) {
		        $strs .= $srcstr[mt_rand(0, strlen($srcstr)-1)];
		    }
		    return $strs;
		}
		$str = random($this->length); 
		header("Content-Type:image/png");
		$im = imagecreate($this->width, $this->height);
		$back = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
		$pix  = imagecolorallocate($im, rand(200,255), rand(200,255), rand(200,255));
		$font = imagecolorallocate($im, rand(0, 50), rand(0, 50), rand(0, 50));
		mt_srand();
		for ($i = 0; $i < 1000; $i++) {
		    imagesetpixel($im, mt_rand(0, $this->width), mt_rand(0, $this->height), $pix);
		}
		imagestring($im, rand(10, 20), rand(10,40), rand(0, 4), $str, $font);
		imagerectangle($im, 0, 0, $this->width -1, $this->height -1, $font);
		imagepng($im);
		imagedestroy($im);
		$_SESSION["checkCode"] = $str;
	}

	public static function getCheck(){
		return $_SESSION['checkCode'];
	}
}