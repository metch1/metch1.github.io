document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (no hack, just simple also real!!)
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation link
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate skill bars when they on scene (progress load animation)
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = `New message from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:metchi.service@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            window.location.href = mailtoLink;

            alert('Thank you for your message! Your email client will open to send the message.');
        });
    }

     //  Portfolio View Counter (CountAPI)
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
        fetch('https://api.countapi.xyz/hit/metchi-portfolio/visits')
            .then(response => response.json())
            .then(data => {
                viewCountElement.textContent = data.value;
            })
            .catch(() => {
                viewCountElement.textContent = "Error";
            });
    }

});

// i'm not a javascript developer please don't judge my code :D 
// vsc was my only friend while coding this :)
// i wish i can learn more and become a pro one day and sell my own scripts :D
