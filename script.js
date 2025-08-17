// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll Section Active Link + Animations
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active Nav Link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            
            // Section Animation
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky Header
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Close Mobile Menu on Scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// FormSubmit Integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading State
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit to FormSubmit
        const formAction = this.action;
        const formData = new FormData(this);
        
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Redirect to thank-you page (defined in FormSubmit's _next)
                return response;
            }
            throw new Error('Form submission failed');
        })
        .catch(error => {
            alert('Error: ' + error.message);
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}
