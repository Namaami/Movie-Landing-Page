// --- 1. THE DATABASE (Updated with Reliable Links) ---
const movies = [
    {
        title: "Squid Game",
        year: "2021",
        age: "16+",
        duration: "2 Seasons",
        genre: "Drama",
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
        bg: "Images/squid game.jpeg", // Your local image
        cardImg: "Images/squid-game.jpeg"
    },
    {
        title: "One Piece",
        year: "1999",
        age: "14+",
        duration: "1000+ Eps",
        genre: "Anime",
        description: "Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the King of the Pirates. With a course charted for the treacherous Grand Line, this is one captain who'll never drop anchor.",
        bg: "Images/one piece.jpeg",
        cardImg: "Images/one-piece.jpeg"
    },
    {
        title: "Shogun",
        year: "2024",
        age: "18+",
        duration: "1 Season",
        genre: "History",
        description: "When a mysterious European ship is found marooned in a nearby fishing village, its English pilot, John Blackthorne, comes bearing secrets that could help Lord Toranaga tip the scales of power.",
        bg: "Images/shogun.jpeg",
        cardImg: "Images/Shogun (1).jpeg"
    },
    {
        title: "Demon Slayer",
        year: "2019",
        age: "16+",
        duration: "4 Seasons",
        genre: "Action",
        description: "After a demon attack leaves his family slain and his sister cursed, Tanjiro sets out on a perilous journey to find a cure and avenge those he's lost.",
        bg: "Images/demon slayer.jpg",
        cardImg: "Images/demon-slayer.jpeg"
    },
    {
        title: "House of the Dragon",
        year: "2022",
        age: "18+",
        duration: "2 Seasons",
        genre: "Fantasy",
        description: "The reign of House Targaryen begins: House of the Dragon, the prequel to Game of Thrones, is here. Based on George R.R. Martin's 'Fire & Blood'.",
        bg: "Images/House-Of-The-Dragon.jpeg",
        cardImg: "Images/House Of The Dragon.jpeg"
    },
    {
        title: "Wolf of Wall Street",
        year: "2013",
        age: "18+",
        duration: "3h 0m",
        genre: "Crime",
        description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
        bg: "Images/Wolf Of Wall Street.jpeg",
        cardImg: "Images/Wolf-Of-Wall-Street.jpeg"
    }
];

// --- 2. SELECT DOM ELEMENTS ---
const bgImage = document.querySelector('.background-image');
const titleEl = document.querySelector('h1');
const metaEl = document.querySelector('.meta-tags');
const descEl = document.querySelector('.description');

const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pills = document.querySelectorAll('.pill');

let currentIndex = 0;
const scrollAmount = 175; // Matched to new CSS card size

// --- 3. INITIALIZATION: GENERATE CARDS ---
function initSlider() {
    // Clear existing content
    slider.innerHTML = '';

    movies.forEach((movie, index) => {
        // Create Card Div
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Add Content
        card.innerHTML = `
            <img src="${movie.cardImg}" alt="${movie.title}">
            <div class="text-overlay">
                <h4>${movie.title}</h4>
                <p>${movie.genre}</p>
            </div>
        `;

        // --- CLICK EVENT: This makes the card clickable ---
        card.addEventListener('click', () => {
            currentIndex = index;
            updateHeroSection(currentIndex);
            updatePills(currentIndex);
        });

        // Add to Slider
        slider.appendChild(card);
    });
}

// --- 4. UPDATE FUNCTION ---
function updateHeroSection(index) {
    const movie = movies[index];

    // Fade Out
    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';
    metaEl.style.opacity = '0';

    setTimeout(() => {
        // Update Text
        titleEl.textContent = movie.title;
        descEl.textContent = movie.description;
        
        metaEl.innerHTML = `
            <span>${movie.year}</span>
            <span class="divider">|</span>
            <span class="yellow">${movie.age}</span>
            <span class="divider">|</span>
            <span>${movie.duration}</span>
            <span class="divider">|</span>
            <span>${movie.genre}</span>
        `;

        // Update Background
        bgImage.style.backgroundImage = `url('${movie.bg}')`;
        
        // Restart Animation
        bgImage.style.animation = 'none';
        bgImage.offsetHeight; 
        bgImage.style.animation = 'breathe 20s ease-in-out infinite alternate';

        // Fade In
        titleEl.style.opacity = '1';
        descEl.style.opacity = '1';
        metaEl.style.opacity = '1';
    }, 200);
}

// --- 5. ARROW CONTROLS ---
function updatePills(index) {
    pills.forEach(pill => pill.classList.remove('active'));
    const pillIndex = index % pills.length; 
    if(pills[pillIndex]) pills[pillIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= movies.length) {
        currentIndex = 0;
        slider.scrollLeft = 0;
    } else {
        slider.scrollLeft += scrollAmount;
    }
    updateHeroSection(currentIndex);
    updatePills(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = movies.length - 1;
        slider.scrollLeft = slider.scrollWidth;
    } else {
        slider.scrollLeft -= scrollAmount;
    }
    updateHeroSection(currentIndex);
    updatePills(currentIndex);
});

// --- 6. MODAL LOGIC ---
const trailerBtn = document.querySelector('.btn-trailer');
const modal = document.getElementById('videoModal');
const iframe = document.getElementById('youtubeFrame');

trailerBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

function closeTrailer() {
    modal.classList.remove('active');
    const videoSrc = iframe.src;
    iframe.src = videoSrc; 
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeTrailer();
    }
});

// RUN INITIALIZATION
initSlider();