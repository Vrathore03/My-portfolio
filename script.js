// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PRELOADER ==========
    var preloader = document.getElementById('preloader');
    var loadingBar = document.getElementById('loading-bar');
    var loadingText = document.getElementById('loading-text');
    
    if (preloader && loadingBar && loadingText) {
        setTimeout(function() { 
            loadingBar.style.width = '30%'; 
            loadingText.textContent = 'LOADING ASSETS'; 
        }, 100);
        setTimeout(function() { 
            loadingBar.style.width = '60%'; 
            loadingText.textContent = 'COMPILING'; 
        }, 600);
        setTimeout(function() { 
            loadingBar.style.width = '100%'; 
            loadingText.textContent = 'READY'; 
        }, 1100);
        
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 1500);
    }

    

    // ========== TYPING EFFECT ==========
    var typingElement = document.getElementById('typing-text');
    if (typingElement) {
        var text = "I build digital products that refuse to be boring.";
        var charIndex = 0;
        function type() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 2000);
    }

    // ========== CUSTOM CURSOR ==========
    var cursor = document.getElementById('cursor');
    if (cursor) {
        var hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');
        var cursorX = 0, cursorY = 0;
        var currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', function(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            currentX += (cursorX - currentX) * 0.15;
            currentY += (cursorY - currentY) * 0.15;
            cursor.style.left = currentX + 'px';
            cursor.style.top = currentY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        hoverElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.backgroundColor = '#FBFF48';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.border = '2px solid black';
                cursor.classList.add('hovering');
            });
            el.addEventListener('mouseleave', function() {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.backgroundColor = '#fff';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.border = 'none';
                cursor.classList.remove('hovering');
            });
        });
    }

    // ========== GITHUB STATS ==========
    async function fetchGitHubStats() {
        try {
            var response = await fetch('https://api.github.com/users/Vrathore03', {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) throw new Error('HTTP error!');

            var data = await response.json();
            
            var reposEl = document.getElementById('repos-count');
            var followersEl = document.getElementById('followers-count');
            var createdEl = document.getElementById('created-at');
            var contribHeader = document.getElementById('total-contributions');
            var contribGrid = document.getElementById('total-contributions-grid');
            
            if (reposEl) reposEl.textContent = data.public_repos || '0';
            if (followersEl) followersEl.textContent = data.followers || '0';
            
            if (data.created_at && createdEl) {
                var date = new Date(data.created_at);
                createdEl.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            }
            
            var contribValue = (data.public_repos * 20) + (data.followers * 5);
            if (contribHeader) contribHeader.textContent = contribValue + '+';
            if (contribGrid) contribGrid.textContent = contribValue + '+';

        } catch (error) {
            console.error('GitHub API error:', error);
        }
    }
    fetchGitHubStats();

    // ========== SCROLL REVEAL ==========
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    // ========== SCROLL PROGRESS BAR ==========
    window.onscroll = function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    };

    // ========== 3D TILT FOR PROJECT CARDS ==========
    var projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / 20;
            var rotateY = (centerX - x) / 20;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ========== PARALLAX FOR HERO SHAPES ==========
    document.addEventListener('mousemove', function(e) {
        var shapes = document.querySelectorAll('.floating-shape');
        var x = e.clientX / window.innerWidth;
        var y = e.clientY / window.innerHeight;
        
        shapes.forEach(function(shape, index) {
            var speed = (index + 1) * 10;
            var xOffset = (x - 0.5) * speed;
            var yOffset = (y - 0.5) * speed;
            shape.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
        });
    });
});
