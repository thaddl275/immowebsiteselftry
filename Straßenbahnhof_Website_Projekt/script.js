

    // ----------------- Slideshow -----------------
 /*   let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("bg-white");
            dots[i].classList.add("bg-gray-400");
        }

        slides[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].classList.remove("bg-gray-400");
        dots[slideIndex - 1].classList.add("bg-white");
    }

    setInterval(() => plusSlides(1), 5000);
*/

    let currentSlideIndex = 0;

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('bg-white', i === index);
            dots[i].classList.toggle('bg-gray-400', i !== index);
        });
        currentSlideIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function currentSlide(n) {
        showSlide(n - 1);
    }

    window.currentSlide = currentSlide; // <-- wichtig für onclick im HTML

    // Startanzeige
    showSlide(currentSlideIndex);

    // Automatisch wechseln
    setInterval(nextSlide, 5000);
    
    
    // ----------------- Mobile Menu Toggle -----------------
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });


    // ----------------- Dropdowns (Desktop + Mobile) -----------------
    
        // Desktop Dropdown
        const geschichteWrapper = document.querySelector('.desktop-geschichte-wrapper');
        const geschichteToggle = document.getElementById('geschichteDropdownToggle');
        const geschichteMenu = document.getElementById('geschichteDropdownMenu');

        geschichteToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            geschichteMenu?.classList.toggle('hidden');
        });

    // Mobile Dropdown (eindeutige Namen!)
    const mobileWrapper = document.querySelector('.mobile-geschichte-wrapper');
    const mobileToggle  = document.getElementById('mobileGeschichteToggle');
    const mobileGeschichteMenu = document.getElementById('mobileGeschichteMenu');

    mobileToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileGeschichteMenu?.classList.toggle('hidden');
    });

    window.addEventListener('click', (e) => {
        if (!geschichteWrapper?.contains(e.target)) {
            geschichteMenu?.classList.add('hidden');
        }
        if (!mobileWrapper?.contains(e.target)) {
            mobileGeschichteMenu?.classList.add('hidden');
        }
    });




    // ----------------- Galerie Modal -----------------
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const galleryImages = document.querySelectorAll(".gallery-image");

    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    document.querySelector(".close")?.addEventListener('click', function () {
        modal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) modal.style.display = "none";
    });


    // ----------------- Timeline Gallery Filter -----------------
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    timelineButtons.forEach(button => {
        button.addEventListener('click', function () {
            timelineButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-300');
            });

            this.classList.remove('bg-gray-300');
            this.classList.add('bg-indigo-600', 'text-white');

            const year = this.getAttribute('data-year');

            galleryItems.forEach(item => {
                item.style.display = (year === 'all' || item.getAttribute('data-year') === year) ? 'block' : 'none';
            });
        });
    });


    // ----------------- Quiz Funktion -----------------
    const quizQuestions = [
        {
            question: "In welchem Jahr wurde die erste Pferdebahn in Leipzig in Betrieb genommen?",
            options: ["1850", "1872", "1896", "1905"],
            answer: 1
        },
        {
            question: "Wann erfolgte die Umstellung auf elektrischen Betrieb?",
            options: ["1885", "1896", "1910", "1923"],
            answer: 1
        },
        {
            question: "Wie viele Straßenbahnlinien gibt es aktuell in Leipzig?",
            options: ["8", "13", "17", "21"],
            answer: 1
        },
        {
            question: "Welches besondere Projekt wurde 2013 eröffnet?",
            options: ["Neues Straßenbahndepot", "City-Tunnel", "Ringbahn", "Expresslinie zum Flughafen"],
            answer: 1
        },
        {
            question: "Welche Art von Straßenbahnen wurden ab 1997 in Leipzig eingeführt?",
            options: ["Doppelstockstraßenbahnen", "Niederflurstraßenbahnen", "Oberleitungsbusse", "Magnetschwebebahnen"],
            answer: 1
        }
    ];

    const quizStart = document.getElementById('quiz-start');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizResults = document.getElementById('quiz-results');
    const resultText = document.getElementById('result-text');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    let currentQuestion = 0;
    let score = 0;

    if (quizStart) {
        document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
        nextQuestionBtn?.addEventListener('click', showNextQuestion);
        restartQuizBtn?.addEventListener('click', startQuiz);
    }

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizStart.style.display = 'none';
        quizContainer.style.display = 'block';
        quizResults.style.display = 'none';
        showQuestion();
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        quizQuestion.textContent = question.question;

        const progressPercent = (currentQuestion / quizQuestions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `Frage ${currentQuestion + 1} von ${quizQuestions.length}`;

        quizOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option', 'p-3', 'border', 'border-gray-300', 'rounded-lg');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(index));
            quizOptions.appendChild(optionElement);
        });

        quizFeedback.classList.add('hidden');
    }

    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestion];
        const options = quizOptions.querySelectorAll('.quiz-option');

        options.forEach(option => option.style.pointerEvents = 'none');
        options[question.answer].classList.add('correct');

        if (selectedIndex !== question.answer) {
            options[selectedIndex].classList.add('incorrect');
        } else {
            score++;
        }

        feedbackText.textContent = selectedIndex === question.answer
            ? 'Richtig! 👍'
            : `Falsch! Die richtige Antwort ist: ${question.options[question.answer]}`;

        quizFeedback.classList.remove('hidden');
    }

    function showNextQuestion() {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';

        const percentage = Math.round((score / quizQuestions.length) * 100);
        let message;

        if (percentage === 100) {
            message = 'Perfekt! Sie kennen sich hervorragend mit der Leipziger Straßenbahn aus!';
        } else if (percentage >= 70) {
            message = 'Gut gemacht! Sie haben ein solides Wissen über die Leipziger Straßenbahn.';
        } else if (percentage >= 40) {
            message = 'Nicht schlecht! Mit etwas mehr Beschäftigung mit dem Thema können Sie noch besser werden.';
        } else {
            message = 'Vielleicht sollten Sie unsere Website noch einmal genauer studieren!';
        }

        resultText.textContent = `Sie haben ${score} von ${quizQuestions.length} Fragen richtig beantwortet (${percentage}%). ${message}`;
    }

    // Optional: Smooth Scrolling nur lokal zulassen (wenn gleiche Seite)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!document.querySelector(targetId)) return;
            e.preventDefault();
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
    });


