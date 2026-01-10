        const userInput = document.getElementById('userInput');
        const combineBtn = document.getElementById('combineBtn');
        const navigateBtn = document.getElementById('navigateBtn');
        const resultElement = document.getElementById('result');
        let combinedUrl = '';
        function combineUrl() {
            const inputUrl = userInput.value.trim();
            
            if (!inputUrl) {
                alert('请输入URL！');
                userInput.focus();
                return;
            }
            if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
                alert('URL必须以http://或https://开头！');
                userInput.focus();
                return;
            }
            const fixedString = "https://jx.xmflv.cc/?url=";
            combinedUrl = fixedString + inputUrl;
            resultElement.textContent = combinedUrl;
            resultElement.style.color = '#2c3e50';
            resultElement.style.fontWeight = 'normal';
            resultElement.style.transform = 'scale(1.02)';
            setTimeout(() => {
                resultElement.style.transform = 'scale(1)';
            }, 200);
            navigateBtn.disabled = false;
            navigateBtn.style.opacity = '1';
            navigateBtn.style.cursor = 'pointer';
            showMessage('URL拼合成功！', 'success');
        }
        function navigateToUrl() {
            if (!combinedUrl) {
                alert('请先拼合URL！');
                return;
            }
            const confirmNavigation = confirm(`即将跳转到：\n${combinedUrl}\n\n是否继续？`);
            
            if (confirmNavigation) {
                window.open(combinedUrl, '_blank');
                showMessage('正在跳转到网页...', 'success');
            }
        }
        function showMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease-out;
            `;
            if (type === 'success') {
                messageElement.style.backgroundColor = '#2ecc71';
            } else if (type === 'error') {
                messageElement.style.backgroundColor = '#e74c3c';
            } else {
                messageElement.style.backgroundColor = '#3498db';
            }
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(messageElement);
            setTimeout(() => {
                messageElement.style.animation = 'fadeOut 0.5s ease-out';
                setTimeout(() => {
                    document.body.removeChild(messageElement);
                }, 500);
            }, 3000);
        }
        navigateBtn.disabled = true;
        navigateBtn.style.opacity = '0.7';
        navigateBtn.style.cursor = 'not-allowed';
        combineBtn.addEventListener('click', combineUrl);
        navigateBtn.addEventListener('click', navigateToUrl);
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                combineUrl();
            }
            if (event.ctrlKey && event.key === 'Enter') {
                if (combinedUrl) {
                    navigateToUrl();
                } else {
                    combineUrl();
                }
            }
        });
        userInput.addEventListener('focus', function() {
            this.select();
        });
//------------------------------------------测试开发部分--------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-label');
    const downloadInput = document.querySelector('.download-input');
    
    downloadBtn.addEventListener('click', function(e) {
      if (downloadInput.checked) return;
      
      setTimeout(function() {
        const downloadUrl = 'https://raw.githubusercontent.com/Dreamo331/Dreamo331.github.io/main/client/video_parser.exe';
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '视频解析客户端.exe';
        
        link.addEventListener('error', function() {
          console.error('下载失败，尝试备用链接...');
          
          const backupUrl = 'https://raw.githubusercontent.com/Dreamo331/Dreamo331.github.io/refs/heads/main/client/video_parser.exe';
          
          window.open('https://github.com/Dreamo331/Dreamo331.github.io/blob/main/client/video_parser.exe?raw=true', '_blank');
          
          alert('如果自动下载失败，请手动访问GitHub页面下载文件。');
        });
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('客户端下载已开始...');
        
      }, 500);
    });
  });
