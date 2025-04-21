<template>
  <div class="adoption-container">
    <HomeButton />
    <div class="page-header">
      <h1 class="page-title">Adopted Animals</h1>
      <div class="header-underline"></div>
    </div>
    <div v-if="loading" class="loading">
      <p>Loading adopted pets...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="adoption-cards">
      <div 
        v-for="(pet, index) in pets" 
        :key="pet.id || index" 
        class="pet-card"
        @click="showPetDetails(pet)"
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
            <p>age: {{ pet.age }}</p>
          </div>
          <div class="adopted-badge">
            <span>Adopted</span>
          </div>
        </div>
        <div class="owner-info" v-if="pet.owner">
          <h4>Proud Owner:</h4>
          <p>{{ pet.owner.full_name }}</p>
          <p class="adoption-date">Since: {{ formatDate(pet.adoption_date) }}</p>
          <div class="view-more">Click for details</div>
        </div>
        <div class="owner-info" v-else>
          <p class="no-owner-data">Owner information not available</p>
        </div>
      </div>
    </div>

    <!-- Detail Modal Component -->
    <div v-if="selectedPet" class="modal-overlay" @click="closeDetailModal">
      <div class="detail-modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedPet.name }}'s Adoption Details</h3>
          <button class="close-button" @click="closeDetailModal">&times;</button>
        </div>
        <div class="detail-modal-body">
          <div class="detail-pet-info">
            <div class="detail-image-container">
              <img 
                v-if="selectedPet.image_path" 
                :src="`http://localhost:8000/${selectedPet.image_path}`" 
                :alt="selectedPet.name" 
                class="detail-pet-image"
              />
              <div v-else class="detail-placeholder">
                <img src="/src/assets/images/paw-print.gif" alt="Paw print" />
              </div>
            </div>
            <div class="detail-pet-data">
              <h4>Pet Information</h4>
              <p><strong>Name:</strong> {{ selectedPet.name }}</p>
              <p><strong>Type:</strong> {{ selectedPet.type }}</p>
              <p><strong>Breed:</strong> {{ selectedPet.breed }}</p>
              <p><strong>Age:</strong> {{ selectedPet.age }} years</p>
              <p><strong>Gender:</strong> {{ selectedPet.gender || 'Unknown' }}</p>
              <p v-if="selectedPet.description"><strong>Description:</strong> {{ selectedPet.description }}</p>
            </div>
          </div>
          
          <div class="owner-details" v-if="selectedPet.owner">
            <h4>Owner Information</h4>
            <div class="owner-details-grid">
              <div class="owner-detail-item">
                <p><strong>Name:</strong> {{ selectedPet.owner.full_name }}</p>
                <p v-if="selectedPet.owner.email"><strong>Email:</strong> {{ selectedPet.owner.email }}</p>
                <p v-if="selectedPet.owner.phone"><strong>Phone:</strong> {{ selectedPet.owner.phone }}</p>
              </div>
              <div class="owner-detail-item">
                <p v-if="selectedPet.owner.address"><strong>Address:</strong> {{ selectedPet.owner.address }}</p>
                <p><strong>Adoption Date:</strong> {{ formatDate(selectedPet.adoption_date) }}</p>
              </div>
            </div>
            <div class="adoption-story" v-if="selectedPet.owner.adoption_reason">
              <h4>Adoption Story</h4>
              <p>{{ selectedPet.owner.adoption_reason }}</p>
            </div>
          </div>
          <div class="no-owner-details" v-else>
            <p>Detailed owner information is not available for this adoption.</p>
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
import axios from 'axios';
import HomeButton from './HomeButton.vue';

const pets = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const selectedPet = ref(null);

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Show pet details modal
const showPetDetails = (pet) => {
  selectedPet.value = pet;
  
  // If we don't already have detailed owner info, try to fetch it
  if (pet.owner && !pet.owner.address && pet.owner.email) {
    fetchDetailedOwnerInfo(pet);
  }
};

// Fetch detailed owner information
const fetchDetailedOwnerInfo = async (pet) => {
  try {
    // If we already have the detailed data, don't fetch again
    if (pet.owner.address) return;
    
    const adoptionResponse = await axios.get(`http://localhost:8000/api/v1/adoptions/`, {
      params: {
        animal_id: pet.id
      }
    });
    
    if (adoptionResponse.data && adoptionResponse.data.length > 0) {
      const adoption = adoptionResponse.data[0];
      
      // Update the pet object with more owner details
      pet.owner = {
        ...pet.owner,
        phone: adoption.phone,
        address: adoption.address,
        housing_situation: adoption.housing_situation,
        adoption_reason: adoption.adoption_reason
      };
      
      // Update the selected pet to refresh the UI
      selectedPet.value = { ...pet };
    }
  } catch (err) {
    console.error(`Error fetching detailed adoption info for pet ${pet.id}:`, err);
  }
};

// Close the detail modal
const closeDetailModal = () => {
  selectedPet.value = null;
};

