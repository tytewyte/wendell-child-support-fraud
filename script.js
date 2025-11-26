// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?法律文书文件模板';
        this.fontSize = 14;
        this.columns = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = Array(columnCount).fill(0);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FF4500';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.columns.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.columns[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.columns[i] = 0;
            }
            this.columns[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Navigation System
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
                this.setActiveLink(link);
            });
        });
    }

    showSection(sectionId) {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

// Membership System
class MembershipSystem {
    constructor() {
        this.isMember = this.checkMembership();
        this.memberStatus = document.getElementById('member-status');
        this.init();
    }

    init() {
        this.updateMemberStatus();
        this.setupPayPal();
        this.setupDocumentAccess();
    }

    checkMembership() {
        return localStorage.getItem('wendell_member') === 'true';
    }

    updateMemberStatus() {
        if (this.memberStatus) {
            this.memberStatus.textContent = this.isMember ? 'PREMIUM_MEMBER' : 'VISITOR_MODE';
            this.memberStatus.style.color = this.isMember ? '#00FF00' : '#FF6347';
        }
        this.updateDocumentAccess();
    }

    updateDocumentAccess() {
        const lockedDocs = document.querySelectorAll('.locked-doc');
        lockedDocs.forEach(doc => {
            if (this.isMember) {
                doc.classList.remove('locked-doc');
                doc.classList.add('unlocked-doc');
                const lockIcon = doc.querySelector('.lock-icon');
                if (lockIcon) {
                    lockIcon.textContent = '🔓';
                    lockIcon.style.color = '#00FF00';
                }
                
                // Add download functionality
                doc.style.cursor = 'pointer';
                doc.addEventListener('click', () => this.downloadDocument(doc.querySelector('.doc-name').textContent));
            }
        });

        // Hide upgrade prompt for members
        const upgradePrompt = document.querySelector('.upgrade-prompt');
        if (upgradePrompt && this.isMember) {
            upgradePrompt.style.display = 'none';
        }
    }

    setupPayPal() {
        if (typeof paypal === 'undefined') {
            console.log('PayPal SDK not loaded');
            return;
        }

        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'orange',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                    'plan_id': 'YOUR_PLAN_ID' // You'll get this from PayPal
                });
            },
            onApprove: function(data, actions) {
                console.log('Subscription approved:', data);
                
                // Save membership status
                localStorage.setItem('wendell_member', 'true');
                localStorage.setItem('wendell_subscription_id', data.subscriptionID);
                
                // Update UI
                membershipSystem.isMember = true;
                membershipSystem.updateMemberStatus();
                
                // Show success message
                membershipSystem.showMessage('Welcome to Premium Membership! You now have access to all documents.', 'success');
            },
            onError: function(err) {
                console.error('PayPal error:', err);
                membershipSystem.showMessage('Payment failed. Please try again.', 'error');
            }
        }).render('#paypal-button-container');
    }

    setupDocumentAccess() {
        const lockedDocs = document.querySelectorAll('.locked-doc');
        lockedDocs.forEach(doc => {
            if (!this.isMember) {
                doc.addEventListener('click', () => {
                    this.showMembership();
                });
            }
        });
    }

    downloadDocument(docName) {
        if (!this.isMember) {
            this.showMembership();
            return;
        }

        // Create a sample document download
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`# ${docName}\n\nThis is a sample document template.\n\n[Your content would go here]\n\nLegal Disclaimer: This is not legal advice.\nConsult with a licensed attorney for your specific situation.`);
        link.download = `${docName.replace(/\s+/g, '_')}.txt`;
        link.click();

        this.showMessage(`Downloading ${docName}...`, 'success');
    }

    showMembership() {
        const membershipSection = document.getElementById('membership');
        const membershipLink = document.querySelector('a[href="#membership"]');
        
        if (membershipSection && membershipLink) {
            this.showSection('membership');
            this.setActiveLink(membershipLink);
        }
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-family: 'Share Tech Mono', monospace;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#00FF00' : type === 'error' ? '#FF4500' : '#FF6347'};
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    setActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

// Contact Form System
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Here you would typically send this to a server
        // For now, we'll simulate a successful submission
        console.log('Contact form submission:', data);
        
        // Show success message
        membershipSystem.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.form.reset();
        
        // Update status
        const status = document.getElementById('status');
        if (status) {
            status.textContent = 'MESSAGE_SENT';
            setTimeout(() => {
                status.textContent = 'SYSTEM_READY';
            }, 3000);
        }
    }
}

// Typing Effect Enhancement
class TypingEffect {
    constructor() {
        this.typingText = document.querySelector('.typing-text p');
        this.init();
    }

    init() {
        if (this.typingText) {
            this.enhanceTypingEffect();
        }
    }

    enhanceTypingEffect() {
        const text = this.typingText.textContent;
        this.typingText.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                this.typingText.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                // Add cursor blink
                this.typingText.innerHTML += '<span class="cursor">|</span>';
                this.startCursorBlink();
            }
        }, 100);
    }

    startCursorBlink() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Start Matrix Rain
    const matrixRain = new MatrixRain();
    
    // Initialize Navigation
    const navigation = new Navigation();
    
    // Initialize Membership System
    window.membershipSystem = new MembershipSystem();
    
    // Initialize Contact Form
    const contactForm = new ContactForm();
    
    // Initialize Typing Effect
    const typingEffect = new TypingEffect();
    
    // Add some terminal-style console messages
    console.log('%c🔥 WENDELL\'S LEGAL MATRIX SYSTEM ONLINE 🔥', 'color: #FF4500; font-size: 20px; font-weight: bold;');
    console.log('%cSystem Status: OPERATIONAL', 'color: #00FF00; font-size: 14px;');
    console.log('%cAccess Level: ' + (window.membershipSystem.isMember ? 'PREMIUM MEMBER' : 'VISITOR'), 'color: ' + (window.membershipSystem.isMember ? '#00FF00' : '#FF6347') + '; font-size: 14px;');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .unlocked-doc {
        background: rgba(0, 255, 0, 0.1) !important;
        border-left-color: #00FF00 !important;
    }
    
    .unlocked-doc:hover {
        background: rgba(0, 255, 0, 0.2) !important;
    }
`;
document.head.appendChild(style);
