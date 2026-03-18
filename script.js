// Preloader Logic
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            const loadingBar = document.getElementById('loading-bar');
            const loadingText = document.getElementById('loading-text');
            
            const loadingTexts = ['INITIALIZING', 'LOADING ASSETS', 'COMPILING', 'READY'];
            let textIndex = 0;
            
            // Animate loading bar
            setTimeout(() => { loadingBar.style.width = '30%'; loadingText.textContent = loadingTexts[1]; }, 100);
            setTimeout(() => { loadingBar.style.width = '60%'; loadingText.textContent = loadingTexts[2]; }, 600);
            setTimeout(() => { loadingBar.style.width = '100%'; loadingText.textContent = loadingTexts[3]; }, 1100);
            
            // Hide preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Start typing animation after preloader
                setTimeout(typeWriter, 500);
            }, 1500);
        });

        // Typing Effect
        const typingText = "I build digital products that refuse to be boring.";
        let charIndex = 0;
        const typingElement = document.getElementById('typing-text');
        
        function typeWriter() {
            if (charIndex < typingText.length) {
                typingElement.textContent += typingText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        // Mobile Menu Logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });

        // Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');
        let cursorX = 0, cursorY = 0;
        let currentX = 0, currentY = 0;
        
        // Create trail elements
        const trailCount = 5;
        const trails = [];
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.width = (12 - i * 2) + 'px';
            trail.style.height = (12 - i * 2) + 'px';
            trail.style.opacity = 0.6 - (i * 0.1);
            document.body.appendChild(trail);
            trails.push({ element: trail, x: 0, y: 0 });
        }

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // Smooth cursor animation loop with trail
        function animateCursor() {
            const dx = cursorX - currentX;
            const dy = cursorY - currentY;
            
            currentX += dx * 0.15;
            currentY += dy * 0.15;
            
            cursor.style.left = currentX + 'px';
            cursor.style.top = currentY + 'px';
            
            // Update trails with delay
            trails.forEach((trail, index) => {
                const delay = (index + 1) * 0.1;
                trail.x += (currentX - trail.x) * (0.2 - delay * 0.02);
                trail.y += (currentY - trail.y) * (0.2 - delay * 0.02);
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
            });
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effect to cursor
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = '#FBFF48';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.border = '2px solid black';
                cursor.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.backgroundColor = '#fff';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.border = 'none';
                cursor.classList.remove('hovering');
            });
        });

        // GitHub API Integration with Counter Animation
        async function fetchGitHubStats() {
            try {
                const response = await fetch('https://api.github.com/users/Vrathore03', {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Animate counters
                animateCounter('repos-count', data.public_repos || 0);
                animateCounter('followers-count', data.followers || 0);

                // Format creation date
                if (data.created_at) {
                    const date = new Date(data.created_at);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                    });
                    document.getElementById('created-at').textContent = formattedDate;
                }

                // Update contribution count
                const contribHeader = document.getElementById('total-contributions');
                const contribGrid = document.getElementById('total-contributions-grid');
                const contribValue = (data.public_repos * 20) + (data.followers * 5);

                if (contribHeader) animateCounter('total-contributions', contribValue, '+');
                if (contribGrid) animateCounter('total-contributions-grid', contribValue, '+');

            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                document.getElementById('repos-count').textContent = 'ERR';
                document.getElementById('followers-count').textContent = 'ERR';
                document.getElementById('created-at').textContent = 'N/A';
            }
        }

        // Counter Animation Function
        function animateCounter(elementId, target, suffix = '') {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }

        // Call on page load
        fetchGitHubStats();

        // Scroll Reveal Logic
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Scroll Progress Bar
        window.onscroll = function () {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progressBar").style.width = scrolled + "%";
        };

        // 3D Tilt Effect for Project Cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Parallax Effect for Hero Shapes
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.floating-shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 10;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