// Fetch adopted pets from API
const fetchAdoptedPets = async () => {
  try {
    loading.value = true;
    // Connect to the FastAPI backend and specifically get adopted animals
    const response = await axios.get('http://localhost:8000/api/v1/animals/', {
      params: {
        is_adopted: true
      }
    });
    
    if (response.data.length === 0) {
      // No adopted pets found
      error.value = 'No adopted animals found. Check back soon!';
      loading.value = false;
      return;
    }
    
    // Process the list of adopted animals
    const adoptedAnimals = response.data;

    // For each adopted animal, try to fetch adoption details
    let animalsWithOwners = await Promise.all(adoptedAnimals.map(async (pet) => {
      try {
        // Fetch adoptions for this animal
        const adoptionResponse = await axios.get(`http://localhost:8000/api/v1/adoptions/`, {
          params: {
            animal_id: pet.id
          }
        });
        
        // If there are any adoptions, use the first one's details (should only be one)
        if (adoptionResponse.data && adoptionResponse.data.length > 0) {
          const adoption = adoptionResponse.data[0];
          return {
            ...pet,
            owner: {
              full_name: adoption.full_name,
              email: adoption.email
            },
            adoption_date: adoption.created_at
          };
        }
        
        // No adoption details found
        return {
          ...pet,
          owner: null,
          adoption_date: null
        };
      } catch (err) {
        console.error(`Error fetching adoption details for animal ${pet.id}:`, err);
        return {
          ...pet,
          owner: null,
          adoption_date: null
        };
      }
    }));

    // Sort animals by adoption date, most recent first
    // Animals without adoption dates will be placed at the end
    animalsWithOwners = animalsWithOwners.sort((a, b) => {
      if (!a.adoption_date) return 1;
      if (!b.adoption_date) return -1;
      return new Date(b.adoption_date) - new Date(a.adoption_date);
    });

    pets.value = animalsWithOwners;
    loading.value = false;
  } catch (err) {
    console.error('Error fetching adopted animals:', err);
    error.value = 'Failed to load adopted animals. Please try again later.';
    loading.value = false;
    
    // Fallback to local data if API fails
    pets.value = [
      {
        id: 101,
        name: "Rex",
        type: "Dog",
        age: 4,
        breed: "German Shepherd",
        gender: "Male",
        description: "Rex found his forever home with a loving family.",
        image_path: "",
        owner: {
          full_name: "John Smith",
          email: "john@example.com",
          phone: "(555) 123-4567",
          address: "123 Main St, Anytown, USA",
          adoption_reason: "We fell in love with Rex's playful spirit and loyalty. He's the perfect addition to our active family."
        },
        adoption_date: "2025-03-15T10:30:00Z"
      },
      {
        id: 102,
        name: "Luna",
        type: "Cat",
        age: 2,
        breed: "Maine Coon",
        gender: "Female",
        description: "Luna was adopted by a wonderful family who adores her.",
        image_path: "",
        owner: {
          full_name: "Emily Johnson",
          email: "emily@example.com",
          phone: "(555) 987-6543",
          address: "456 Oak Ave, Somewhere, USA",
          adoption_reason: "Luna's calm demeanor and beautiful coat caught our attention immediately. She's now the queen of our household."
        },
        adoption_date: "2025-02-20T14:15:00Z"
      },
      {
        id: 103,
        name: "Charlie",
        type: "Bird",
        age: 1,
        breed: "Cockatiel",
        gender: "Male",
        description: "Charlie now enjoys singing for his new family.",
        image_path: "",
        owner: null,
        adoption_date: null
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

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Call fetchAdoptedPets when component is mounted
onMounted(fetchAdoptedPets);
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 20px 0;
}

.pet-card {
  background-color: #FFFFFF;
  overflow: hidden;
  border-top: 6px solid #077A7D;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.pet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.pet-image-placeholder {
  width: 100%;
  height: 200px;
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

.adopted-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e67e22;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: bold;
}

.owner-info {
  padding: 15px;
  border-top: 1px solid #eee;
  position: relative;
}

.owner-info h4 {
  margin: 0 0 10px 0;
  color: #077A7D;
  font-size: 1em;
}

.owner-info p {
  margin: 5px 0;
  font-size: 0.9em;
}

.view-more {
  margin-top: 10px;
  font-size: 0.8em;
  color: #077A7D;
  text-align: center;
  font-style: italic;
}

.adoption-date {
  color: #777;
  font-size: 0.8em !important;
  font-style: italic;
  margin-top: 8px !important;
}

.no-owner-data {
  color: #999;
  font-style: italic;
  text-align: center;
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

.modal-content, .detail-modal-content {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
  width: 90%;
  max-width: 400px;
}

.detail-modal-content {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #077A7D;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #d32f2f;
}

.modal-body, .detail-modal-body {
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

/* Detail modal specific styles */
.detail-pet-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.detail-image-container {
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #eef8f8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-placeholder img {
  width: 100px;
  height: 100px;
  opacity: 0.7;
}

.detail-pet-data {
  flex: 1;
  min-width: 250px;
}

.detail-pet-data h4, .owner-details h4 {
  color: #077A7D;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.detail-pet-data p, .owner-details p {
  margin: 8px 0;
}

.owner-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.owner-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.adoption-story {
  margin-top: 20px;
}

.no-owner-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .adoption-cards {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
    padding: 10px 0;
  }
  
  .pet-image-placeholder {
    height: 180px;
  }
  
  .pet-info h3 {
    font-size: 1rem;
  }
  
  .pet-info p {
    font-size: 0.8rem;
  }
  
  .detail-pet-info {
    flex-direction: column;
    align-items: center;
  }
  
  .detail-image-container {
    width: 200px;
    height: 200px;
  }
}
</style>