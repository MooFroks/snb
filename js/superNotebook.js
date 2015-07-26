//superNoteBook @St. 2015-07-26-06.53

/*
这部分没有整理，现在是非常混乱的，
昨天弄的太晚了，实在写不动了  =3=||
等下午我睡醒了再搞一下吧。
交互也还有一些问题。
我睡会儿去。。。。
*/


var /*$showDelBtn = $('#iconDelCategory'),
	$delTag = $('#category');
	$showDelBtn2 = $('#iconDelNotes'),
	$delTag2 = ('#list'),*/
	$delBtn = $('.iconDel'),
	$editBtn = $('.iconEdit'),
	on = 'on',
	show = 'show',
	edit = 'edit',
	dur0 = 'fast',
	dur1 = 'slow',
	showBtn = function(clickTag, delTag) {
					$(clickTag).on('click', function(){
						$(this).toggleClass(on);
						var $delTagFindeLi = $(delTag).find('li');
						$delTagFindeLi.each(function() {
							var cons0 = $(this).attr('class').indexOf('edit') > 0;
							if(cons0 === true){
								$(this).removeClass('edit');
								$(this).find('.editCategoryBox').remove();
							}else {
								$(this).find($delBtn).fadeToggle(dur0);
								$(this).find($editBtn).fadeToggle(dur0);
							}
						});
					});
					//dateCtl;
				};
//click:#iconDelCategory, show:#category > iconDel
showBtn('#iconDelCategory', '#category');
showBtn('#iconDelNotes', '#list');
//
//showBtn('#iconAddCategory', '#addCategoryBox');


$('#iconAddCategory').on('click', function(){
	//$(this).toggleClass(on);
	//$(delTag).toggleClass(show);
	$(this).fadeToggle(dur0, function(){
		$('#addCategoryBox').slideToggle(dur1);
	});
});

$('#iconCancel').on('click', function(){
	//$('#addCategoryBox').removeClass(show);
	//$('#iconAddCategory').removeClass(on)
	$(this).parent(this).slideToggle(dur1, function(){
		$('#iconAddCategory').fadeToggle(dur0);
	});
});

//$iconEdit
var editHtml = '<div class="editCategoryBox clearfix"><div class="textarea" contenteditable="true">分类标题</div><button class="btn iconCancel" tag="iconCancel">取消</button><button class="btn iconSubmit c1">确定</button></div>',
	$iconEdit = $('.iconEdit');

$iconEdit.on('click', function(){
	var $thisParent = $(this).parent(this);
	$thisParent.toggleClass(edit).children('.iconDel').fadeToggle(dur0);
	$(this).fadeToggle(dur0, function(){
		$thisParent.append(editHtml);
	});
	
});

//$delBtn
$delBtn.on('click', function(){
	$(this).parent(this).fadeOut(dur1, function(){
		$(this).remove();
	});
	//need array ctl
});

//$li
var $li = $('.li');
$li.on('click', function(){
	$(this).addClass(on).siblings(this).removeClass(on);	
});

//iconAddNewNotes
$('#iconAddNewNotes, #notebookModify').on('click', function(){
	$('#notebookEdit').fadeIn(dur0);
});

$('[tag="cancel"]').on('click', function(){
	$('#notebookEdit').fadeOut(dur0);
});
