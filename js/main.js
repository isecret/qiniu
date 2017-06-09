var _WEBSITE_ = 'https://static.isecret.vip';

// 通过自定义文件选择打开file
$('.select-file').click(function(){
	$('input[name="upload-file"]').click();
});
// file打开事件
$('input[name="upload-file"]').click(function(){
	$('input[name="upload-file"]').on("change",function(){
		$('input[name="key"]').val(this.files[0].name);
		$('.box-file-preview-file-name').text(this.files[0].name);
		$('.select-file').text('已选择');
		$('.box-file-preview').show(100);
	});
});
// 获取验证码
$('.checkBtn').click(function(e){
	if($($('input[name="upload-file"]')[0]).val() != ''){
		updateCode(e);
		$('.popup-bg').show();
		$('.checkBox').show(100);
	}else{
		tips({
			'title': '未选择文件',
			'message': '请选择文件后再试'
		});
	}
});
// 关闭遮罩层
$('.decorate-btn-ture').click(function(){
	window.location.reload();
});
// 更新验证码
function updateCode(e){
	$('.getCode').attr('src','getCode.php?' + e.timeStamp );
}

// 点击验证码更新
$('.getCode').click(function(e){
	updateCode(e);
});

// 弹出层提示
function tips(e){
	$('.box-tips-title').text(e.title);
	$('.box-tips-message').text(e.message);
	$('.popup-bg').show();
	$('.box-tips').show(100);
}
// 上传文件信息及验证码
$('.uploadNow').click(function(){
	$('.checkBox').hide(100);
	if($('input[name="checkCode"]').val() != ''){
		tips({
			title: '正在上传',
			message: '请勿关闭浏览器'
		});
		setTimeout('upload()',100);
	}else{
		tips({
			title: '验证码错误',
			message: '请重新输入后再试一次'
		});
	}
});

// 异步上传
function upload(){
	$.ajax({  
		url: 'upload.php',  
		type: 'POST',  
		data: new FormData($( "#uploadForm" )[0]),  
		async: false, 
		cache: false,
		contentType: false,  
		processData: false,
		success: function (e) {
			$('.box-tips').hide();
			e = $.parseJSON(e);
			if(e.error){
				var title = '';
				var message = '';
				switch(e.error){
					case 'Authentication failure':
						title = '验证码错误';
						message = '请重新输入后再试一次';
						break;
					case 'file does not exist':
						title = '文件未找到';
						message = '请重新选择后再试一次';
						break;
					case 'file exists':
						title = '文件名已存在';
						message = '请重命名后再试一次';
						break;
				}
				tips({
					title: title,
					message: message
				});
			}
			if(e.hash && e.key){
				$('.copyUrl-txt').val(_WEBSITE_ + '/' + e.key);
				$('.box-copy').show(100);
			}
		},  
		error: function (e) {
			console.log(e);
		}  
	}); 
}

// 复制按钮
$('.copyUrl-btn').click(function(){
	$(".copyUrl-txt").focus();
	$(".copyUrl-txt").select();
	document.execCommand("Copy");
	$('.copyUrl-btn').text('已复制');
});