<template>
  <div class="dashboard" :class="{ 'sidebar-hidden': isLeftSidebarCollapsed }">
    <!-- Left Sidebar Toggle Button -->
    <button class="sidebar-toggle left-toggle" @click="toggleLeftSidebar">
      <img src="/src/assets/images/menu-of-three-lines.png" alt="Toggle Left Sidebar" />
    </button>

    <!-- Left Sidebar -->
    <aside class="sidebar left-sidebar" :class="{ 'sidebar-collapsed': isLeftSidebarCollapsed }">
      <div class="sidebar-content">
        <ul>
          <li>
            <router-link to="/admission">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Admission</span>
            </router-link>
          </li>
          <li>
            <router-link to="/adoption">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 16l-6-6 6-6"></path>
                <path d="M20 21v-7a4 4 0 0 0-4-4H4"></path>
              </svg>
              <span>Adoption</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span>About Us</span>
            </router-link>
          </li>
          <li>
            <router-link to="/contact">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Contact</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="content" :class="{ 'expanded': isLeftSidebarCollapsed }">
      <section id="about" class="about-section">
        <h2>Welcome to SummerShelter</h2>
        <p>
          SummerShelter is a haven for animals in need. We are dedicated to providing a safe and loving environment for
          animals until they find their forever homes. Our mission is to rescue, rehabilitate, and rehome animals while
          promoting awareness and education about animal welfare in the community.
        </p>
        <p>
          Founded in 2018, our shelter has helped over 2,000 animals find loving homes. Our dedicated team of veterinarians, 
          animal behaviorists, and passionate volunteers work tirelessly to ensure each animal receives personalized care
          and attention. We offer comprehensive medical services, behavior training, and socialization programs to prepare
          our animals for successful adoptions.
        </p>
        <p>
          SummerShelter also actively participates in community outreach programs, hosting educational workshops about responsible
          pet ownership, spay/neuter initiatives, and wildlife conservation. Through our "Summer Paws" program, we connect with
          local schools to teach children about animal care, compassion, and the importance of protecting all living creatures.
          Join us in our mission to create a world where every animal has a safe place to call home.
        </p>
      </section>

      <!-- Cards Section -->
      <div class="cards">
        <div class="card">
          <img src="/src/assets/images/allanimals.jpg" alt="Total Animals" />
          <h3>Total Animals</h3>
          <p>300</p>
        </div>
        <div class="card">
          <img src="/src/assets/images/summershelter.jpg" alt="New Admissions" />
          <h3>New Admissions</h3>
          <p>50</p>
        </div>
        <div class="card clickable" @click="navigateToAdoption">
          <img src="/src/assets/images/adpotion.png" alt="Adopted Animals" />
          <h3>Adopted Animals</h3>
          <p>120</p>
        </div>
        <div class="card">
          <img src="/src/assets/images/animalrescue.png" alt="Rescued Animals" />
          <h3>Rescued Animals</h3>
          <p>150</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Sidebar toggle state - starting with sidebar collapsed
const isLeftSidebarCollapsed = ref(true);

// Toggle function
const toggleLeftSidebar = () => {
  isLeftSidebarCollapsed.value = !isLeftSidebarCollapsed.value;
};

// Function to navigate to the adoption page
const navigateToAdoption = () => {
  router.push('/adoption');
};
</script>

<style scoped>
/* General Styles */
body {
  margin: 0;
  background-color: #F5EEDD; /* Light cream background */
  color: #06202B; /* Deep navy for text */
  font-family: "Roboto", sans-serif;
}

.dashboard {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden; /* Prevent any overflow causing white space */
}

/* Sidebar Styles */
.sidebar {
  background-color: #06202B; /* Deep navy for sidebar */
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: 100;
  position: fixed; /* Change to fixed positioning */
  height: 100vh; /* Full height */
  top: 0;
  left: 0;
}

.left-sidebar {
  width: 250px;
}

