<template>
  <div class="contact-container">
    <HomeButton />
    <h1>Contact Us</h1>
    <p class="description">
      Have questions about our shelter or the adoption process? Want to volunteer or donate? 
      We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
    </p>

    <div class="contact-section">
      <div class="contact-info">
        <div class="info-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div class="info">
            <h3>Phone</h3>
            <p>(+91) 8888888555</p>
          </div>
        </div>

        <div class="info-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="info">
            <h3>Email</h3>
            <p>info@summershelter.org</p>
          </div>
        </div>

        <div class="info-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="info">
            <h3>Address</h3>
            <p>'Summer shelter', Near Yashwant Smirti Building<br />Kasaba Bawada, Kolhapur 416006</p>
          </div>
        </div>

        <div class="info-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="info">
            <h3>We are Open for...</h3>
            <p>Monday - Friday: 9am - 5pm<br />Saturday: 10am - 3pm<br />Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h2>Send Us a Message</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name*</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Your name"
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email Address*</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="Your email address"
            />
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone"
              placeholder="Your phone number (optional)"
            />
          </div>
          
          <div class="form-group">
            <label for="subject">Subject*</label>
            <select id="subject" v-model="form.subject" required>
              <option value="" disabled selected>Select a topic</option>
              <option value="adoption">Adoption Inquiry</option>
              <option value="donation">Donation Information</option>
              <option value="volunteer">Volunteer Opportunities</option>
              <option value="foster">Foster Program</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message*</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required
              rows="5"
              placeholder="Type your message here"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeButton from './HomeButton.vue';

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const submitForm = () => {
  console.log('Form submitted:', form.value);
  alert('Thank you for your message! We will get back to you soon.');
  resetForm();
};

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };
};
</script>

<style scoped>
.contact-container {
  background-color: #F5EEDD; /* Light cream background */
  color: #06202B; /* Deep navy for text */
  padding: 2rem;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  max-width: none;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #077A7D; /* Teal for headings */
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #077A7D; /* Teal for subheadings */
}

.description {
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
}

.contact-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.info-card {
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #077A7D; /* Teal accent */
  transition: transform 0.3s, box-shadow 0.3s;
}

.info-card:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: rgba(7, 122, 125, 0.1); /* Light teal background */
  border-radius: 50%;
  margin-right: 1rem;
  color: #077A7D; /* Teal icon color */
}

.info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: #077A7D; /* Teal for titles */
}

.info p {
  margin: 0;
  line-height: 1.5;
}

.contact-form {
  flex: 1;
  min-width: 300px;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #06202B;
}

input, select, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #06202B;
  font-family: inherit;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #077A7D;
  box-shadow: 0 0 0 2px rgba(7, 122, 125, 0.2);
}

textarea {
  resize: vertical;
}

.submit-btn {
  background-color: #077A7D;
  color: #F5EEDD;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #06202B;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-container {
    padding: 1rem;
  }
  
  .contact-section {
    flex-direction: column;
  }
  
  .info-card {
    padding: 1rem;
  }
}
</style>