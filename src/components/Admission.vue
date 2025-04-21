<template>
  <div class="admission-form-container">
    <HomeButton />
    <h1>Admit a New Animal</h1>
    <p class="description">
      Use this form to register a new animal to the shelter. Please provide as much information as possible to help us provide the best care.
    </p>

    <div class="animal-summary">
      <div class="animal-image-placeholder">
        <img v-if="previewImage" :src="previewImage" :alt="form.name" />
        <div v-else class="placeholder-icon">
          <img src="/src/assets/images/paw-print.gif" alt="Paw print" />
        </div>
        <label for="image-upload" class="upload-icon">
          <span>+</span>
          <input 
            type="file" 
            id="image-upload" 
            @change="handleImageUpload" 
            accept="image/*" 
            style="display:none"
          />
        </label>
      </div>
      <div class="animal-details" v-if="previewImage">
        <p class="animal-info" v-if="form.type || form.age || form.breed">
          {{ form.type || 'Unknown' }} • {{ form.age ? form.age + ' years' : 'Age unknown' }} • {{ form.breed || 'Unknown breed' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">Animal Name*</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          required
          placeholder="Enter the animal's name"
        />
      </div>
      
      <div class="form-group">
        <label for="type">Animal Type*</label>
        <select 
          id="type" 
          v-model="form.type" 
          required
        >
          <option value="" disabled selected>Select animal type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="age">Age (years)*</label>
        <input 
          type="number" 
          id="age" 
          v-model="form.age" 
          min="0"
          step="0.1" 
          required
          placeholder="Enter animal's age in years"
        />
      </div>
      
      <div class="form-group">
        <label for="breed">Breed*</label>
        <input 
          type="text" 
          id="breed" 
          v-model="form.breed" 
          required
          placeholder="Enter animal's breed"
        />
      </div>
      
      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="form.gender">
          <option value="" disabled selected>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="health">Health Status*</label>
        <select id="health" v-model="form.health_status" required>
          <option value="" disabled selected>Select health status</option>
          <option value="Healthy">Healthy</option>
          <option value="Minor Issues">Minor Issues</option>
          <option value="Needs Treatment">Needs Treatment</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="description">Description*</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          required
          rows="4"
          placeholder="Provide details about the animal's personality, behavior, and any special needs"
        ></textarea>
      </div>
      
      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="resetForm">Cancel</button>
        <button type="submit" class="submit-btn" :disabled="isSubmitting">Register Animal</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HomeButton from './HomeButton.vue';

const API_URL = 'http://localhost:8000/api/v1';

const router = useRouter();
const previewImage = ref(null);
const error = ref(null);
const isSubmitting = ref(false);

const form = ref({
  name: '',
  type: '',
  age: null,
  breed: '',
  gender: '',
  health_status: '',  // Changed from 'health' to 'health_status' to match API
  description: '',
  image: null,
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  try {
    isSubmitting.value = true;
    error.value = null;
    
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('type', form.value.type);
    formData.append('age', form.value.age);
    formData.append('breed', form.value.breed);
    
    if (form.value.gender) {
      formData.append('gender', form.value.gender);
    }
    
    formData.append('health_status', form.value.health_status);
    formData.append('description', form.value.description);
    
    if (form.value.image) {
      formData.append('image', form.value.image);
    }
    
    console.log('Submitting to API:', `${API_URL}/animals/`);
    
    const response = await fetch(`${API_URL}/animals/`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header when sending FormData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to register animal');
    }
    
    const data = await response.json();
    console.log('Animal registered:', data);
    
    // Show success message
    alert('Animal admitted successfully!');
    
    // Reset form
    resetForm();
    
    // Optionally redirect to a list of animals or dashboard
    // router.push('/dashboard');
  } catch (err) {
    console.error('Error registering animal:', err);
    error.value = err.message || 'An error occurred while registering the animal';
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    type: '',
    age: null,
    breed: '',
    gender: '',
    health_status: '',  // Changed from 'health' to 'health_status'
    description: '',
    image: null,
  };
  previewImage.value = null;
  error.value = null;
};
</script>

<style scoped>
/* General Styles - using the same color scheme as Dashboard */
.admission-form-container {
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

/* Animal Summary Styles */
.animal-summary {
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

.animal-image-placeholder {
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

.animal-image-placeholder img {
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

.animal-details {
  flex: 1;
}

.animal-info {
  font-size: 1.2rem;
  color: #077A7D;
  font-weight: bold;
  margin: 0;
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
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #077A7D;
  box-shadow: 0 0 0 2px rgba(7, 122, 125, 0.2);
}

textarea {
  resize: vertical;
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

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .admission-form-container {
    padding: 1rem;
  }
  
  .animal-summary {
    flex-direction: column;
    text-align: center;
  }
  
  .animal-image-placeholder {
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