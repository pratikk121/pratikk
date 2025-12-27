document.addEventListener('DOMContentLoaded', () => {
    // --- BOOT SEQUENCE ---
    // --- BOOT REMOVED ---
    // Instant Load
    const desktop = document.getElementById('main-desktop');
    const landscape = document.getElementById('main-landscape');
    if (landscape) {
        landscape.style.display = 'block';
        landscape.style.opacity = '1';
    }
    if (desktop) {
        desktop.style.display = 'block';
        desktop.style.opacity = '1';
    }


    // --- CLOCK WIDGET ---
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');

        // Time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;

        // Date
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    setInterval(updateClock, 1000);
    updateClock(); // Run immediately

    // --- ADMIN LOGIC (SUPABASE) ---
    const adminForm = document.getElementById('admin-form');

    // Check Login Status on Load
    async function checkSession() {
        if (!window.supabaseClient) return;
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            console.log("User logged in:", session.user.email);
            // toggleWindow('window-dashboard'); // User requested to disable auto-open
            fetchProjects(); // Load data
        }
    }
    checkSession();

    if (adminForm) {
        adminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const pass = document.getElementById('admin-pass').value;
            // Using email/password for simplicity, or just mapping 'password' to a specific admin email
            // For now, assuming the user might use email as password or we set a specific admin account
            const email = document.getElementById('admin-email').value;

            const errorMsg = document.getElementById('auth-error');
            errorMsg.textContent = 'Authenticating...';
            errorMsg.style.display = 'block';
            errorMsg.style.color = '#fbbf24';

            if (!supabaseClient) {
                errorMsg.textContent = 'Supabase not connected.';
                return;
            }

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: pass
            });

            if (error) {
                // Fail
                errorMsg.textContent = 'Access Denied: ' + error.message;
                errorMsg.style.color = 'red';
                adminForm.classList.add('shake');
                setTimeout(() => adminForm.classList.remove('shake'), 500);
            } else {
                // Success
                errorMsg.style.display = 'none';
                document.getElementById('admin-pass').value = '';
                toggleWindow('window-login');
                toggleWindow('window-dashboard');
                fetchProjects();
            }
        });
    }

    // --- ADMIN / CMS LOGIC ---
    async function fetchProjects() {
        const projectList = document.getElementById('admin-project-list');
        const projectsGrid = document.getElementById('projects-grid');

        if (!projectList && !projectsGrid) return;

        if (window.supabaseClient) {
            const { data, error } = await window.supabaseClient
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching projects:', error);
                return;
            }

            renderProjects(data || []);
        } else {
            // Fallback to localStorage if no Supabase (or offline)
            const localData = JSON.parse(localStorage.getItem('pratik-projects') || '[]');
            renderProjects(localData);
        }
    }

    async function fetchMessages() {
        const inboxList = document.querySelector('.inbox-list');
        if (!inboxList || !window.supabaseClient) return;

        const { data, error } = await window.supabaseClient
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
            inboxList.innerHTML = '<li style="color:red">Error loading messages</li>';
            return;
        }

        if (!data || data.length === 0) {
            inboxList.innerHTML = '<li style="color:#aaa; justify-content:center;">No new messages</li>';
            return;
        }

        inboxList.innerHTML = data.map(msg => `
            <li class="inbox-item" onclick="alert('${msg.full_name}:\\n${msg.message_text.replace(/'/g, "\\'")}')">
                <div style="display:flex; justify-content:space-between; width:100%;">
                    <span class="sender" style="font-weight:bold; color:#fff;">${msg.full_name}</span>
                    <span class="date" style="font-size:0.7rem; color:#aaa;">${new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <span class="subject" style="display:block; font-size:0.8rem; color:#ccc; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${msg.message_text}
                </span>
            </li>
        `).join('');
    }

    // Call this when dashboard opens or periodically
    setInterval(fetchMessages, 10000); // Poll every 10s for new mail
    fetchMessages(); // Initial load

    function renderProjects(projects) {
        const publicList = document.getElementById('public-project-list');
        const adminList = document.getElementById('admin-project-list');

        // 1. Render Public
        if (publicList) {
            if (projects.length === 0) {
                publicList.innerHTML = '<p style="padding:1rem;">No projects found.</p>';
            } else {
                publicList.innerHTML = projects.map(p => `
                    <div class="project-item">
                        <div class="p-icon">${p.icon || '⚡'}</div>
                        <div class="p-info">
                            <h3>${p.title}</h3>
                            <p>${p.tech}</p>
                        </div>
                        <a href="${p.link || '#'}" target="_blank" class="p-link">Open</a>
                    </div>
                `).join('');
            }
        }

        // 2. Render Admin
        if (adminList) {
            adminList.innerHTML = projects.map(p => `
                <div class="cms-item" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap: 10px; overflow:hidden;">
                    <div style="display:flex; flex-direction:column; overflow:hidden; flex:1;">
                        <span style="font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.title}</span>
                        <span style="font-size:0.8rem; opacity:0.7; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.link ? '🔗 ' + p.link : 'No Link'}</span>
                    </div>
                    <button class="cms-delete-btn" onclick="deleteProject(${p.id})">Del</button>
                </div>
            `).join('');
        }
    }

    // Add Project
    const cmsForm = document.getElementById('cms-form');
    if (cmsForm) {
        cmsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('cms-title').value;
            const tech = document.getElementById('cms-tech').value;
            const link = document.getElementById('cms-link').value || '#';

            if (title && tech && window.supabaseClient) {
                const { error } = await window.supabaseClient
                    .from('projects')
                    .insert([{ title, tech, icon: '🚀', link: link }]);

                if (error) {
                    alert('Error adding project: ' + error.message);
                } else {
                    // Reset form & Refresh
                    document.getElementById('cms-title').value = '';
                    document.getElementById('cms-tech').value = '';
                    document.getElementById('cms-link').value = '';
                    fetchProjects();
                }
            }
        });
    }

    // Delete Project (Global function)
    window.deleteProject = async function (id) {
        if (confirm('Are you sure you want to delete this project?')) {
            if (window.supabaseClient) {
                const { error } = await window.supabaseClient
                    .from('projects')
                    .delete()
                    .eq('id', id);

                if (error) {
                    alert('Error deleting: ' + error.message);
                } else {
                    fetchProjects();
                }
            }
        }
    }

    // --- DYNAMIC PROFILE (CMS) ---
    async function fetchProfile() {
        if (!window.supabaseClient) return;

        // 1. Fetch from DB
        const { data, error } = await window.supabaseClient
            .from('profile')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.warn("Profile fetch error:", error);
            return;
        }

        if (data) {
            // 2. Update Public View
            const bioEl = document.getElementById('about-bio');
            const skillsEl = document.getElementById('about-skills');

            if (bioEl) bioEl.textContent = data.bio;
            if (skillsEl && data.skills) {
                const skillsArray = data.skills.split(',').map(s => s.trim());
                skillsEl.innerHTML = skillsArray.map(s => `<li>${s}</li>`).join('');
            }

            // 3. Update Admin Form (if present)
            const bioInput = document.getElementById('profile-bio');
            const skillsInput = document.getElementById('profile-skills');

            if (bioInput) bioInput.value = data.bio || '';
            if (skillsInput) skillsInput.value = data.skills || '';
        }
    }

    // Handle Profile Update
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const bio = document.getElementById('profile-bio').value;
            const skills = document.getElementById('profile-skills').value;
            const btn = profileForm.querySelector('button');

            if (window.supabaseClient) {
                const originalText = btn.textContent;
                btn.textContent = 'Saving...';

                const { error } = await window.supabaseClient
                    .from('profile')
                    .update({ bio, skills })
                    .eq('id', 1);

                if (error) {
                    alert('Error updating profile: ' + error.message);
                } else {
                    fetchProfile(); // Refresh view
                    btn.textContent = 'Saved! ✅';
                    setTimeout(() => btn.textContent = originalText, 2000);
                }
            }
        });
    }

    // Initial Render
    fetchProjects();
    fetchProfile();

    // --- WINDOW MANAGER ---
    // --- ADVANCED WINDOW MANAGER ---
    let zIndexCounter = 100;
    const activeWindows = new Set();

    // Make all windows draggable
    document.querySelectorAll('.window').forEach(win => {
        makeDraggable(win);

        // Focus on click
        win.addEventListener('mousedown', () => {
            bringToFront(win);
        });
    });

    function bringToFront(win) {
        zIndexCounter++;
        win.style.zIndex = zIndexCounter;
    }

    function makeDraggable(element) {
        const header = element.querySelector('.window-header');
        if (!header) return;

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.onmousedown = function (e) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            // Read initial position once to avoid thrashing
            initialLeft = element.offsetLeft;
            initialTop = element.offsetTop;

            bringToFront(element);

            document.onmousemove = onMouseMove;
            document.onmouseup = onMouseUp;
        };

        function onMouseMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            // Direct update without reading offsetTop
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            element.style.left = `${initialLeft + dx}px`;
            element.style.top = `${initialTop + dy}px`;
            element.style.transform = 'none';
        }

        function onMouseUp() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    // Global Window Functions
    window.toggleWindow = function (windowId) {
        const win = document.getElementById(windowId);

        if (win.classList.contains('hidden')) {
            // Open
            win.classList.remove('hidden');
            win.classList.remove('minimized');
            bringToFront(win);

            // Center if opening for first time (and not dragged yet)
            if (!win.style.top) {
                win.style.top = '50%';
                win.style.left = '50%';
                win.style.transform = 'translate(-50%, -50%)';
            }
        } else {
            // Minimize (Hide to dock)
            win.classList.add('hidden');
        }
    }

    window.openWindow = function (windowId) {
        const win = document.getElementById(windowId);
        if (win.classList.contains('hidden')) {
            window.toggleWindow(windowId);
        } else {
            bringToFront(win);
        }
    }

    window.closeWindow = function (windowId) {
        document.getElementById(windowId).classList.add('hidden');
    }

    window.minimizeWindow = function (windowId) {
        const win = document.getElementById(windowId);
        win.classList.add('hidden'); // Simple minimize for now
    }

    window.maximizeWindow = function (windowId) {
        const win = document.getElementById(windowId);

        if (win.classList.contains('maximized')) {
            win.classList.remove('maximized');
            win.style.width = '';
            win.style.height = '';
            win.style.top = '50%';
            win.style.left = '50%';
            win.style.transform = 'translate(-50%, -50%)';
        } else {
            win.classList.add('maximized');
            win.style.top = '0';
            win.style.left = '0';
            win.style.width = '100vw';
            win.style.height = '100vh';
            win.style.transform = 'none';
            win.style.borderRadius = '0';
            bringToFront(win);
        }
    }

    // --- TERMINAL LOGIC ---
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';

                printLine(`guest@pratikos:~$ ${cmd}`);
                processCommand(cmd);
            }
        });
    }

    function printLine(text) {
        const p = document.createElement('p');
        p.textContent = text;
        termOutput.appendChild(p);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                printLine('Available commands: help, about, projects, contact, clear, date, whoami');
                break;
            case 'about':
                printLine('Opening About Me...');
                window.toggleWindow('window-about');
                break;
            case 'projects':
                printLine('Opening Projects...');
                window.toggleWindow('window-projects');
                break;
            case 'contact':
                printLine('Email: pratik@example.com');
                break;
            case 'clear':
                termOutput.innerHTML = '';
                break;
            case 'date':
                printLine(new Date().toString());
                break;
            case 'whoami':
                printLine('You are a guest user exploring PratikOS.');
                break;
            case '':
                break;
            default:
                printLine(`Command not found: ${cmd}`);
        }
    }

    // --- NOTEPAD LOGIC ---
    const notepad = document.getElementById('notepad-area');
    if (notepad) {
        // Load saved notes
        const savedNotes = localStorage.getItem('pratik-notes');
        if (savedNotes) {
            notepad.value = savedNotes;
        }

        // Auto-save on input
        notepad.addEventListener('input', () => {
            localStorage.setItem('pratik-notes', notepad.value);
        });
    }

    // --- MUSIC PLAYER LOGIC ---
    const musicPlayer = {
        audio: null, // Will be set in init
        isPlaying: false,
        currentTrackIndex: 0,
        tracks: [
            { title: "Lofi Study", artist: "FASSounds", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
            { title: "Empty Mind", artist: "Lofi_Hour", url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" },
            { title: "Night Walk", artist: "Amixi", url: "https://cdn.pixabay.com/audio/2022/10/25/audio_5482386e8a.mp3" }
        ],

        init() {
            this.audio = document.getElementById('audio-player');
            if (!this.audio) { console.error("Audio element missing"); return; }

            this.audio.volume = 0.8;
            this.renderPlaylist();
            this.loadTrack(this.currentTrackIndex);

            // Auto-next
            this.audio.addEventListener('ended', () => this.next());

            // Error handling
            this.audio.addEventListener('error', (e) => {
                console.error("Audio Error:", e);
                alert("Error playing track. Check internet connection.");
            });

            // Progress Update
            this.audio.addEventListener('timeupdate', () => {
                if (this.audio.duration) {
                    const progress = (this.audio.currentTime / this.audio.duration) * 100;
                    const bar = document.getElementById('music-progress-bar');
                    if (bar) bar.style.width = `${progress}%`;
                }
            });

            // Make globally accessible
            window.musicPlayer = this;
        },

        loadTrack(index) {
            this.currentTrackIndex = index;
            const track = this.tracks[index];
            this.audio.src = track.url;
            document.getElementById('music-title').textContent = track.title;
            document.getElementById('music-artist').textContent = track.artist;
            this.updateNowPlayingWidget(track.title);
        },

        togglePlay() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        play() {
            const playPromise = this.audio.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    this.isPlaying = true;
                    document.getElementById('music-play-btn').textContent = "⏸";
                    document.getElementById('music-vinyl').classList.add('spinning');

                    // Update widget icon
                    const widgetIcon = document.querySelector('.now-playing .icon');
                    if (widgetIcon) widgetIcon.textContent = "🔊";
                })
                    .catch(error => {
                        console.error("Playback failed:", error);
                        // Don't alert constantly, just log
                    });
            }
        },

        pause() {
            this.audio.pause();
            this.isPlaying = false;
            document.getElementById('music-play-btn').textContent = "▶";
            document.getElementById('music-vinyl').classList.remove('spinning');

            // Update widget icon
            const widgetIcon = document.querySelector('.now-playing .icon');
            if (widgetIcon) widgetIcon.textContent = "♫";
        },

        next() {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
            this.loadTrack(this.currentTrackIndex);
            this.play();
        },

        prev() {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
            this.loadTrack(this.currentTrackIndex);
            this.play();
        },

        setVolume(val) {
            this.audio.volume = val;
        },

        updateNowPlayingWidget(title) {
            const trackEl = document.querySelector('.now-playing .track');
            if (trackEl) trackEl.textContent = title;
        },

        renderPlaylist() {
            // Can implement full playlist UI later
        }
    };

    // --- CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            const full_name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message_text = document.getElementById('contact-msg').value;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            if (window.supabaseClient) {
                const { error } = await window.supabaseClient
                    .from('messages')
                    .insert([{ full_name, email, message_text }]);

                if (error) {
                    alert('Error sending message: ' + error.message);
                    btn.textContent = originalText;
                    btn.disabled = false;
                } else {
                    btn.textContent = 'Message Sent! 🚀';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        closeWindow('window-contact');
                    }, 2000);
                }
            } else {
                // Fallback for non-Supabase demo
                setTimeout(() => {
                    alert('Demo Mode: Message would be sent in production.');
                    btn.textContent = 'Message Sent! (Demo)';
                    contactForm.reset();
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        closeWindow('window-contact');
                    }, 2000);
                }, 1000);
            }
        });
    }

    // --- THEME TOGGLE LOGIC ---
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Check saved theme
    if (localStorage.getItem('pratik-theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    window.toggleTheme = function () {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            localStorage.setItem('pratik-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '🌙';
        } else {
            localStorage.setItem('pratik-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
        }
    }

    console.log("PratikOS Booted Successfully. 🏔️");
});
