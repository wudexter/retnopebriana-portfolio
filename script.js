document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year Setup for Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Hamburger Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Smooth Scroll for Anchor Navigations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Active Navigation Highlight based on Scroll Position
    const sections = document.querySelectorAll('section');
    
    const highlightNav = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if(navLink) navLink.classList.add('active');
            } else {
                if(navLink) navLink.classList.remove('active');
            }
        });
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', highlightNav, { passive: true });

    // 5. Scroll Reveal IntersectionObserver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        };
        
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: If reduced motion is preferred, immediately show all elements
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
        });
    }

    // 6. Interactive Terminal Hero Component
    const terminalBody = document.getElementById('terminal-body');
    
    if (terminalBody && !prefersReducedMotion) {
        const commands = [
            { cmd: "whoami", out: "Network Engineer graduate. Specialist in routing, switching, and security.", style: "" },
            { cmd: "ping opportunities...", out: "Reply from HR_Company: bytes=32 time=10ms TTL=64\nReply from HR_Company: bytes=32 time=10ms TTL=64\nReply from HR_Company: bytes=32 time=10ms TTL=64", style: "success" }
        ];

        const typeCommand = async (commandObj) => {
            return new Promise(resolve => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'term-line';
                
                const promptSpan = document.createElement('span');
                promptSpan.className = 'term-prompt';
                promptSpan.textContent = 'retno@portfolio:~$';
                
                const cmdSpan = document.createElement('span');
                cmdSpan.className = 'term-command';
                
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'cursor';

                lineDiv.appendChild(promptSpan);
                lineDiv.appendChild(cmdSpan);
                lineDiv.appendChild(cursorSpan);
                terminalBody.appendChild(lineDiv);

                let charIndex = 0;
                
                const typeChar = () => {
                    if (charIndex < commandObj.cmd.length) {
                        cmdSpan.textContent += commandObj.cmd.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 50 + Math.random() * 100); // Randomized typing speed
                    } else {
                        cursorSpan.remove(); // Remove cursor when typing done
                        
                        setTimeout(() => {
                            const outDiv = document.createElement('div');
                            outDiv.className = `term-output ${commandObj.style}`;
                            outDiv.innerHTML = commandObj.out.replace(/\n/g, '<br>');
                            terminalBody.appendChild(outDiv);
                            resolve();
                        }, 400); // Small pause before output
                    }
                };
                
                typeChar();
            });
        };

        const runTerminal = async () => {
            for (const cmd of commands) {
                await typeCommand(cmd);
                await new Promise(r => setTimeout(r, 1000)); // Pause between commands
            }
            
            // Final prompt to keep cursor blinking
            const finalLine = document.createElement('div');
            finalLine.className = 'term-line';
            finalLine.innerHTML = `<span class="term-prompt">retno@portfolio:~$</span><span class="cursor"></span>`;
            terminalBody.appendChild(finalLine);
        };

        setTimeout(runTerminal, 1000); // Start animation after 1s
    } else if (terminalBody) {
        // Fallback UI for prefers-reduced-motion
        terminalBody.innerHTML = `
            <div class="term-line"><span class="term-prompt">retno@portfolio:~$</span><span class="term-command">whoami</span></div>
            <div class="term-output">Network Engineer graduate. Specialist in routing, switching, and security.</div>
            <div class="term-line"><span class="term-prompt">retno@portfolio:~$</span><span class="term-command">ping opportunities...</span></div>
            <div class="term-output success">Reply from HR_Company: bytes=32 time=10ms TTL=64<br>Reply from HR_Company: bytes=32 time=10ms TTL=64<br>Reply from HR_Company: bytes=32 time=10ms TTL=64</div>
            <div class="term-line"><span class="term-prompt">retno@portfolio:~$</span><span class="cursor"></span></div>
        `;
    }
});
