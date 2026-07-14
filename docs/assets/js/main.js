document.addEventListener('DOMContentLoaded', () => {
  // 1. WhatsApp Configuration
  const WHATSAPP_NUMBER = '8618888888888'; // 显眼的临时号，前缀国家代码(如86为中国)
  const WHATSAPP_WELCOME_MSG = 'Hello AROMAMATRIX, I am interested in your perfume OEM/ODM services and would like to get a quote and samples.';

  // 2. Inject Shared Floating WhatsApp Button
  renderWhatsAppFloat(WHATSAPP_NUMBER, WHATSAPP_WELCOME_MSG);

  // 3. Initialize Interactive Components
  initMobileMenu();
  highlightActiveNav();
  initAccordion();
  initInquiryForm(WHATSAPP_NUMBER);
});

/**
 * Renders the WhatsApp Floating Button
 */
function renderWhatsAppFloat(number, msg) {
  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${number}?text=${encodedMsg}`;
  
  const waBtn = document.createElement('a');
  waBtn.href = waUrl;
  waBtn.className = 'whatsapp-float';
  waBtn.target = '_blank';
  waBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
  waBtn.innerHTML = `
    <svg viewBox="0 0 448 512">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  `;
  
  document.body.appendChild(waBtn);
}

/**
 * Moblie Toggle Menu
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggleBtn.classList.toggle('active');
      
      // Animate toggle bars
      const spans = toggleBtn.querySelectorAll('span');
      if (toggleBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when link is clicked
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        toggleBtn.querySelector('span:nth-child(2)').style.opacity = '1';
      });
    });
  }
}

/**
 * Highlights Active Nav Link
 */
function highlightActiveNav() {
  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';
  const cleanPageName = pageName.replace('.html', '');
  
  // Highlight matching id
  const activeLink = document.getElementById(`nav-${cleanPageName}`);
  if (activeLink) {
    activeLink.classList.add('active');
  } else if (cleanPageName === 'blog-detail') {
    // If we're on blog-detail.html, highlight blog
    const blogLink = document.getElementById('nav-blog');
    if (blogLink) blogLink.classList.add('active');
  } else {
    // Default to home
    const homeLink = document.getElementById('nav-index');
    if (homeLink) homeLink.classList.add('active');
  }
}

/**
 * Accordion (For Q&A page)
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      
      // Close other accordions
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
        h.nextElementSibling.style.paddingBottom = '0px';
      });
      
      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px'; // add padding offset
        content.style.paddingBottom = '20px';
      }
    });
  });
}

/**
 * Handles B2B Inquiry Form submission and routes to WhatsApp
 */
function initInquiryForm(waNumber) {
  const inquiryForm = document.getElementById('inquiry-form');
  if (!inquiryForm) return;

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Extract Form Data
    const name = document.getElementById('inquiry-name')?.value || '';
    const email = document.getElementById('inquiry-email')?.value || '';
    const company = document.getElementById('inquiry-company')?.value || 'Not Specified';
    const country = document.getElementById('inquiry-country')?.value || 'Not Specified';
    const quantity = document.getElementById('inquiry-qty')?.value || 'Not Specified';
    
    // Services
    let serviceTypes = [];
    document.querySelectorAll('input[name="service"]:checked').forEach(checkbox => {
      serviceTypes.push(checkbox.value);
    });
    const servicesStr = serviceTypes.length > 0 ? serviceTypes.join(', ') : 'Not Specified';
    
    const requirements = document.getElementById('inquiry-details')?.value || '';

    // 2. Format a professional WhatsApp message
    const boldLine = '--------------------------------------------';
    const waText = 
`💼 *New Inquiry for AROMAMATRIX Factory*
${boldLine}
👤 *Name:* ${name}
📧 *Email:* ${email}
🏢 *Company:* ${company}
🌍 *Country:* ${country}
📦 *Est. Quantity:* ${quantity}
🛠️ *Service Interest:* ${servicesStr}
📝 *Requirements:*
"${requirements}"
${boldLine}
_Submitted via website portal._`;

    // 3. Open WhatsApp Link
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
    
    // Show success dialog before redirecting
    showFormSuccessPopup(() => {
      window.open(waUrl, '_blank');
    });
  });
}

/**
 * Creates and shows a premium success modal
 */
function showFormSuccessPopup(callback) {
  const modal = document.createElement('div');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'inquiry-modal-title');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0, 0, 0, 0.85)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';
  
  modal.innerHTML = `
    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 36px; text-align: center; max-width: 450px; width: 90%; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);">
      <div style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #25d366; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; color: #25d366; font-size: 30px;">✓</div>
      <h3 id="inquiry-modal-title" style="font-family: var(--font-title); font-size: 22px; margin-bottom: 12px; color: #111111;">Your Inquiry Is Ready</h3>
      <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px; line-height: 1.65;">
        Nothing has been sent yet. Continue to <strong>WhatsApp</strong> to deliver the prepared inquiry to the factory sales team.
      </p>
      <button id="modal-wa-btn" class="btn btn-gold" style="width: 100%; display: flex; gap: 10px; align-items: center; justify-content: center; background: #25d366; color:#fff; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
        Continue to WhatsApp
      </button>
      <button id="modal-cancel-btn" type="button" style="margin-top: 14px; padding: 6px 12px; border: 0; background: transparent; color: #6b7280; font-size: 12px; cursor: pointer;">Cancel</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fade in
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
  
  const proceedBtn = modal.querySelector('#modal-wa-btn');
  const cancelBtn = modal.querySelector('#modal-cancel-btn');
  proceedBtn.focus();

  const closeModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  };

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  proceedBtn.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 300);
  });
}
