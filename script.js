const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn') || e.target.closest('.social-btn')) {
        const target = e.target.classList.contains('btn') ? e.target : e.target.closest('.social-btn');
        
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        target.appendChild(ripple);
        
        setTimeout(() => { ripple.remove(); }, 600);
    }
});

const sections = document.querySelectorAll('.section');
const navLi = document.querySelectorAll('.sidebar ul li');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

navLi.forEach(li => {
    li.addEventListener('click', () => {
        sidebar.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});


const portfolioForm = document.getElementById('portfolio-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

portfolioForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(portfolioForm);

    try {
        const response = await fetch("https://formspree.io/f/xbdwjrvw", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            portfolioForm.style.display = "none";
            formStatus.style.display = "block";
            portfolioForm.reset();
        } else {
            alert("Submission failed. Try again.");
        }
    } catch (error) {
        alert("Error connecting to server.");
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
});

function resetForm() {
    formStatus.style.display = "none";
    portfolioForm.style.display = "block";
}