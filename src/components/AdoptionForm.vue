<template>
  <div class="adoption-form-container">
    <HomeButton />
    <h1>Adoption Application</h1>
    <p class="description">
      Thank you for your interest in adopting a pet from SummerShelter! Please fill out this form, and our team will contact you shortly to discuss the next steps in the adoption process.
    </p>

    <div class="pet-summary" v-if="pet">
      <div class="pet-image-placeholder">
        <img v-if="pet.image_path" :src="`http://localhost:8000/${pet.image_path}`" :alt="pet.name" />
        <div v-else class="placeholder-icon">
          <img src="/src/assets/images/paw-print.gif" alt="Paw print" />
        </div>
      </div>
      <div class="pet-details">
        <h2 class="pet-name">{{ pet.name || 'Unknown Pet' }}</h2>
        <p class="pet-info">{{ pet.breed || 'Unknown' }} • {{ pet.age || 'Unknown' }} • {{ pet.gender || 'Unknown' }}</p>
        <p class="pet-description" v-if="pet.description">{{ pet.description }}</p>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="fullName">Full Name*</label>
        <input 
          type="text" 
          id="fullName" 
          v-model="formData.full_name" 
          required
          placeholder="Your full name"
          :class="{ 'error': validationErrors.full_name }"
          @blur="validateFullName"
        >
        <p v-if="validationErrors.full_name" class="error-message">{{ validationErrors.full_name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Email Address*</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          required
          placeholder="Your email address"
          :class="{ 'error': validationErrors.email }"
          @blur="validateEmail"
        >
        <p v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</p>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number*</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          required
          placeholder="Your phone number"
          :class="{ 'error': validationErrors.phone }"
          @input="handlePhoneInput"
          @blur="validatePhone"
        >
        <p v-if="validationErrors.phone" class="error-message">{{ validationErrors.phone }}</p>
      </div>

      <div class="form-group">
        <label for="address">Home Address*</label>
        <textarea 
          id="address" 
          v-model="formData.address" 
          required
          placeholder="Your complete home address"
          rows="3"
          :class="{ 'error': validationErrors.address }"
          @blur="validateAddress"
        ></textarea>
        <p v-if="validationErrors.address" class="error-message">{{ validationErrors.address }}</p>
      </div>

      <div class="form-group">
        <label for="housing">Housing Situation*</label>
        <select 
          id="housing" 
          v-model="formData.housing_situation" 
          required 
          :class="{ 'error': validationErrors.housing_situation }"
          @change="validateHousingSituation"
        >
          <option value="" disabled selected>Select your housing type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Mobile Home">Mobile Home</option>
          <option value="Other">Other</option>
        </select>
        <p v-if="validationErrors.housing_situation" class="error-message">{{ validationErrors.housing_situation }}</p>
      </div>

      <div class="form-group">
        <label for="ownRent">Do you own or rent your home?*</label>
        <select 
          id="ownRent" 
          v-model="formData.home_ownership" 
          required
          :class="{ 'error': validationErrors.home_ownership }"
          @change="validateHomeOwnership"
        >
          <option value="" disabled selected>Select option</option>
          <option value="Own">Own</option>
          <option value="Rent">Rent</option>
          <option value="Other">Other</option>
        </select>
        <p v-if="validationErrors.home_ownership" class="error-message">{{ validationErrors.home_ownership }}</p>
      </div>

      <div class="form-group">
        <label for="otherPets">Do you have other pets?</label>
        <div class="checkbox-container">
          <input 
            type="checkbox" 
            id="otherPets" 
            v-model="formData.has_other_pets"
          />
          <label for="otherPets" class="checkbox-label">Yes, I have other pets</label>
        </div>
      </div>

      <div class="form-group" v-if="formData.has_other_pets">
        <label for="petExperience">Tell us about your other pets</label>
        <textarea 
          id="petExperience" 
          v-model="formData.previous_pet_experience"
          placeholder="Please list and describe your current pets"
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="reason">Why do you want to adopt this pet?*</label>
        <textarea 
          id="reason" 
          v-model="formData.adoption_reason" 
          required
          placeholder="Tell us why you're interested in adopting this specific pet"
          rows="4"
          :class="{ 'error': validationErrors.adoption_reason }"
          @blur="validateAdoptionReason"
        ></textarea>
        <p v-if="validationErrors.adoption_reason" class="error-message">{{ validationErrors.adoption_reason }}</p>
      </div>

      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="goBack">Cancel</button>
        <button type="submit" class="submit-btn">Submit Application</button>
      </div>
    </form>

    <!-- Custom Modal Component -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <p>{{ modalMessage }}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'; // Make sure axios is installed
import HomeButton from './HomeButton.vue';

const route = useRoute();
const router = useRouter();
const petId = ref(null);
const pet = ref(null);
const loading = ref(true);
const error = ref(null);

// Modal state
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

// Form data
const formData = ref({
  full_name: '',
  email: '',
  phone: '',
  address: '',
  housing_situation: '',
  home_ownership: '',
  has_other_pets: false,
  previous_pet_experience: '',
  adoption_reason: '',
  animal_id: null
});

// Validation states
const validationErrors = ref({
  full_name: '',
  email: '',
  phone: '',
  address: '',
  housing_situation: '',
  home_ownership: '',
  adoption_reason: ''
});

// Validation rules
const validateFullName = () => {
  if (formData.value.full_name.trim().length < 3) {
    validationErrors.value.full_name = 'Name must be at least 3 characters';
    return false;
  } else if (formData.value.full_name.trim().length > 100) {
    validationErrors.value.full_name = 'Name must not exceed 100 characters';
    return false;
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(formData.value.full_name)) {
    validationErrors.value.full_name = 'Name should contain only letters, spaces, hyphens, apostrophes and periods';
    return false;
  }
  validationErrors.value.full_name = '';
  return true;
};

const validateEmail = () => {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!emailRegex.test(formData.value.email)) {
    validationErrors.value.email = 'Please enter a valid email address';
    return false;
  }
  validationErrors.value.email = '';
  return true;
};

const validatePhone = () => {
  // Allow common phone formats like (XXX) XXX-XXXX, XXX-XXX-XXXX, etc.
  const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  
  if (!phoneRegex.test(formData.value.phone)) {
    validationErrors.value.phone = 'Please enter a valid phone number';
    return false;
  }
  validationErrors.value.phone = '';
  return true;
};

const validateAddress = () => {
  if (formData.value.address.trim().length < 10) {
    validationErrors.value.address = 'Please enter your full address (at least 10 characters)';
    return false;
  }
  validationErrors.value.address = '';
  return true;
};

const validateHousingSituation = () => {
  if (!formData.value.housing_situation) {
    validationErrors.value.housing_situation = 'Please select your housing situation';
    return false;
  }
  validationErrors.value.housing_situation = '';
  return true;
};

const validateHomeOwnership = () => {
  if (!formData.value.home_ownership) {
    validationErrors.value.home_ownership = 'Please select your home ownership status';
    return false;
  }
  validationErrors.value.home_ownership = '';
  return true;
};

const validateAdoptionReason = () => {
  if (formData.value.adoption_reason.trim().length < 20) {
    validationErrors.value.adoption_reason = 'Please provide a more detailed reason (at least 20 characters)';
    return false;
  }
  validationErrors.value.adoption_reason = '';
  return true;
};

// Combined validation function
const validateForm = () => {
  return (
    validateFullName() &&
    validateEmail() &&
    validatePhone() &&
    validateAddress() &&
    validateHousingSituation() &&
    validateHomeOwnership() &&
    validateAdoptionReason()
  );
};

// Auto-format phone number as user types
const formatPhoneNumber = (value) => {
  // Strip all non-numeric characters
  const phoneDigits = value.replace(/\D/g, '');
  
  // Format based on length
  if (phoneDigits.length <= 3) {
    return phoneDigits;
  } else if (phoneDigits.length <= 6) {
    return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3)}`;
  } else {
    return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;
  }
};

// Handle phone input changes
const handlePhoneInput = (event) => {
  const formattedPhone = formatPhoneNumber(event.target.value);
  formData.value.phone = formattedPhone;
};

onMounted(() => {
  // Get pet ID from route parameter
  petId.value = parseInt(route.params.id);
  formData.value.animal_id = petId.value;
  
  // Fetch pet data from API
  fetchPet();
});

const fetchPet = async () => {
  loading.value = true;
  try {
    // Fetch pet details from the API
    const response = await axios.get(`http://localhost:8000/api/v1/animals/${petId.value}`);
    pet.value = response.data;
    
    // Set fallback values for any missing data
    if (!pet.value.name) pet.value.name = 'Unknown Pet';
    if (!pet.value.species) pet.value.species = 'Unknown';
    if (!pet.value.age) pet.value.age = 'Unknown';
    if (!pet.value.gender) pet.value.gender = 'Unknown';
    if (!pet.value.image_path) pet.value.image_path = '';
    
    loading.value = false;
  } catch (err) {
    console.error('Error fetching pet details:', err);
    error.value = 'Failed to load pet details. Using sample data instead.';
    loading.value = false;
    
    // Fallback to sample data if API call fails
    pet.value = {
      id: petId.value,
      name: "Sample Pet",
      species: "Unknown",
      age: "Unknown",
      gender: "Unknown",
      description: "No details available for this pet.",
      image_path: ""
    };
  }
};