.sidebar-collapsed.left-sidebar {
  transform: translateX(-250px);
  width: 0; /* Make the sidebar take no space when collapsed */
}

.sidebar-content {
  padding-top: 60px; /* Increased padding at top for more space below toggle button */
  padding: auto; /* Create space between toggle button and sidebar options */
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 2rem;
  padding-left: 1rem;
  position: relative;
  transition: transform 0.2s ease, padding-left 0.2s ease;
}

.sidebar li:hover {
  transform: translateX(5px);
  padding-left: 1.5rem;
}

.sidebar a {
  text-decoration: none;
  color: #7AE2CF; /* Light mint for links */
  font-weight: bold;
  font-size: 1.2rem; /* Increased from default to 1.2rem */
  transition: color 0.3s, text-shadow 0.3s;
  display: flex; /* Changed to flex to align icon and text */
  align-items: center; /* Vertical alignment */
  padding: 0.5rem 0; /* Add vertical padding to links */
}

.sidebar a svg {
  margin-right: 12px; /* Space between icon and text */
  min-width: 20px; /* Ensure icon has consistent width */
}

.sidebar a span {
  flex: 1; /* Allow text to take remaining space */
}

.sidebar a:hover {
  color: #F5EEDD; /* Light cream on hover */
  text-shadow: 0 0 8px rgba(122, 226, 207, 0.5);
}

/* Toggle Button Styles */
.sidebar-toggle {
  position: fixed; /* Changed to fixed to ensure it's always visible */
  z-index: 200;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #077A7D;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.sidebar-toggle:hover {
  background-color: #06202B;
}

.sidebar-toggle img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1); /* Makes icon white */
}

.left-toggle {
  top: 20px;
  left: 10px; /* Changed from 20px to 10px to move button more to the left */
}

/* Main Content Styles */
.content {
  flex: 1;
  padding: 2rem;
  background-color: #F5EEDD; /* Light cream for main content */
  overflow-y: auto;
  padding-top: 70px; /* Make space for the toggle button */
  transition: margin-left 0.3s ease;
  margin-left: 0; /* Start with no margin since sidebar is collapsed by default */
  min-height: 100vh; /* Ensure full height */
  box-sizing: border-box; /* Include padding in width/height calculations */
  width: 100%; /* Take full width by default */
}

/* Content adjusts when sidebar is expanded */
.content:not(.expanded) {
  margin-left: 250px; /* Only add margin when sidebar is visible */
}

/* Content expands to fill the space when sidebar is collapsed */
.content.expanded {
  margin-left: 0;
  width: 100%; /* Ensure content takes full width when sidebar is collapsed */
}

/* When sidebar is hidden, allow content to take full width */
.sidebar-hidden .content {
  margin-left: 0;
}

.about-section {
  margin-bottom: 2rem;
  text-align: center; /* Center align the section */
}

.about-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #077A7D; /* Teal for headings */
}

.about-section p {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify; /* Justify the paragraph text */
  max-width: 80%; /* Limit width for better readability */
  margin: 0 auto 1rem auto; /* Center the paragraph block and add bottom margin between paragraphs */
  text-indent: 2em; /* Add paragraph indentation for better readability */
  hyphens: auto; /* Enable automatic hyphenation */
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  background-color: #FFFFFF; /* White background for cards */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 4px solid #077A7D; /* Teal accent */
  transition: transform 0.3s, box-shadow 0.3s;
}

.card.clickable {
  cursor: pointer;
  position: relative;
}

.card.clickable::after {
  content: "Click to view";
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #077A7D;
  opacity: 0;
  transition: opacity 0.3s;
}

.card.clickable:hover::after {
  opacity: 1;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #077A7D; /* Teal for card titles */
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #06202B; /* Deep navy for numbers */
  margin-top: 0.5rem;
}

/* Active link styling */
.router-link-active {
  color: #F5EEDD !important; /* Light cream for active link */
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  background-color: #7AE2CF; /* Light mint dot indicator */
  border-radius: 50%;
}
</style>
