/*
    Logic：
        主要采用原生 JavaScript，
        只有在发送 Ajax 请求是才使用 JQuery
    
    ===
    1、登录注册页面的切换逻辑

    2、Ajax发送及接受响应逻辑
    ===
*/
// 封装选择器, 采用ES6箭头函数写法

// 获取应用程序的上下文路径
const contextPath = "http://localhost:8080";

const getSelector = ele => {
    return typeof ele === "string" ? document.querySelector(ele) : "";
}


// 登录注册载入

const containerShow = () => {
    var show = getSelector(".container")
    show.className += " container-show"
}


window.onload = containerShow;


// 登录注册页切换
((window, document) => {


    // 登录 -> 注册
    let toSignBtn = getSelector(".toSign"),
        toLoginBtn = getSelector(".toLogin")
    loginBox = getSelector(".login-box"),
        signBox = getSelector(".sign-box");

    toSignBtn.onclick = () => {
        loginBox.className += ' animate_login';
        signBox.className += ' animate_sign';
    }

    toLoginBtn.onclick = () => {
        loginBox.classList.remove("animate_login");
        signBox.classList.remove("animate_sign");
    }


})(window, document);

// Ajax 请求发送


//发送登陆请求
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;



    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }



    fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('登录成功');
                // 根据需要重定向或显示用户信息
                window.location.href = '/Pa3da.html';
            } else {
                alert('用户名或密码错误');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('登录请求失败');
        });
}
async function register() {


    // 获取用户输入
    const username = document.getElementById('sign-username').value;
    const password = document.getElementById('sign-password').value;
    const email = document.getElementById('sign-email').value;

    try {
        // 发送注册请求
        const response = await fetch(`/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email }) ,
        });

        if (response.ok) {
            // 注册成功的处理
            alert('注册成功！');
        } else {
            // 注册失败的处理
            const error = await response.json();
            alert('注册失败: ' + error.message);
        }
    } catch (error) {
        alert('请求失败，请稍后重试！');
    }
}