// Show modal with message
const showModalMessage = (title, message) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  try {
    // Validate the form before submitting
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Make sure the fields match the backend's expected schema
    const adoptionData = {
      full_name: formData.value.full_name,
      email: formData.value.email,
      phone: formData.value.phone,
      address: formData.value.address,
      housing_situation: formData.value.housing_situation,
      home_ownership: formData.value.home_ownership,
      has_other_pets: formData.value.has_other_pets,
      previous_pet_experience: formData.value.previous_pet_experience || null,
      adoption_reason: formData.value.adoption_reason,
      animal_id: formData.value.animal_id
    };
    
    console.log("Submitting adoption data:", adoptionData);
    
    // Submit adoption application to backend
    const response = await axios.post('http://localhost:8000/api/v1/adoptions/', adoptionData);
    
    console.log("Submission successful:", response.data);
    showModalMessage('Application Submitted', 'Thank you for your application!');
    
    // Navigate after a short delay to allow the user to read the message
    setTimeout(() => {
      router.push('/adoption');
    }, 2000);
  } catch (err) {
    console.error('Error submitting adoption form:', err.response?.data || err.message);
    showModalMessage('Error', 'There was an error submitting your application. Please try again.');
  }
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* General Styles - using the same color scheme as Dashboard */
.adoption-form-container {
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

.description {
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Pet Summary Styles */
.pet-summary {
  display: flex;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.pet-image-placeholder {
  width: 120px;
  height: 120px;
  background-color: #eef8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.5rem;
  flex-shrink: 0;
  position: relative; /* For positioning the upload icon */
}

.pet-image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-icon img {
  width: 50px;
  height: 50px;
  opacity: 0.7;
}

.upload-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  background-color: #077A7D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 10; /* Ensure the button is always on top */
}

.upload-icon:hover {
  background-color: #06202B;
  transform: scale(1.1);
}

.pet-details {
  flex: 1;
}

.pet-name {
  font-size: 1.5rem;
  color: #06202B;
  margin: 0 0 0.5rem 0;
}

.pet-info {
  font-size: 1.2rem;
  color: #077A7D;
  font-weight: bold;
  margin: 0;
}

.pet-description {
  font-size: 1rem;
  color: #06202B;
  margin-top: 0.5rem;
}

/* Form Styles */
.form {
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
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
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* Error state styling */
input.error, select.error, textarea.error {
  border-color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.05);
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  display: block;
  font-weight: 500;
  padding-left: 0.2rem;
  animation: errorFadeIn 0.3s ease-in-out;
}

@keyframes errorFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #077A7D;
  box-shadow: 0 0 0 2px rgba(7, 122, 125, 0.2);
}

/* Error focus state */
input.error:focus, select.error:focus, textarea.error:focus {
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

textarea {
  resize: vertical;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-label {
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #06202B;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background-color: #077A7D;
  color: #F5EEDD;
  border: none;
}

.submit-btn:hover {
  background-color: #06202B;
}

.cancel-btn {
  background-color: transparent;
  color: #06202B;
  border: 1px solid #06202B;
}

.cancel-btn:hover {
  background-color: #F5EEDD;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  font-size: 1.5rem;
  color: #06202B;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #06202B;
  cursor: pointer;
}

.modal-body {
  font-size: 1rem;
  color: #06202B;
  margin-bottom: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-button {
  background-color: #077A7D;
  color: #F5EEDD;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-button:hover {
  background-color: #06202B;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .adoption-form-container {
    padding: 1rem;
  }
  
  .pet-summary {
    flex-direction: column;
    text-align: center;
  }
  
  .pet-image-placeholder {
    margin: 0 auto 1rem auto;
  }
  
  .form-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  button {
    width: 100%;
  }
}
</style>