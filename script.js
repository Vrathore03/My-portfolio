// Custom Cursor Logic
        const cursor = document.getElementById('cursor');
        const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.transform = `translate(-50%, -50%)`;
        });

        // Add hover effect to cursor
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = '#FBFF48';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.border = '2px solid black';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.backgroundColor = '#fff';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.border = 'none';
            });
        });

        // GitHub API Integration
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

                // Update stats (only existing elements)
                document.getElementById('repos-count').textContent = data.public_repos || '0';
                document.getElementById('followers-count').textContent = data.followers || '0';

                // Format creation date
                if (data.created_at) {
                    const date = new Date(data.created_at);
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                    });
                    document.getElementById('created-at').textContent = formattedDate;
                }

                // Update contribution count (approximation) - only if element exists
                const contribHeader = document.getElementById('total-contributions');
                const contribGrid = document.getElementById('total-contributions-grid');
                const contribValue = `${(data.public_repos * 20) + (data.followers * 5)}+`;

                if (contribHeader) contribHeader.textContent = contribValue;
                if (contribGrid) contribGrid.textContent = contribValue;

            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                // Set fallback values for existing elements only
                document.getElementById('repos-count').textContent = 'ERR';
                document.getElementById('followers-count').textContent = 'ERR';
                document.getElementById('created-at').textContent = 'N/A';
                const contribElement = document.getElementById('total-contributions');
                if (contribElement) {
                    contribElement.textContent = 'API Error';
                }
            }
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

        
