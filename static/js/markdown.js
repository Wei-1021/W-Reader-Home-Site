// 初始渲染
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const preview = document.getElementById('preview');
    const renderBtn = document.getElementById('renderBtn');

    function renderMarkdown() {
        const markdownText = input.value;
        const html = marked.parse(markdownText);
        preview.innerHTML = html;

        // 为代码块添加复制按钮
        document.querySelectorAll('pre code').forEach(block => {
            const pre = block.parentElement;

            // 如果已经添加过复制按钮，跳过
            if (pre.querySelector('.copy-btn')) return;

            const language = block.className.replace('language-', '') || 'code';

            // 创建代码块头部
            const header = document.createElement('div');
            header.className = 'code-header';
            header.innerHTML = `
                        <span class="language-tag">${language}</span>
                        <button class="copy-btn">复制</button>
                    `;

            // 插入头部
            pre.parentNode.insertBefore(header, pre);

            // 包装代码块
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';
            pre.parentNode.insertBefore(wrapper, header);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);

            // 添加复制功能
            const copyBtn = header.querySelector('.copy-btn');
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    copyBtn.textContent = '已复制!';
                    setTimeout(() => {
                        copyBtn.textContent = '复制';
                    }, 2000);
                });
            });
        });
    }

    // 初始渲染
    renderMarkdown();

    // 绑定渲染按钮事件
    renderBtn.addEventListener('click', renderMarkdown);
});