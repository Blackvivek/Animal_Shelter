<template>
  <div class="adoption-container">
    <HomeButton />
    <div class="page-header">
      <h1 class="page-title">Adoption Catalog</h1>
      <div class="header-underline"></div>
    </div>
    <div v-if="loading" class="loading">
      <p>Loading pets...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="adoption-cards">
      <div 
        v-for="(pet, index) in pets" 
        :key="pet.id || index" 
        class="pet-card" 
        @click="navigateToAdoptionForm(pet.id)"
      >
        <div class="pet-image-placeholder">
          <img 
            v-if="pet.image_path" 
            :src="`http://localhost:8000/${pet.image_path}`" 
            :alt="pet.name"
            @error="handleImageError($event, index)" 
          />
          <div v-else class="placeholder-icon">
            <img src="/src/assets/images/paw-print.gif" alt="Paw print" />
          </div>
          <div class="pet-info">
            <h3>{{ pet.name }}</h3>
            <p>age:{{ pet.age }}</p>
          </div>
          <div class="hover-overlay">
            <span class="adopt-button">Adopt Me</span>
          </div>
        </div>
      </div>
    </div>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Make sure to install axios: npm install axios
import HomeButton from './HomeButton.vue';

const router = useRouter();
const pets = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

// Fetch pets from API
const fetchPets = async () => {
  try {
    loading.value = true;
    // Connect to the FastAPI backend
    const response = await axios.get('http://localhost:8000/api/v1/animals/');
    
    // Filter only animals that are available for adoption
    const availableAnimals = response.data.filter(animal => !animal.is_adopted);
    
    pets.value = availableAnimals.map(pet => ({
      ...pet,
      // Make sure image_path exists
      image_path: pet.image_path || ''
    }));
    loading.value = false;
  } catch (err) {
    console.error('Error fetching pets:', err);
    error.value = 'Failed to load pets. Please try again later.';
    loading.value = false;
    
    // Fallback to local data if API fails
    pets.value = [
      {
        id: 1,
        name: "Cat",
        species: "Cat",
        age: "2 years",
        gender: "Female",
        description: "Friendly and affectionate feline looking for a loving home.",
        image_path: "/src/assets/images/catcard.png"
      },
      {
        id: 2,
        name: "Dog",
        species: "Dog",
        age: "3 years",
        gender: "Male",
        description: "Loyal and energetic companion ready for adoption.",
        image_path: ""
      },
      {
        id: 3,
        name: "Birds",
        species: "Bird",
        age: "1 year",
        gender: "Unknown",
        description: "Colorful songbirds that bring joy with their beautiful melodies.",
        image_path: ""
      },
      {
        id: 4,
        name: "Rabbit",
        species: "Rabbit",
        age: "1.5 years",
        gender: "Female",
        description: "Calm and curious bunny looking for a quiet home.",
        image_path: ""
      },
      {
        id: 5,
        name: "Turtle",
        species: "Reptile",
        age: "5 years",
        gender: "Unknown",
        description: "Gentle reptile that makes for a peaceful and low-maintenance pet.",
        image_path: ""
      }
    ];
  }
};

// Handle image loading errors
const handleImageError = (event, index) => {
  console.warn(`Image failed to load for pet at index ${index}`);
  // Set the image to empty string to show placeholder instead
  pets.value[index].image_path = '';
};

// Function to navigate to the adoption form page
const navigateToAdoptionForm = (petId) => {
  router.push(`/adoption-form/${petId}`);
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Call fetchPets when component is mounted
onMounted(fetchPets);
</script>

<style scoped>
.adoption-container {
  background-color: #F5EEDD;
  color: #06202B;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #077A7D;
}

.header-underline {
  width: 200px;
  height: 4px;
  background-color: #077A7D;
  margin: 10px auto;
}

.adoption-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 20px 0;
}

.pet-card {
  background-color: #FFFFFF;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-top: 6px solid #077A7D;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  height: 280px;
  position: relative;
}

.pet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.pet-image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #eef8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.pet-image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-icon img {
  width: 80px;
  height: 80px;
  opacity: 0.7;
}

.pet-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 15px;
  color: white;
  box-sizing: border-box;
  text-align: left;
}

.pet-info h3 {
  margin: 0 0 5px 0;
  font-weight: 600;
}

.pet-info p {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.9;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 122, 125, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adopt-button {
  background-color: #FFFFFF;
  color: #077A7D;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
}

.pet-card:hover .hover-overlay {
  opacity: 1;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
}

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
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 15px;
}

.modal-footer {
  text-align: right;
}

.modal-button {
  background-color: #077A7D;
  color: #FFFFFF;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #055A5B;
}

@media (max-width: 768px) {
  .adoption-cards {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
    padding: 10px 0;
  }
  
  .pet-card {
    height: 220px;
  }
  
  .pet-info h3 {
    font-size: 1rem;
  }
  
  .pet-info p {
    font-size: 0.8rem;
  }
}
</style>