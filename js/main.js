/**
 * Wanderlust Chronicles - Travel Blog
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initFilterButtons();
    initCounterAnimation();
    initBackToTop();
    initNewsletterForm();
    initBlogModal();
});

/**
 * Navigation - Scroll Effects
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                toggleMenuIcon(false);
            }
        });
    });
}

/**
 * Theme Toggle (Light/Dark Mode)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (isLight) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        toggleMenuIcon(!isHidden);
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                mobileMenu.classList.add('hidden');
                toggleMenuIcon(false);
                
                setTimeout(() => {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
}

function toggleMenuIcon(isOpen) {
    const menuOpen = document.querySelector('.menu-open');
    const menuClose = document.querySelector('.menu-close');

    if (isOpen) {
        menuOpen.classList.add('hidden');
        menuClose.classList.remove('hidden');
    } else {
        menuOpen.classList.remove('hidden');
        menuClose.classList.add('hidden');
    }
}

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // On scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/**
 * Blog Filter Buttons
 */
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards
            blogCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        });
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.stat-card');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            hasAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + '+';
                    }
                };

                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters(); // Initial check
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                // Show success message (you can customize this)
                showNotification('Thanks for subscribing! 🎉', 'success');
                form.reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

/**
 * Show Notification
 */
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl z-50 font-medium transition-all duration-300 transform translate-y-4 opacity-0`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else {
        notification.classList.add('bg-red-500', 'text-white');
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.classList.remove('translate-y-4', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Image Lazy Loading Enhancement
 */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

/**
 * Blog Modal - Expandable Blog Cards
 */
function initBlogModal() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Blog post full content data
    const blogContent = {
        'dhaka': {
            'Old Dhaka: A Walk Through History': {
                image: 'https://images.unsplash.com/photo-1609946860441-a51ffcf22208?w=1200&q=80',
                location: 'Dhaka City',
                readTime: '5 min read',
                date: 'January 15, 2026',
                content: `
                    <p>Old Dhaka, the historical heart of Bangladesh's capital, is a living museum of Mughal architecture, vibrant culture, and centuries-old traditions. Walking through its narrow lanes is like stepping back in time.</p>
                    
                    <h3>Ahsan Manzil - The Pink Palace</h3>
                    <p>This stunning pink palace on the banks of the Buriganga River was once the residence of the Nawabs of Dhaka. Now a museum, it showcases the grandeur of the Nawabi era with its impressive dome and colonial architecture.</p>
                    
                    <h3>Lalbagh Fort</h3>
                    <p>Built in 1678 by Prince Muhammad Azam, this incomplete Mughal fort complex features beautiful gardens, the tomb of Pari Bibi, and the Diwan-i-Aam. The fort's architecture reflects the glory of Mughal Bengal.</p>
                    
                    <h3>Must-Visit Places</h3>
                    <ul>
                        <li><strong>Sadarghat:</strong> The largest river port in Bangladesh, bustling with colorful boats</li>
                        <li><strong>Armenian Church:</strong> One of the oldest churches in the country</li>
                        <li><strong>Star Mosque:</strong> Stunning mosque decorated with Chinese tiles</li>
                        <li><strong>Shakhari Bazar:</strong> Traditional Hindu goldsmith market</li>
                    </ul>
                    
                    <h3>Food to Try</h3>
                    <p>Old Dhaka is famous for its unique cuisine. Try Haji Biriyani, the legendary Bakarkhani bread, Sheekh Kebab from the street vendors, and the famous Dhakaiya Shemai. Don't miss the authentic lassi and falooda!</p>
                `
            }
        },
        'chittagong': {
            "Cox's Bazar: World's Longest Sea Beach": {
                image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=80',
                location: "Cox's Bazar",
                readTime: '8 min read',
                date: 'December 20, 2025',
                content: `
                    <p>Cox's Bazar boasts the world's longest natural sandy sea beach, stretching an incredible 120 kilometers along the Bay of Bengal. This coastal paradise offers stunning sunsets, vibrant fishing culture, and endless stretches of golden sand.</p>
                    
                    <h3>Best Beaches</h3>
                    <ul>
                        <li><strong>Laboni Beach:</strong> The main beach closest to the town, perfect for swimming and beach activities</li>
                        <li><strong>Inani Beach:</strong> Famous for its coral stones and clear waters</li>
                        <li><strong>Himchhari:</strong> Offers beautiful waterfalls and scenic views</li>
                        <li><strong>Kolatoli Beach:</strong> Popular for early morning walks and seafood</li>
                    </ul>
                    
                    <h3>Beyond the Beach</h3>
                    <p>Visit Saint Martin's Island, Bangladesh's only coral island, accessible by ship. Explore Maheshkhali Island known for its Buddhist temples and betel leaf cultivation. The Ramu Buddhist Temples showcase beautiful bronze statues and ancient artifacts.</p>
                    
                    <h3>Best Time to Visit</h3>
                    <p>November to March offers the best weather with clear skies and pleasant temperatures. Visit during sunset for the most spectacular views of the sun dipping into the Bay of Bengal.</p>
                    
                    <h3>Local Delicacies</h3>
                    <p>Fresh seafood is abundant - try the famous dried fish (Shutki), grilled lobster, and traditional Bengali fish curry. Don't miss the coconut-based desserts unique to this coastal region.</p>
                `
            }
        },
        'sylhet': {
            'Tea Gardens of Sylhet: Green Paradise': {
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
                location: 'Sreemangal',
                readTime: '6 min read',
                date: 'March 10, 2026',
                content: `
                    <p>Sylhet Division, often called the "Tea Capital of Bangladesh," is home to over 150 tea gardens spread across rolling hills. The region offers breathtaking landscapes, unique biodiversity, and a peaceful escape from city life.</p>
                    
                    <h3>Sreemangal - Tea Capital</h3>
                    <p>Known as the "Land of Two Leaves and a Bud," Sreemangal is surrounded by lush tea estates. Visit the famous Nilkantha Tea Cabin for their seven-layer tea, a colorful local specialty that has become an Instagram sensation.</p>
                    
                    <h3>Natural Wonders</h3>
                    <ul>
                        <li><strong>Ratargul Swamp Forest:</strong> Bangladesh's only freshwater swamp forest, best explored by boat during monsoon</li>
                        <li><strong>Lawachara National Park:</strong> Home to the endangered Hoolock Gibbon</li>
                        <li><strong>Madhabpur Lake:</strong> Surrounded by tea gardens and rubber plantations</li>
                        <li><strong>Bikkrampur Waterfalls:</strong> Hidden cascades in the hills</li>
                    </ul>
                    
                    <h3>Jaflong</h3>
                    <p>Located near the India border, Jaflong offers stunning views of the Khasi Hills and crystal-clear water filled with beautiful stones. The Piyain River flowing from India creates a mesmerizing landscape.</p>
                    
                    <h3>Local Experience</h3>
                    <p>Stay at a tea bungalow for an authentic experience. Wake up to misty mornings, watch tea pluckers at work, and enjoy freshly brewed tea from leaves picked just hours ago.</p>
                `
            }
        },
        'rajshahi': {
            'Paharpur: Ancient Buddhist Heritage': {
                image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
                location: 'Paharpur',
                readTime: '7 min read',
                date: 'February 28, 2026',
                content: `
                    <p>Rajshahi Division is home to some of Bangladesh's most significant archaeological sites, including the UNESCO World Heritage Somapura Mahavihara at Paharpur - one of the largest Buddhist monasteries south of the Himalayas.</p>
                    
                    <h3>Somapura Mahavihara</h3>
                    <p>Built in the 8th century during the Pala dynasty, this massive monastery once housed over 1,000 Buddhist monks. The central temple rises 21 meters high, decorated with terracotta plaques depicting Buddhist and Hindu mythology.</p>
                    
                    <h3>Historical Sites</h3>
                    <ul>
                        <li><strong>Mahasthangarh:</strong> One of the oldest archaeological sites in Bangladesh, dating back to 3rd century BC</li>
                        <li><strong>Puthia Temple Complex:</strong> Stunning Hindu temples with intricate terracotta work</li>
                        <li><strong>Kantanagar Temple:</strong> Famous for its ornate terracotta decorations</li>
                        <li><strong>Varendra Research Museum:</strong> Houses ancient sculptures and artifacts</li>
                    </ul>
                    
                    <h3>The Mango Capital</h3>
                    <p>Rajshahi is famous for its mangoes, producing over 300,000 tons annually. Visit during May-June mango season to taste varieties like Fazli, Langra, and Gopalbhog directly from orchards.</p>
                    
                    <h3>Silk Heritage</h3>
                    <p>The region is renowned for Rajshahi silk. Visit local weavers to see traditional silk production and purchase authentic Rajshahi silk sarees directly from artisans.</p>
                `
            }
        },
        'khulna': {
            'Sundarbans: Home of the Royal Bengal Tiger': {
                image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80',
                location: 'Sundarbans',
                readTime: '10 min read',
                date: 'November 15, 2025',
                content: `
                    <p>The Sundarbans, a UNESCO World Heritage Site, is the world's largest mangrove forest spanning 10,000 square kilometers. This unique ecosystem is home to the Royal Bengal Tiger and countless other species found nowhere else on Earth.</p>
                    
                    <h3>Wildlife Paradise</h3>
                    <ul>
                        <li><strong>Royal Bengal Tiger:</strong> Approximately 400 tigers call this forest home</li>
                        <li><strong>Spotted Deer:</strong> The most common large mammal in the forest</li>
                        <li><strong>Saltwater Crocodile:</strong> Found in the rivers and creeks</li>
                        <li><strong>Gangetic Dolphin:</strong> Often spotted during boat tours</li>
                        <li><strong>Over 300 bird species:</strong> Including the masked finfoot and white-bellied sea eagle</li>
                    </ul>
                    
                    <h3>Best Experience</h3>
                    <p>Take a 2-3 day boat tour through the narrow canals. Stay overnight on a houseboat and wake up to the sounds of the forest. Visit watchtowers like Kotka and Kachikhali for the best chance to spot tigers.</p>
                    
                    <h3>The Honey Hunters</h3>
                    <p>During April-May, local honey collectors called Mawalis venture deep into the forest to collect wild honey. Join an ethical tour to learn about this dangerous but traditional practice.</p>
                    
                    <h3>Conservation</h3>
                    <p>The Sundarbans also protects coastal Bangladesh from cyclones and tidal surges. Learn about conservation efforts and how climate change threatens this precious ecosystem.</p>
                `
            }
        },
        'rangpur': {
            'Tajhat Palace: Mughal Grandeur in Rangpur': {
                image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
                location: 'Rangpur City',
                readTime: '5 min read',
                date: 'April 5, 2026',
                content: `
                    <p>Rangpur Division in northern Bangladesh offers a unique blend of historical architecture, natural beauty, and agricultural heritage. The region is known for its palaces, tobacco fields, and distinctive culture.</p>
                    
                    <h3>Tajhat Palace</h3>
                    <p>Built in the early 20th century by Maharaja Kumar Gopal Lal Roy, this stunning white marble palace combines Mughal and European architectural styles. Now a museum, it houses artifacts from the Mughal period and a collection of Sanskrit manuscripts.</p>
                    
                    <h3>Historical Attractions</h3>
                    <ul>
                        <li><strong>Vinnya Jagat:</strong> Eco-tourism spot with beautiful gardens</li>
                        <li><strong>Kantaji Temple:</strong> Nearby temple with intricate terracotta work</li>
                        <li><strong>Rangpur Town Hall:</strong> Colonial-era architecture</li>
                        <li><strong>Carmichael College:</strong> One of the oldest colleges with beautiful grounds</li>
                    </ul>
                    
                    <h3>Northern Culture</h3>
                    <p>Experience the unique "Bhawaiya" folk music tradition of this region. The melodious songs about river life and rural romance are recognized by UNESCO as intangible cultural heritage.</p>
                    
                    <h3>Agricultural Heritage</h3>
                    <p>Rangpur is famous for its tobacco and potato cultivation. Visit during harvest season to see the golden tobacco leaves drying in the sun and experience rural Bangladesh at its most authentic.</p>
                `
            }
        }
    };
    
    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'blogModal';
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-container">
            <button class="modal-close" aria-label="Close modal">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div class="modal-content">
                <div class="modal-image-wrapper">
                    <img src="" alt="" class="modal-image">
                    <div class="modal-category"></div>
                </div>
                <div class="modal-body">
                    <div class="modal-meta">
                        <span class="modal-location"></span>
                        <span>•</span>
                        <span class="modal-date"></span>
                        <span>•</span>
                        <span class="modal-read-time"></span>
                    </div>
                    <h2 class="modal-title"></h2>
                    <div class="modal-article"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalImage = modal.querySelector('.modal-image');
    const modalCategory = modal.querySelector('.modal-category');
    const modalLocation = modal.querySelector('.modal-location');
    const modalDate = modal.querySelector('.modal-date');
    const modalReadTime = modal.querySelector('.modal-read-time');
    const modalTitle = modal.querySelector('.modal-title');
    const modalArticle = modal.querySelector('.modal-article');
    
    // Open modal on card click
    blogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const category = card.dataset.category;
            const title = card.querySelector('.card-title').textContent.trim();
            const categoryLabel = card.querySelector('.card-category').textContent;
            const excerpt = card.querySelector('.card-excerpt').textContent;
            const cardImage = card.querySelector('.card-image').src;
            const metaLocation = card.querySelector('.card-meta span:first-child').textContent;
            
            // Find the content for this post
            let postData = null;
            if (blogContent[category]) {
                postData = blogContent[category][title];
            }
            
            if (postData) {
                modalImage.src = postData.image;
                modalImage.alt = title;
                modalCategory.textContent = categoryLabel;
                modalLocation.textContent = '📍 ' + postData.location;
                modalDate.textContent = postData.date;
                modalReadTime.textContent = postData.readTime;
                modalTitle.textContent = title;
                modalArticle.innerHTML = postData.content;
            } else {
                // Fallback: use card content
                modalImage.src = cardImage.replace('w=800', 'w=1200');
                modalImage.alt = title;
                modalCategory.textContent = categoryLabel;
                modalLocation.textContent = metaLocation;
                modalDate.textContent = 'January 2026';
                modalReadTime.textContent = '5 min read';
                modalTitle.textContent = title;
                modalArticle.innerHTML = `<p>${excerpt}</p><p>Full article content coming soon...</p>`;
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

