// 写死的10个有效邀请码（随机生成后固定）
const validInviteCodes = [
    'xJUDrUD5FC',
    'KAdF7p2lcK',
    '0oQ0JKkUPJ',
    'vJKf2QO4Fq',
    'db6uqxjL5d',
    'rgoSbk2Q91',
    'SfnORmAhp1',
    's1Ol7jP8gN',
    'hkgbXuPJlt',
    'dARDkHbK2D',
    'a111111'
];
console.log('有效邀请码列表:', validInviteCodes);

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const inviteCodeInput = document.getElementById('inviteCode');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');
    
    // 登录按钮点击事件
    loginBtn.addEventListener('click', function() {
        const inputCode = inviteCodeInput.value.trim();
        
        // 检查邀请码是否有效
        if (inputCode && validInviteCodes.includes(inputCode)) {
            // 登录成功
            localStorage.setItem('isLoggedIn', 'true');
            
            // 显示成功信息
            errorMsg.style.display = 'none';
            successMsg.style.display = 'block';
            
            // 延迟跳转
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // 登录失败
            errorMsg.style.display = 'block';
            successMsg.style.display = 'none';
        }
    });
    
    // 输入框回车事件
    inviteCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});