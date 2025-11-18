class Message {
    static container = null;

    static init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'message-container';
            document.body.appendChild(this.container);
        }
    }

    static show(type, text, duration = 3000) {
        this.init();

        const messageItem = document.createElement('div');
        messageItem.className = `message-item message-${type}`;

        const iconMap = {success: '✓', error: '✕', warning: '⚠', info: 'ℹ'};

        messageItem.innerHTML = `
      <div class="message-content">
        <span class="message-icon">${iconMap[type]}</span>
        <span class="message-text">${text}</span>
      </div>
      <span class="message-close">×</span>
    `;

        this.container.appendChild(messageItem);

        // 绑定关闭事件
        const closeBtn = messageItem.querySelector('.message-close');
        closeBtn.onclick = () => this.close(messageItem);

        let timer = null;
        if (duration > 0) {
            timer = setTimeout(() => this.close(messageItem), duration);
        }

        // 悬停控制
        messageItem.addEventListener('mouseenter', () => clearTimeout(timer));
        messageItem.addEventListener('mouseleave', () => {
            if (duration > 0) {
                timer = setTimeout(() => this.close(messageItem), duration);
            }
        });
    }

    static close(messageItem) {
        messageItem.classList.add('hide');
        setTimeout(() => messageItem.remove(), 300);
    }

    // 快捷方法
    static success(text, duration) {
        this.show('success', text, duration);
    }

    static error(text, duration) {
        this.show('error', text, duration);
    }

    static warning(text, duration) {
        this.show('warning', text, duration);
    }

    static info(text, duration) {
        this.show('info', text, duration);
    }
}
