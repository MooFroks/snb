/*
 * superNoteBook.js
 * @St. 2015-07-26-06.53 begin
 * @St. 2015-08-19-14.46
**/
var $subNavName = $('#subNavName'),       //子目录标题栏名字
	$subNavNameNUm = $('#subNavNameNUm'), //子目录标题栏数量
	$markdownCtl = $('#markdownCtl'),     //markdown盒子
	$markdownName = $('#markdownName'),   //markdown标题
	$markdownTxt = $('#markdownTxt'),     //markdown内容
	treeNav = {
		init:function(para){
			var def = {
				o: json,      //obj json
				m: "category",//mainNavId 分类目录id
				s: "list"     //subNavId  子目录id
			},
			para = $.extend(def, para);
			//
			treeNav.onload(para);
			treeNav.mainClick(para);
			treeNav.subClick(para);
			treeNav.resetFn(para);
		},
		onload:function(para){
			var str = [[],[]];
			for(var i=0; i < para.o.length; i++){
				try{
					// 一级
					//if(typeof para.o[i]["url"] == "undefined"){
						// 自身无链接
						//str[0].push("<li class='li' id='nav"+i+"'><span class='t'>"+ para.o[i]["name"] +"</span></li>");
						var li  = '<li class="li" id="nav'+i+'">'
							+ '<span class="t">' + para.o[i]["name"] + '</span>'
							+ ' <span class="n">(<span tag="num">' + para.o[i]["list"].length + '</span>)</span>'
							+ '<button class="btn iconDel" id="del'+i+'">删除</button>'
							+ '<button class="btn iconEdit" id="edit'+i+'">修改</button>'
							+ '</li>';
							
						str[0].push(li);
						//console.log(str[0]);
						
					//}//else{
//						// 自身有链接
//						str[0].push("<li class='li' id='nav"+i+"'><a target='contentIframe' class='t' href='"+para.o[i]["url"]+"'>"+ para.o[i]["name"] +"</a></li>");
//					};


					// 二级
					if(para.o[i]["list"] != null){
						//var subStr = "<ul id='nav"+i+'-2'+"'>";
						var subStr = "<ul id='nav"+i+'-2'+"' class='hide'>";
						for(var j=0; j<para.o[i]["list"].length; j++){
							//subStr += "<li class='li'><div class='t'><a target='contentIframe' href="+ para.o[i]["list"][j]["url"] +">"+ para.o[i]["list"][j]["name"] +"</a></div></li>";
							subStr += '<li class="li" id="item'+ j +'">',
							subStr += '		<div class="t">' + para.o[i]["list"][j]["name"] + '</div>',
							subStr += '		<div class="d">' + para.o[i]["list"][j]["txt"] + '</div>',
							subStr += '		<button class="btn iconDel" id="listDel' + j + '">删除</button>',
							subStr += '</li>'
						};
						subStr += "</ul>";
						
						str[1].push(subStr);
					};
				}catch(e){};
			};
			str[0] = str[0].join("");
			str[1] = str[1].join("");
			$("#" + para.m).html(str[0]);
			$("#" + para.s).html(str[1]);
		},
		resetFn:function(para){
			var n = 0,
				$firstLi=$("#"+para.m).children().eq(n),
				id = $firstLi.attr("id")+"-2",
				$firstA=$("#"+id).show().find("li").eq(n);

			$firstLi.addClass("on");
			$firstA.addClass("on");
			
			$subNavName.html(para.o[n]["name"]);
			$subNavNameNUm.html(para.o[n]["list"].length);
			
			$markdownName.html(para.o[n]["list"][n]["name"]);
			$markdownTxt.html(para.o[n]["list"][n]["txt"]);
		},
		mainClick:function(para){
			$("#" + para.m + " li").on("click",function(){
				var $this = $(this),
					id = $this.attr("id")+"-2",
					$listUl = $("#"+id),
					i = $this.index();

				$this.addClass("on").siblings().removeClass("on");
				$listUl.show().siblings().hide();
				
				//右侧导航栏标题ctl
				$subNavName.html(para.o[i]["name"]);
				$subNavNameNUm.html(para.o[i]["list"].length);

			});
		},
		subClick:function(para){
			$("#"+para.s+" li").on("click",function(){
				var $this = $(this),
					i = $this.parent().index();
					j = $this.index();

				$this.addClass("on").siblings().removeClass("on");
				
				//markdown
				$markdownName.html(para.o[i]["list"][j]["name"]);
				$markdownTxt.html(para.o[i]["list"][j]["txt"]);
				
			});
		}
	};

treeNav.init({o: json, m: "category", s: "list"});//{obj: json, mainNavId: "category", subNavId: "list"}

		







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
