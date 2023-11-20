var user = new Map([["123","123"]])

function login(){
	var username = document.getElementById("login-username").value;
	var password = document.getElementById("login-password").value;
	var regu = /^[a-zA-Z]{1,9}$/;
	var regp = /^(?=.*[a-zA-Z])(?=.*\d).{1,9}$/;
	if(!regu.test(username)){
		alert("用户名格式不正确，请重新输入！");
		return false;
	}
	if(!regp.test(password)){
		alert("密码格式不正确，请重新输入！");
		return false;
	}
	if(user.get(username)==password){
		window.location.href="index.html";
	}else{
		alert("用户名或密码错误");
	}
}

function register(){
	var username = document.getElementById("register-username").value;
	var password = document.getElementById("register-password").value;
	var email = document.getElementById("register-email").value;
	var regu = /^[a-zA-Z]{1,9}$/;
	var rege = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;	
	var regp = /^(?=.*[a-zA-Z])(?=.*\d).{1,9}$/;
	if(!regu.test(username)){
	alert("用户名格式不正确，请重新输入！");
	return false;
}
	if(!rege.test(email)){
    alert("邮箱格式不正确，请重新输入！");
    return false;
}
	if(!regp.test(password)){
    alert("密码格式不正确，请重新输入！");
    return false;
}
	user.set(username,password);
	alert("注册成功，请登录");
	document.getElementById("register-username").value="";
	document.getElementById("register-password").value="";
	document.getElementById("register-email").value="";
}
