$(function () {
	var productsID=[1,2,3,4]
	// var $button=$(".productsBox button");
	// for (var i=0;i<$(".productsBox button").length;i++){
	// 	$button.eq(i).click(i,function(event){add(productsID[event.data])});
	// }
	
    $(".productsBox button").each(function(index){
		$(this).on("click",function(){add(productsID[index])});
	});

	//这种写法可以删除任意行，并可以为新增行自动绑定事件
	$("body").on("click", ".del", function () {
		$(this).closest(".item").remove();
		countTotalprice();
		return false;
	});

	//全选全不选
	$(".selectAll").click(function () {
		var $cks = $("#listBox input[type=checkbox]");

		if ($cks.is(":checked")) {
			$cks.removeAttr("checked");
			$(".selectAll").removeAttr("checked");
		}
		else {
			$cks.prop("checked", "true");
			$(".selectAll").prop("checked", "true");
		}
	});

	$("#delcheck").click(function () {
		var $cks = $("#listBox input[type=checkbox]");
		$cks.each(function () {
			if ($(this).is(":checked")) {
				$(this).closest(".item").remove();
			}
		});
		check();
		countTotalprice();
	});

	$("body").on("click", "input[name=check]", function () {
		check();
	});

	$("body").on("click", "input[type=checkbox]", function () {
		countTotalprice();
	});

	$("body").on("change", "input[type=number]", function () {
		subtotal($(this));
	});
});

//判断是否全选函数
function check() {
	var oInput = $("input[name=check]");
	var C = 0;
	for (var i = 0; i < oInput.length; i++) {
		if (oInput[i].checked == true) {
			C = C + 1;
		}
	}
	if (C == oInput.length) {
		$(".selectAll").prop("checked", "true");
	}
	else {
		$(".selectAll").removeAttr("checked");
	}
	if (C == 0) {
		$(".selectAll").removeAttr("checked");
	}
}

//单项小计函数
function subtotal($this) {
	var price = $this.closest(".item").find("span.price").text();
	var subtotal = $this.closest(".item").find("span.subtotal");
	var total = parseFloat(price) * $this.val();
	subtotal.html(total.toFixed(2));
	countTotalprice();
}

//计算总价函数
function countTotalprice() {
	var $cks = $("#listBox input[type=checkbox]");
	var totalprice = 0;
	$cks.each(function () {
		if ($(this).is(":checked")) {
			var price = $(this).closest(".item").find("span.subtotal").text();
			totalprice += parseFloat(price);
			$("#totalprice").html(totalprice.toFixed(2));
		} else {
			$("#totalprice").html(totalprice.toFixed(2));
		}
	});
	//删除购物车内所选商品时让总计归零
	if (totalprice == 0) {
		$("#totalprice").html(totalprice.toFixed(2));
	}
}

//添加购物车函数
function add(productID) {

	//创建新节点
	switch (productID) {
		case 1:
			var $newPro = $("<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product1.jpg' height='100'></div><div>三星Galaxy S22 Ultra超视觉夜拍系统 超耐用 大屏S pen 曜夜黑</div><div>¥<span class='price'>5349.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>5349.00</span></div><div><a href='#' class='del'>删除</a></div></div>");
			break;
		case 2:
			var $newPro = $("<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product2.jpg' height='100'></div><div>任天堂Switch NS掌上游戏机</div><div>¥<span class='price'>1980.00</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>1980.00</span></div><div><a href='#' class='del'>删除</a></div></div>");
			break;
		case 3:
			var $newPro = $("<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product3.jpg' height='100'></div><div>泓一 蛋黄酥30枚礼盒装 雪媚娘饼干蛋糕休闲零食</div><div>¥<span class='price'>29.20</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>29.20</span></div><div><a href='#' class='del'>删除</a></div></div>");
			break;
		case 4:
			var $newPro = $("<div class='item'><div><input type='checkbox' name='check'></div><div><img src='img/product4.jpg' height='100'></div><div>道道全 一级菜籽油5L 非转基因物理压榨</div><div>¥<span class='price'>67.80</span></div><div><input type='number' value='1' min='1'></div><div>¥<span class='subtotal'>67.80</span></div><div><a href='#' class='del'>删除</a></div></div>");
			break;
	}

	//查找购物车中是否已有相同产品
	var flag = 1;
	$(".item").each(function () {
		var productName = $(this).find("div:eq(2)").html();
		var newProductName = $newPro.find("div:eq(2)").html();
		if (productName == newProductName) {
			flag = 0;
			$(this).find("input[type='number']").val(function (n, c) { return parseInt(c) + 1; });
			subtotal($(this).find("input[type='number']"));
			return false;
		}
	})
	if (flag) {
		//在#listBox中插入新建节点
		$("#listBox").append($newPro);
	}
}