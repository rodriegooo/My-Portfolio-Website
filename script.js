(() => {
    'use strict';

    /* ---------- Helpers ---------- */
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- State ---------- */
    let lang = store.get('lang') === 'id' ? 'id' : 'en';
    let theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    /* =====================================================================
       TRANSLATIONS (data-i18n="key" di HTML)
       ===================================================================== */
    const I18N = {
        en: {
            nav_home: 'Home', nav_about: 'About', nav_exp: 'Experience', nav_skills: 'Skills', nav_projects: 'Projects', nav_contact: 'Contact',

            hero_eyebrow: 'COMPUTER SCIENCE STUDENT · BINUS INTERNATIONAL',
            hero_p: "I'm Alfonsus Rodrigo Haryoko, a Computer Science undergraduate at BINUS International interested in programming, data analysis, and quantitative analysis. I'm building my technical foundations through continuous learning and practical work.",
            hero_cta1: 'Explore My Projects', hero_cta2: 'Get in Touch', hero_cv: 'Download CV',
            stat_projects: 'Projects', stat_tech: 'Technical skills', stat_since: 'Started B.Sc.',

            about_title: 'About Me',
            about_quote: 'Data, mathematics & technology.',
            about_focus: 'Focus areas',
            tab_profile: 'Profile', tab_exp: 'Experience', tab_next: "What's next",
            about_p1: "I'm a Computer Science undergraduate at BINUS International with a strong interest in Data Science, programming, and quantitative finance. I'm drawn to how data, mathematics, and technology reveal patterns and support better decisions.",
            about_p2: 'Administrative work and event coordination taught me accuracy, structured information management, communication, and teamwork.',
            about_p3: "I'm sharpening my programming skills and building projects, aiming to combine analytical thinking and code into meaningful, data-driven solutions.",

            exp_title: 'Experience & Education', col_exp: 'Experience', col_edu: 'Education',
            exp_date1: 'Sep 2025 (1 mo)', exp_role1: 'Administrative Assistant',
            exp_desc1: 'Supported administrative operations, organized financial and official documents, and helped process facility usage records in Excel.',
            edu_date1: 'Aug 2026 - Present', edu_deg1: "Bachelor's Degree of Computer Science",
            edu_desc1: 'Pursuing an undergraduate degree with interests in programming, data science, and data analysis.',
            edu_date2: 'Jul 2023 - May 2026', edu_deg2: 'Science Major - Merdeka Curriculum',
            edu_desc2: 'Completed senior high school education with relevant coursework in Mathematics, Physics, Informatics, and English.',

            skills_title: 'Skills', skills_tech: 'Technical Skills', skills_non: 'Non-Technical Skills',
            sk_analytical: 'Analytical Thinking', sk_team: 'Teamwork', sk_adapt: 'Adaptability', sk_comm: 'Communication',

            proj_title: 'Featured Project', proj_meta: '2026 - Self Project', view_project: 'View Project',
            p1_title: 'Geographical Information of Indonesia',
            p1_desc: "Interactive geographic information platform showcasing Indonesia's regions, islands, and natural landscapes.",
            p2_title: 'Store Cashier Simulation',
            p2_desc: 'A store cashier simulation system for processing purchases, calculating totals, and managing customer transactions.',
            p3_title: "Robby's Adventure Simulation",
            p3_desc: 'A movement simulation allowing users to navigate Robby in four cardinal directions by specifying the number of steps.',

            contact_title: 'Get in Touch',
            contact_intro: "I'm open to connecting with people interested in technology, data, programming, and analytical problem-solving.",
            c_email_sub: 'Click to copy my email', c_li_sub: 'Connect professionally', c_gh_sub: 'Explore my code',

            footer_rights: '© 2026 Alfonsus Rodrigo Haryoko. All rights reserved.',
            footer_built: 'Designed & Built with AI (Alfonsus Intelligence)',

            all: 'All', filterLabel: 'Filter projects by technology',
            close: 'Close', viewGithub: 'View on GitHub',
            copied: 'Email copied: ', copyFail: 'Could not copy automatically, opening your mail app…',
            backTop: 'Back to top', theme: 'Toggle light / dark mode', menu: 'Toggle menu', lang: 'Switch language',
            about: 'About this project', shows: 'What it demonstrates', tech: 'Technologies'
        },
        id: {
            nav_home: 'Beranda', nav_about: 'Tentang', nav_exp: 'Pengalaman', nav_skills: 'Keahlian', nav_projects: 'Proyek', nav_contact: 'Kontak',

            hero_eyebrow: 'MAHASISWA ILMU KOMPUTER · BINUS INTERNATIONAL',
            hero_p: 'Saya Alfonsus Rodrigo Haryoko, mahasiswa S1 Ilmu Komputer di BINUS International yang tertarik pada pemrograman, analisis data, dan analisis kuantitatif. Saya membangun fondasi teknis melalui pembelajaran berkelanjutan dan praktik langsung.',
            hero_cta1: 'Lihat Proyek Saya', hero_cta2: 'Hubungi Saya', hero_cv: 'Unduh CV',
            stat_projects: 'Proyek', stat_tech: 'Keahlian teknis', stat_since: 'Mulai S1',

            about_title: 'Tentang Saya',
            about_quote: 'Data, matematika & teknologi.',
            about_focus: 'Fokus utama',
            tab_profile: 'Profil', tab_exp: 'Pengalaman', tab_next: 'Selanjutnya',
            about_p1: 'Saya mahasiswa S1 Ilmu Komputer di BINUS International dengan minat besar pada Data Science, pemrograman, dan keuangan kuantitatif. Saya tertarik pada bagaimana data, matematika, dan teknologi mengungkap pola dan mendukung keputusan yang lebih baik.',
            about_p2: 'Pekerjaan administrasi dan koordinasi acara mengajarkan saya ketelitian, pengelolaan informasi yang terstruktur, komunikasi, dan kerja sama tim.',
            about_p3: 'Saya sedang mengasah kemampuan pemrograman dan membangun proyek, dengan tujuan memadukan pemikiran analitis dan kode menjadi solusi berbasis data yang bermakna.',

            exp_title: 'Pengalaman & Pendidikan', col_exp: 'Pengalaman', col_edu: 'Pendidikan',
            exp_date1: 'Sep 2025 (1 bln)', exp_role1: 'Asisten Administrasi',
            exp_desc1: 'Mendukung operasional administrasi, merapikan dokumen keuangan dan dokumen resmi, serta membantu memproses catatan penggunaan fasilitas di Excel.',
            edu_date1: 'Agu 2026 - Sekarang', edu_deg1: 'Sarjana Ilmu Komputer',
            edu_desc1: 'Menempuh pendidikan sarjana dengan minat pada pemrograman, data science, dan analisis data.',
            edu_date2: 'Jul 2023 - Mei 2026', edu_deg2: 'Jurusan IPA - Kurikulum Merdeka',
            edu_desc2: 'Menyelesaikan pendidikan SMA dengan mata pelajaran relevan: Matematika, Fisika, Informatika, dan Bahasa Inggris.',

            skills_title: 'Keahlian', skills_tech: 'Keahlian Teknis', skills_non: 'Keahlian Non-Teknis',
            sk_analytical: 'Berpikir Analitis', sk_team: 'Kerja Sama Tim', sk_adapt: 'Adaptabilitas', sk_comm: 'Komunikasi',

            proj_title: 'Proyek Unggulan', proj_meta: '2026 - Proyek Pribadi', view_project: 'Lihat Proyek',
            p1_title: 'Informasi Geografis Indonesia',
            p1_desc: 'Platform informasi geografis interaktif yang menampilkan wilayah, pulau, dan lanskap alam Indonesia.',
            p2_title: 'Simulasi Kasir Toko',
            p2_desc: 'Sistem simulasi kasir toko untuk memproses pembelian, menghitung total, dan mengelola transaksi pelanggan.',
            p3_title: 'Simulasi Petualangan Robby',
            p3_desc: 'Simulasi pergerakan yang memungkinkan pengguna menggerakkan Robby ke empat arah mata angin dengan menentukan jumlah langkah.',

            contact_title: 'Hubungi Saya',
            contact_intro: 'Saya terbuka untuk terhubung dengan siapa pun yang tertarik pada teknologi, data, pemrograman, dan pemecahan masalah analitis.',
            c_email_sub: 'Klik untuk salin email saya', c_li_sub: 'Terhubung secara profesional', c_gh_sub: 'Lihat kode saya',

            footer_rights: '© 2026 Alfonsus Rodrigo Haryoko. Hak cipta dilindungi.',
            footer_built: 'Dirancang & Dibuat dengan AI (Alfonsus Intelligence)',

            all: 'Semua', filterLabel: 'Filter proyek berdasarkan teknologi',
            close: 'Tutup', viewGithub: 'Lihat di GitHub',
            copied: 'Email disalin: ', copyFail: 'Gagal menyalin otomatis, membuka aplikasi email…',
            backTop: 'Kembali ke atas', theme: 'Ganti mode terang / gelap', menu: 'Buka/tutup menu', lang: 'Ganti bahasa',
            about: 'Tentang proyek ini', shows: 'Yang ditunjukkan proyek ini', tech: 'Teknologi'
        }
    };
    const t = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;

    const HERO = {
        en: ['Turning curiosity into ', 'data-driven thinking.'],
        id: ['Mengubah rasa ingin tahu menjadi ', 'pemikiran berbasis data.']
    };

    const PROJECTS = [
        {
            en: {
                paras: [
                    'A multi-section website that gathers basic geographic information about Indonesia in one place: its regions, its many islands, and the natural landscapes that make the archipelago distinctive.',
                    'The goal was to practice turning a lot of information into something clear and easy to browse, with a readable page structure, consistent styling, and imagery that supports the content.'
                ],
                points: [
                    'Page structure and content organization with semantic HTML',
                    'Layout, spacing, and visual consistency with CSS',
                    'Presenting information so it is easy to scan'
                ]
            },
            id: {
                paras: [
                    'Website multi-bagian yang mengumpulkan informasi geografis dasar tentang Indonesia dalam satu tempat: wilayahnya, ribuan pulaunya, dan lanskap alam yang membuat nusantara begitu khas.',
                    'Tujuannya adalah berlatih mengubah banyak informasi menjadi sesuatu yang jelas dan mudah dijelajahi, dengan struktur halaman yang rapi, gaya yang konsisten, dan gambar yang mendukung konten.'
                ],
                points: [
                    'Struktur halaman dan pengorganisasian konten dengan HTML semantik',
                    'Tata letak, jarak, dan konsistensi visual dengan CSS',
                    'Menyajikan informasi agar mudah dipindai'
                ]
            }
        },
        {
            en: {
                paras: [
                    "A simulation of how a store cashier works: items are processed, totals are calculated, and each customer's transaction is handled from start to finish.",
                    'It was a good exercise in turning a real-world process into step-by-step program logic, and in making sure the numbers always add up correctly.'
                ],
                points: [
                    'Core Python: variables, conditionals, loops, and functions',
                    'Accurate calculation of subtotals and totals',
                    'Handling user input in a clear, predictable flow'
                ]
            },
            id: {
                paras: [
                    'Simulasi cara kerja kasir toko: barang diproses, total dihitung, dan transaksi tiap pelanggan ditangani dari awal sampai selesai.',
                    'Ini latihan yang bagus untuk mengubah proses dunia nyata menjadi logika program selangkah demi selangkah, sekaligus memastikan angka-angkanya selalu tepat.'
                ],
                points: [
                    'Dasar Python: variabel, kondisi, perulangan, dan fungsi',
                    'Perhitungan subtotal dan total yang akurat',
                    'Menangani input pengguna dengan alur yang jelas dan dapat diprediksi'
                ]
            }
        },
        {
            en: {
                paras: [
                    'A small movement simulation where the user guides Robby north, south, east, or west by choosing how many steps to take in each direction.',
                    "The interesting part is tracking state: after every command Robby's position changes, so the program has to stay consistent as the journey grows."
                ],
                points: [
                    'Reading and validating user commands',
                    'Tracking position as changing state',
                    'Translating directions and step counts into program logic'
                ]
            },
            id: {
                paras: [
                    'Simulasi pergerakan kecil di mana pengguna mengarahkan Robby ke utara, selatan, timur, atau barat dengan menentukan jumlah langkah di tiap arah.',
                    'Bagian menariknya adalah melacak state: setiap perintah mengubah posisi Robby, jadi program harus tetap konsisten seiring perjalanannya bertambah panjang.'
                ],
                points: [
                    'Membaca dan memvalidasi perintah pengguna',
                    'Melacak posisi sebagai state yang terus berubah',
                    'Menerjemahkan arah dan jumlah langkah menjadi logika program'
                ]
            }
        }
    ];

    /* =====================================================================
       LANGUAGE
       ===================================================================== */
    const langListeners = [];

    function applyLang() {
        document.documentElement.lang = lang;
        $$('[data-i18n]').forEach((el) => {
            const v = I18N[lang][el.dataset.i18n];
            if (v != null) el.textContent = v;
        });
        $$('[data-i18n-aria]').forEach((el) => {
            const v = t(el.dataset.i18nAria);
            el.setAttribute('aria-label', v);
            el.title = v;
        });
        $$('[data-l]').forEach((s) => s.classList.toggle('on', s.dataset.l === lang));
        langListeners.forEach((fn) => fn());
    }

    function setupLang() {
        $('#langBtn').addEventListener('click', () => {
            lang = lang === 'en' ? 'id' : 'en';
            store.set('lang', lang);
            applyLang();
            runHero();
        });
    }

    /* =====================================================================
       THEME
       ===================================================================== */
    function setupTheme() {
        $('#themeBtn').addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            store.set('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
            document.dispatchEvent(new Event('themechange'));
        });
    }

    /* =====================================================================
       MOBILE MENU
       ===================================================================== */
    function setupHamburger() {
        const header = $('.site-header');
        const btn = $('#menuBtn');
        const setOpen = (open) => {
            header.classList.toggle('menu-open', open);
            btn.setAttribute('aria-expanded', String(open));
        };
        btn.addEventListener('click', () => setOpen(!header.classList.contains('menu-open')));
        $$('.nav-link').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
        window.addEventListener('resize', () => { if (window.innerWidth > 768) setOpen(false); });
        document.addEventListener('click', (e) => {
            if (header.classList.contains('menu-open') && !header.contains(e.target)) setOpen(false);
        });
    }

    /* =====================================================================
       HERO TYPING
       ===================================================================== */
    let heroTimer = null;
    let heroEls = null;

    function setupHero() {
        const h1 = $('.hero-text h1');
        if (!h1) return;
        const head = document.createTextNode('');
        const hl = document.createElement('span');
        hl.className = 'highlight';
        const caret = document.createElement('span');
        caret.className = 'caret';
        caret.setAttribute('aria-hidden', 'true');
        h1.textContent = '';
        h1.append(head, hl, caret);
        heroEls = { h1, head, hl, caret };
    }

    function runHero() {
        if (!heroEls) return;
        const { h1, head, hl, caret } = heroEls;
        clearTimeout(heroTimer);
        const [a, b] = HERO[lang];
        const full = a + b;
        h1.setAttribute('aria-label', full);

        const render = (i) => {
            head.nodeValue = full.slice(0, Math.min(i, a.length));
            hl.textContent = i > a.length ? full.slice(a.length, i) : '';
        };

        h1.style.minHeight = '';
        render(full.length);
        caret.style.display = 'none';
        h1.style.minHeight = h1.offsetHeight + 'px';

        if (reduceMotion) { h1.style.minHeight = ''; return; }

        render(0);
        caret.style.display = '';
        let i = 0;
        const tick = () => {
            i++;
            render(i);
            if (i < full.length) heroTimer = setTimeout(tick, 42);
            else heroTimer = setTimeout(() => { caret.style.display = 'none'; h1.style.minHeight = ''; }, 1800);
        };
        heroTimer = setTimeout(tick, 600);
    }

    /* =====================================================================
       ABOUT TABS (klik, panah keyboard, auto-rotate sampai disentuh)
       ===================================================================== */
    function setupAbout() {
        const box = $('#aboutTabs');
        if (!box) return;
        const tabs = $$('.about-tab', box);
        const panels = $$('.about-panel', box);
        const dots = $$('.about-dots i', box);
        const ink = $('.about-ink', box);
        let cur = 0, timer = null, userTouched = false;

        const moveInk = () => {
            const tb = tabs[cur];
            ink.style.setProperty('--w', tb.offsetWidth + 'px');
            ink.style.setProperty('--x', tb.offsetLeft + 'px');
        };
        const show = (i, byUser) => {
            if (byUser) { userTouched = true; clearInterval(timer); }
            cur = i;
            tabs.forEach((tb, k) => {
                tb.classList.toggle('active', k === i);
                tb.setAttribute('aria-selected', String(k === i));
                tb.tabIndex = k === i ? 0 : -1;
            });
            panels.forEach((p, k) => {
                p.hidden = k !== i;
                p.classList.remove('active');
                if (k === i) { void p.offsetWidth; p.classList.add('active'); }
            });
            dots.forEach((d, k) => d.classList.toggle('on', k === i));
            moveInk();
        };
        tabs.forEach((tb, i) => {
            tb.addEventListener('click', () => show(i, true));
            tb.addEventListener('keydown', (e) => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                e.preventDefault();
                const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
                show(n, true); tabs[n].focus();
            });
        });
        dots.forEach((d, i) => d.addEventListener('click', () => show(i, true)));
        langListeners.push(moveInk);
        window.addEventListener('resize', moveInk);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);

        if (!reduceMotion && 'IntersectionObserver' in window) {
            new IntersectionObserver((en) => {
                clearInterval(timer);
                if (en[0].isIntersecting && !userTouched) timer = setInterval(() => show((cur + 1) % tabs.length), 7000);
            }, { threshold: 0.4 }).observe(box);
        }
        moveInk();
    }

    /* =====================================================================
       COUNTERS
       ===================================================================== */
    function setupCounters() {
        const els = $$('.count');
        if (!els.length) return;
        const run = (el) => {
            const target = Number(el.dataset.count) || 0;
            if (reduceMotion) { el.textContent = target; return; }
            const dur = 1400;
            const start = performance.now();
            const step = (now) => {
                const p = Math.min((now - start) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); run(en.target); } });
        }, { threshold: 0.6 });
        els.forEach((el) => io.observe(el));
    }

    /* =====================================================================
       COPY EMAIL
       ===================================================================== */
    let toastEl = null;
    let toastTimer = null;
    function showToast(msg) {
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.className = 'toast';
            toastEl.setAttribute('role', 'status');
            toastEl.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = msg;
        void toastEl.offsetWidth;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
    }

    async function copyText(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (e) { /* fallback */ }
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            ta.remove();
            return ok;
        } catch (e) { return false; }
    }

    function setupCopyEmail() {
        const link = $('.contact-card.email');
        if (!link) return;
        link.addEventListener('click', async (e) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return; // Ctrl/Cmd+klik tetap buka aplikasi email
            e.preventDefault();
            const addr = link.getAttribute('href').replace(/^mailto:/i, '').split('?')[0];
            const ok = await copyText(addr);
            if (ok) {
                showToast(t('copied') + addr);
            } else {
                showToast(t('copyFail'));
                setTimeout(() => { window.location.href = link.href; }, 900);
            }
        });
    }

    /* =====================================================================
       SCROLL UI: progress, back-to-top, active nav
       ===================================================================== */
    function setupScrollUI() {
        const bar = $('.scroll-progress');
        const top = $('#backTop');
        top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

        const links = $$('.nav-list .nav-link[href^="#"]');
        const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);

        let ticking = false;
        const update = () => {
            ticking = false;
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
            top.classList.toggle('show', y > 500);

            let current = sections[0];
            const line = window.innerHeight * 0.35;
            sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s; });
            if (max > 0 && y >= max - 2) current = sections[sections.length - 1];
            links.forEach((a) => {
                const on = current && a.getAttribute('href') === '#' + current.id;
                a.classList.toggle('active', !!on);
                if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
            });
        };
        const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
    }

    /* =====================================================================
       SCROLL REVEAL (staggered)
       ===================================================================== */
    function setupReveal() {
        const targets = $$('.reveal');
        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach((el) => el.classList.remove('reveal'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                io.unobserve(el);
                const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
                el.style.transitionDelay = Math.max(0, siblings.indexOf(el)) * 100 + 'ms';
                el.classList.add('in');
                setTimeout(() => {
                    el.classList.remove('reveal', 'in');
                    el.style.transitionDelay = '';
                }, 1300);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        targets.forEach((el) => io.observe(el));
    }

    /* =====================================================================
       PROJECT FILTER
       ===================================================================== */
    function setupFilter() {
        const wrap = $('.projects');
        const cards = $$('.project-card');
        if (!wrap || !cards.length) return;

        const techs = [];
        const cardTechs = cards.map((c) => {
            const names = $$('.tag', c).map((x) => x.textContent.trim()).filter(Boolean);
            names.forEach((n) => { if (!techs.includes(n)) techs.push(n); });
            return names;
        });

        const bar = document.createElement('div');
        bar.className = 'filter-bar reveal';
        bar.setAttribute('role', 'group');
        wrap.parentNode.insertBefore(bar, wrap);

        const mk = (value) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'filter-btn';
            b.dataset.value = value;
            b.setAttribute('aria-pressed', 'false');
            bar.appendChild(b);
            return b;
        };
        const allBtn = mk('*');
        techs.forEach((n) => { mk(n).textContent = n; });

        const select = (value) => {
            $$('.filter-btn', bar).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
            cards.forEach((card, i) => {
                const show = value === '*' || cardTechs[i].includes(value);
                card.classList.toggle('is-hidden', !show);
                if (show) {
                    card.classList.remove('pop');
                    void card.offsetWidth;
                    if (!reduceMotion) card.classList.add('pop');
                }
            });
        };
        bar.addEventListener('click', (e) => {
            const b = e.target.closest('.filter-btn');
            if (b) select(b.dataset.value);
        });
        langListeners.push(() => { allBtn.textContent = t('all'); bar.setAttribute('aria-label', t('filterLabel')); });
        select('*');
    }

    /* =====================================================================
       PROJECT MODAL
       ===================================================================== */
    function setupModal() {
        const cards = $$('.project-card');
        if (!cards.length) return;

        const overlay = document.createElement('div');
        overlay.className = 'pm-overlay';
        overlay.innerHTML =
            '<div class="pm-dialog" role="dialog" aria-modal="true" aria-labelledby="pm-title">' +
                '<button type="button" class="pm-close" aria-label="Close">&#10005;</button>' +
                '<div class="pm-scroll">' +
                    '<img class="pm-img" alt="">' +
                    '<div class="pm-body">' +
                        '<p class="small-text gold-text pm-meta"></p>' +
                        '<h3 id="pm-title"></h3>' +
                        '<p class="pm-desc muted"></p>' +
                        '<h4 class="pm-h-about"></h4>' +
                        '<div class="pm-paras"></div>' +
                        '<h4 class="pm-h-shows"></h4>' +
                        '<ul class="pm-points"></ul>' +
                        '<h4 class="pm-h-tech"></h4>' +
                        '<ul class="tags pm-tags"></ul>' +
                        '<a class="pm-link" target="_blank" rel="noopener" hidden></a>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        const q = (s) => $(s, overlay);
        const closeBtn = q('.pm-close');
        let currentIndex = -1;
        let lastFocus = null;

        function render() {
            if (currentIndex < 0) return;
            const card = cards[currentIndex];
            const data = (PROJECTS[currentIndex] || PROJECTS[0])[lang];
            const img = $('.project-img', card);
            q('.pm-img').src = img.getAttribute('src');
            q('.pm-img').alt = img.alt;
            q('.pm-meta').textContent = $('.small-text', card).textContent;
            q('#pm-title').textContent = $('h3', card).textContent;
            q('.pm-desc').textContent = $('.project-desc', card).textContent;
            q('.pm-h-about').textContent = t('about');
            q('.pm-h-shows').textContent = t('shows');
            q('.pm-h-tech').textContent = t('tech');
            closeBtn.setAttribute('aria-label', t('close'));

            const paras = q('.pm-paras');
            paras.textContent = '';
            data.paras.forEach((txt) => {
                const p = document.createElement('p');
                p.textContent = txt;
                paras.appendChild(p);
            });
            const pts = q('.pm-points');
            pts.textContent = '';
            data.points.forEach((txt) => {
                const li = document.createElement('li');
                li.textContent = txt;
                pts.appendChild(li);
            });
            const tags = $('.tags', card);
            q('.pm-tags').innerHTML = tags ? tags.innerHTML : '';

            const link = $('.project-link', card);
            const a = q('.pm-link');
            if (link) {
                a.href = link.href;
                a.innerHTML = '<span class="gh-ico"><svg aria-hidden="true"><use href="#i-github"/></svg></span>' +
                    '<span class="gh-txt">' + t('viewGithub') + '<small>github.com/rodriegooo</small></span>' +
                    '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
                a.hidden = false;
            } else {
                a.hidden = true;
            }
        }

        function open(i) {
            currentIndex = i;
            lastFocus = document.activeElement;
            render();
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            q('.pm-scroll').scrollTop = 0;
            closeBtn.focus();
        }
        function close() {
            if (!overlay.classList.contains('open')) return;
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            currentIndex = -1;
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        cards.forEach((card, i) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                open(i);
            });
            card.addEventListener('keydown', (e) => {
                if (e.target !== card) return;
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
            });
        });

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('open')) return;
            if (e.key === 'Escape') { close(); return; }
            if (e.key === 'Tab') {
                const f = $$('button, a[href]', overlay).filter((el) => !el.hidden && el.offsetParent !== null);
                if (!f.length) return;
                const first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        langListeners.push(render);
    }

    /* =====================================================================
       POINTER EFFECTS: spotlight, tilt, magnetic buttons, cursor glow
       ===================================================================== */
    function setupPointerFX() {
        if (!canHover) return;

        // spotlight that follows the cursor inside cards
        $$('.spot').forEach((el) => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                el.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });

        if (reduceMotion) return;

        // 3D tilt
        $$('.tilt').forEach((el) => {
            const max = el.classList.contains('hero-image') ? 8 : 5;
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty('--ry', (px * max * 2).toFixed(2) + 'deg');
                el.style.setProperty('--rx', (-py * max * 2).toFixed(2) + 'deg');
            });
            el.addEventListener('pointerleave', () => {
                el.style.setProperty('--rx', '0deg');
                el.style.setProperty('--ry', '0deg');
            });
        });

        // magnetic buttons
        $$('.magnetic').forEach((el) => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
                const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
                el.style.setProperty('--tx', x.toFixed(1) + 'px');
                el.style.setProperty('--ty', y.toFixed(1) + 'px');
            });
            el.addEventListener('pointerleave', () => {
                el.style.setProperty('--tx', '0px');
                el.style.setProperty('--ty', '0px');
            });
        });

        // large soft glow trailing the cursor
        const glow = $('.cursor-glow');
        if (glow) {
            let tx = 0, ty = 0, cx = 0, cy = 0, running = false;
            const loop = () => {
                cx += (tx - cx) * 0.12;
                cy += (ty - cy) * 0.12;
                glow.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
                if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) requestAnimationFrame(loop);
                else running = false;
            };
            window.addEventListener('pointermove', (e) => {
                tx = e.clientX; ty = e.clientY;
                glow.classList.add('on');
                if (!running) { running = true; requestAnimationFrame(loop); }
            }, { passive: true });
            document.addEventListener('mouseleave', () => glow.classList.remove('on'));
        }
    }

    /* =====================================================================
       INTERACTIVE BACKGROUND (constellation, bereaksi pada kursor)
       ===================================================================== */
    function setupBackground() {
        const canvas = $('.bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = 0, h = 0, dpr = 1;
        let parts = [];
        let rgb = '214,178,106';
        let alphaBoost = 1;
        const mouse = { x: -9999, y: -9999 };
        const LINK = 130;
        const MOUSE_R = 170;

        const readColor = () => {
            const hex = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim().replace('#', '');
            if (/^[0-9a-f]{6}$/i.test(hex)) {
                rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');
            }
            alphaBoost = document.documentElement.getAttribute('data-theme') === 'light' ? 1.7 : 1;
            if (reduceMotion) draw();
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const target = Math.min(85, Math.round((w * h) / 20000));
            while (parts.length < target) {
                parts.push({
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
                    r: Math.random() * 1.4 + 0.7, tw: Math.random() * Math.PI * 2
                });
            }
            parts.length = target;
            if (reduceMotion) draw();
        };

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i];
                const a = (0.35 + 0.25 * Math.sin(p.tw)) * alphaBoost;
                ctx.fillStyle = 'rgba(' + rgb + ',' + Math.min(a, 0.9).toFixed(3) + ')';
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

                for (let j = i + 1; j < parts.length; j++) {
                    const q = parts[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < LINK) {
                        ctx.strokeStyle = 'rgba(' + rgb + ',' + ((1 - d / LINK) * 0.16 * alphaBoost).toFixed(3) + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                    }
                }
                const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (dm < MOUSE_R) {
                    ctx.strokeStyle = 'rgba(' + rgb + ',' + ((1 - dm / MOUSE_R) * 0.4 * alphaBoost).toFixed(3) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }
        }

        function step() {
            for (const p of parts) {
                const dx = p.x - mouse.x, dy = p.y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < MOUSE_R && d > 0) {
                    // dekat kursor: partikel sedikit tertarik lalu menjauh saat terlalu dekat
                    const f = d < 70 ? 0.8 : -0.25;
                    p.x += (dx / d) * f; p.y += (dy / d) * f;
                }
                p.x += p.vx; p.y += p.vy; p.tw += 0.02;
                if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
            }
        }

        let raf = 0;
        const loop = () => { step(); draw(); raf = requestAnimationFrame(loop); };

        window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
        window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
        document.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
        let rt;
        window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
        document.addEventListener('themechange', readColor);
        document.addEventListener('visibilitychange', () => {
            if (reduceMotion) return;
            cancelAnimationFrame(raf);
            if (!document.hidden) loop();
        });

        resize();
        readColor();
        if (!reduceMotion) loop();
    }

    /* =====================================================================
       INIT
       ===================================================================== */
    function init() {
        setupTheme();
        setupHamburger();
        setupLang();
        setupFilter();
        setupModal();
        setupHero();

        applyLang();
        runHero();

        setupAbout();
        setupCounters();
        setupCopyEmail();
        setupScrollUI();
        setupReveal();
        setupPointerFX();
        setupBackground();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();