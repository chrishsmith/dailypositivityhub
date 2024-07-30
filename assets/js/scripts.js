document.addEventListener("DOMContentLoaded", function() {
    const quoteElement = document.getElementById("quote");
    const navLinks = document.querySelectorAll("nav ul li a");

    async function fetchRandomQuote() {
        try {
            const response = await fetch("/.netlify/functions/random-quote");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching quote:", error);
            return { content: "Stay positive and keep pushing forward.", author: "Unknown" };
        }
    }

    const brightColors = [
        '#FF5733', '#FFBD33', '#FF33A6', '#33FF57', '#33FFBD', 
        '#33A6FF', '#5733FF', '#BD33FF', '#FF3333', '#33FF33'
    ];

    function getRandomBrightColor() {
        const randomIndex = Math.floor(Math.random() * brightColors.length);
        return brightColors[randomIndex];
    }

    function getRandomGradient() {
        const color1 = getRandomBrightColor();
        const color2 = getRandomBrightColor();
        return `linear-gradient(90deg, ${color1}, ${color2})`;
    }

    async function showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        const gradient = getRandomGradient();
        quoteElement.style.background = gradient;
        quoteElement.style.webkitBackgroundClip = 'text';
        quoteElement.style.webkitTextFillColor = 'transparent';

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase() === sectionId) {
                link.classList.add('active');
                link.style.setProperty('--active-gradient', gradient);
            } else {
                link.style.removeProperty('--active-gradient');
            }
        });

        if (sectionId === 'quotes') {
            const randomQuote = await fetchRandomQuote();
            quoteElement.textContent = `"${randomQuote.content}" - ${randomQuote.author}`;
        }
    }

    showSection('quotes');
    window.showSection = showSection;
});
