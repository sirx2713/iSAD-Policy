(() => {
    'use strict';

    // Add this at the beginning of your script.js file
    document.documentElement.setAttribute('data-theme', 'light');


    // Expanded Chatbot configuration
    const CHATBOT_CONFIG = {
        greetings: "Hello! I'm the iSAD Assistant. I can tell you about our software development services, technologies, experience, and privacy policies. How can I help you today?",
        company_info: {
            name: "iSAD (Innovative Software Application Development)",
            years_experience: 3,
            founded: "2021",
            github: "https://github.com/sirx2713",
            core_technologies: ["Dart", "Swift", "Flutter"],
            services: [
                "Mobile App Development",
                "Cross-platform Development",
                "iOS Development",
                "Flutter Solutions",
                "Software Consulting"
            ]
        },
        responses: {
            // Company & Services Related
            about: {
                pattern: /about|company|isad|who|what is/i,
                response: "iSAD (Innovative Software Application Development) is a professional software development company with 3 years of industry experience. We specialize in mobile app development using Flutter, Dart, and Swift technologies."
            },
            experience: {
                pattern: /experience|years|how long|history/i,
                response: "We've been in the software development industry since 2021, accumulating 3 years of professional experience in mobile and cross-platform development."
            },
            technologies: {
                pattern: /technologies|tech stack|programming|languages|flutter|dart|swift/i,
                response: "Our core technology stack includes:\n• Dart & Flutter for cross-platform development\n• Swift for native iOS development\n• Expertise in mobile app architecture and UI/UX implementation"
            },
            services: {
                pattern: /services|offer|provide|development|apps|applications/i,
                response: "We offer comprehensive software development services including:\n• Mobile app development (iOS & Cross-platform)\n• Flutter application development\n• Custom software solutions\n• Software consulting\n• UI/UX development"
            },
            github: {
                pattern: /github|repository|code|open source/i,
                response: "You can check out our work and projects on GitHub at https://github.com/sirx2713"
            },
            flutter: {
                pattern: /flutter|cross platform|mobile development/i,
                response: "We're experts in Flutter development, creating high-performance cross-platform applications that run seamlessly on both iOS and Android. Our Flutter expertise allows us to deliver cost-effective solutions without compromising on quality."
            },
            ios: {
                pattern: /ios|swift|apple|iphone/i,
                response: "We develop native iOS applications using Swift, ensuring high performance and seamless integration with Apple's ecosystem. Our iOS apps follow Apple's latest design guidelines and best practices."
            },

            // Privacy & Security Related
            privacy: {
                pattern: /privacy|data|information|collect/i,
                response: "At iSAD, we maintain a strict no-data-collection policy. Our applications are designed with privacy-first architecture, ensuring your data stays on your device."
            },
            security: {
                pattern: /security|secure|protection/i,
                response: "Security is paramount in our development process. We implement industry-standard security practices and regularly update our applications to address potential vulnerabilities."
            },

            // Contact & Business Related
            contact: {
                pattern: /contact|email|reach|support/i,
                response: "You can reach us at bradx2713@gmail.com for business inquiries, support, or consultations. We're always happy to discuss new projects!"
            },
            quote: {
                pattern: /quote|cost|price|estimate|project/i,
                response: "Each project is unique, and we provide custom quotes based on your specific requirements. Contact us at bradx2713@gmail.com with your project details for a detailed estimate."
            },
            process: {
                pattern: /process|workflow|work|develop/i,
                response: "Our development process includes:\n1. Initial consultation\n2. Requirements analysis\n3. Design and planning\n4. Agile development\n5. Testing and QA\n6. Deployment\n7. Ongoing support"
            },

            // Default response
            default: "I can tell you about our software development services, technologies (Flutter, Dart, Swift), experience, or privacy policies. What would you like to know?"
        }
    };

    class ChatBot {
        constructor() {
            this.messages = document.getElementById('chat-messages');
            this.input = document.getElementById('chat-input');
            this.sendButton = document.getElementById('send-message');
            this.toggleButton = document.getElementById('toggle-chat');
            this.chatContainer = document.querySelector('.chatbot-container');
            this.messageHistory = [];

            this.initialize();
        }

        initialize() {
            this.addMessage(CHATBOT_CONFIG.greetings, 'bot');

            this.sendButton.addEventListener('click', () => this.handleUserInput());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
            this.toggleButton.addEventListener('click', () => this.toggleChat());

            this.chatOpen = true;
        }

        handleUserInput() {
            const message = this.input.value.trim();
            if (!message) return;

            this.addMessage(message, 'user');
            this.messageHistory.push({ role: 'user', content: message });
            this.input.value = '';

            // Generate contextual response
            const response = this.generateResponse(message);
            setTimeout(() => {
                this.addMessage(response, 'bot');
                this.messageHistory.push({ role: 'bot', content: response });
            }, 500);
        }

        generateResponse(message) {
            // Context-aware response generation
            let response = '';
            let matched = false;

            // Check against patterns
            for (const [key, data] of Object.entries(CHATBOT_CONFIG.responses)) {
                if (key === 'default') continue;
                if (data.pattern.test(message)) {
                    response = data.response;
                    matched = true;
                    break;
                }
            }

            // If no direct match, check for partial matches or related topics
            if (!matched) {
                const words = message.toLowerCase().split(' ');
                for (const word of words) {
                    for (const [key, data] of Object.entries(CHATBOT_CONFIG.responses)) {
                        if (key === 'default') continue;
                        if (data.pattern.test(word)) {
                            response = data.response;
                            matched = true;
                            break;
                        }
                    }
                    if (matched) break;
                }
            }

            // If still no match, use default response
            if (!matched) {
                response = CHATBOT_CONFIG.responses.default;
            }

            return response;
        }

        addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);

            // Convert URLs to clickable links
            const linkedText = text.replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
            );

            messageDiv.innerHTML = linkedText.replace(/\n/g, '<br>');
            this.messages.appendChild(messageDiv);
            this.messages.scrollTop = this.messages.scrollHeight;
        }

        toggleChat() {
            this.chatOpen = !this.chatOpen;
            this.chatContainer.style.transform = this.chatOpen ? 'translateY(0)' : 'translateY(calc(100% - 50px))';
            this.toggleButton.innerHTML = this.chatOpen ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
        }
    }

    // Initialize chatbot and other features when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new ChatBot();
        setupThemeToggle();
        setupAccessibility();
    });

    // Theme toggle functionality
    const setupThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        const setTheme = (isDark) => {
            document.documentElement.classList.toggle('dark-theme', isDark);
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark');
        } else {
            setTheme(prefersDark.matches);
        }

        themeToggle.addEventListener('click', () => {
            setTheme(!document.documentElement.classList.contains('dark-theme'));
        });
    };

    // Accessibility enhancements
    const setupAccessibility = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const chatbot = document.querySelector('.chatbot-container');
                if (chatbot) chatbot.style.transform = 'translateY(calc(100% - 50px))';
            }
        });
    };

})();
