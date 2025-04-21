<template>
    <div class="about-container">
        <HomeButton />
        
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>About Summer Shelter</h1>
            <div class="header-underline"></div>
            <p class="tagline">A haven for animals in need since 2018</p>
        </section>

        <!-- Mission Section -->
        <section class="content-section mission-section">
            <div class="section-image">
                <img src="/src/assets/images/summershelter.jpg" alt="Summer Shelter" />
            </div>
            <div class="section-content">
                <h2>Our Mission</h2>
                <p>
                    At Summer Shelter, we believe every animal deserves a loving home. Our mission is to rescue, 
                    rehabilitate, and rehome abandoned and mistreated animals while educating our community 
                    about responsible pet ownership.
                </p>
                <p>
                    Founded in 2018, our shelter has helped over 2,000 animals find loving homes. Our dedicated team of 
                    veterinarians, animal behaviorists, and passionate volunteers work tirelessly to ensure each animal 
                    receives personalized care and attention.
                </p>
            </div>
        </section>

        <!-- What We Do Section -->
        <section class="content-section what-we-do-section">
            <div class="section-content">
                <h2>What We Do</h2>
                <div class="services">
                    <div class="service-card">
                        <div class="service-icon">🏠</div>
                        <h3>Animal Rescue</h3>
                        <p>We rescue animals from abandonment, abuse, and neglect, providing immediate medical care and shelter.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">❤</div>
                        <h3>Rehabilitation</h3>
                        <p>Our team provides medical treatment, behavioral training, and socialization to prepare animals for adoption.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">🤝</div>
                        <h3>Adoption</h3>
                        <p>We carefully match animals with loving forever homes through our thorough adoption process.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">📚</div>
                        <h3>Education</h3>
                        <p>We provide community education programs on animal welfare, responsible pet ownership, and the importance of spaying/neutering.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Animals Section -->
        <section class="content-section animals-section">
            <h2>Animals We Help</h2>
            <div class="animals-grid">
                <div class="animal-item" v-for="(animal, index) in animals" :key="index">
                    <div class="animal-image">
                        <img :src="animal.image" :alt="animal.name" />
                    </div>
                    <div class="animal-content">
                        <h3>{{ animal.name }}</h3>
                        <p>{{ animal.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="content-section team-section">
            <h2>Our Team</h2>
            <p class="team-intro">
                Our dedicated staff and volunteers are the heart of Summer Shelter. Each team member brings unique skills,
                but they all share a common passion for animal welfare and a commitment to our mission.
            </p>
            <div class="team-members">
                <div class="team-member">
                    <div class="member-icon">
                        <img src="../assets/images/girl.jpg" alt="Dr. Sarah Johnson" />
                    </div>
                    <h3>Aditi Koli</h3>
                </div>
                <div class="team-member">
                    <div class="member-icon">
                        <img src="../assets/images/girl2.jpg" alt="Michael Rodriguez" />
                    </div>
                    <h3>Harshda Kshirsagar</h3>
                </div>
                <div class="team-member">
                    <div class="member-icon">
                        <img src="../assets/images/boy1.jpg" alt="Lisa Chen" />
                    </div>
                    <h3>Abhijeet Kumbhar</h3>
                </div>
                <div class="team-member">
                    <div class="member-icon">
                        <img src="../assets/images/boy2.jpg" alt="Emily Davis" />
                    </div>
                    <h3>Suyash Jagtap</h3>
                </div>
            </div>
        </section>

        <!-- Get Involved Section -->
        <section class="content-section get-involved-section">
            <h2>Get Involved</h2>
            <div class="involvement-options">
                <div class="involvement-card">
                    <h3>Adopt</h3>
                    <p>Give a loving home to an animal in need.</p>
                    <router-link to="/adoption" class="action-button">View Adoptable Pets</router-link>
                </div>
                <div class="involvement-card">
                    <h3>Donate</h3>
                    <p>Support our mission with a one-time or monthly donation.</p>
                    <a href="#" class="action-button">Donate Now</a>
                </div>
                <div class="involvement-card">
                    <h3>Volunteer</h3>
                    <p>Share your time and skills to help animals in our care.</p>
                    <a href="#" class="action-button">Join Our Team</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import HomeButton from './HomeButton.vue';

const animals = [
    { name: 'Dogs', description: 'From playful puppies to gentle seniors, we rescue and rehome dogs of all breeds, sizes, and ages.', image: '/src/assets/images/dog.jpg' },
    { name: 'Cats', description: 'Our feline friends range from curious kittens to dignified adult cats, all looking for their forever homes.', image: '/src/assets/images/cat.jpg' },
    { name: 'Small Animals', description: 'We care for rabbits, guinea pigs, hamsters, and other small pets that make wonderful companions.', image: '/src/assets/images/rabbit.jpg' },
    { name: 'Birds', description: 'From parakeets to parrots, our feathered friends bring joy and color to any home.', image: '/src/assets/images/bird.jpg' },
];
</script>

<style scoped>
/* General Styles - using the same color scheme as the rest of your app */
.about-container {
    background-color: #F5EEDD; /* Light cream background */
    color: #06202B; /* Deep navy for text */
    min-height: 100vh;
    padding-bottom: 3rem;
}

h1, h2, h3 {
    color: #077A7D; /* Teal for headings */
}

/* Hero Section */
.hero-section {
    background-color: #FFFFFF;
    padding: 4rem 2rem;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.hero-section h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.header-underline {
    width: 200px;
    height: 4px;
    background-color: #077A7D;
    margin: 0.5rem auto 1.5rem auto;
}

.tagline {
    font-size: 1.5rem;
    color: #06202B;
    font-weight: 300;
}

/* Content Sections */
.content-section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.content-section h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

/* Mission Section */
.mission-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    padding-top: 4rem;
}

.section-image {
    flex: 1;
    min-width: 300px;
}

.section-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-content {
    flex: 2;
    min-width: 300px;
}

.section-content p {
    line-height: 1.7;
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
}

/* What We Do Section */
.services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.service-card {
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.service-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.service-card h3 {
    margin-bottom: 1rem;
}

.service-card p {
    color: #666;
}

/* Animals Section */
.animals-section {
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 3rem;
    margin: 3rem auto;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.animals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.animal-item {
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.animal-item:hover {
    transform: translateY(-5px);
}

.animal-image {
    height: 200px;
    overflow: hidden;
}

.animal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.animal-content {
    padding: 1.5rem;
}

.animal-content h3 {
    margin-bottom: 0.8rem;
}

.animal-content p {
    color: #666;
    line-height: 1.5;
}

/* Team Section */
.team-section {
    text-align: center;
    padding-bottom: 4rem;
}

.team-intro {
    max-width: 800px;
    margin: 0 auto 3rem auto;
    font-size: 1.1rem;
    line-height: 1.7;
}

.team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;
}

.team-member {
    width: 260px;
    text-align: center;
}

/* Replace the member-image with member-icon */
.member-icon {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 1.5rem auto;
    background-color: #077A7D;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.member-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.team-member h3 {
    margin-bottom: 0.5rem;
}

/* Get Involved Section */
.get-involved-section {
    background: linear-gradient(rgba(6, 32, 43, 0.8), rgba(6, 32, 43, 0.8)), url('/src/assets/images/rescue.jpg');
    background-size: cover;
    background-position: center;
    color: #FFFFFF;
    padding: 4rem 2rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 10px;
    max-width: 1200px;
}

.get-involved-section h2 {
    color: #FFFFFF;
}

.involvement-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
}

.involvement-card {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 10px;
    width: 260px;
    color: #06202B;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.involvement-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.involvement-card p {
    margin-bottom: 2rem;
    flex-grow: 1;
}

.action-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #077A7D;
    color: #FFFFFF;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.action-button:hover {
    background-color: #06202B;
    transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .hero-section {
        padding: 3rem 1rem;
    }
    
    .hero-section h1 {
        font-size: 2.5rem;
    }
    
    .tagline {
        font-size: 1.2rem;
    }
    
    .content-section {
        padding: 2rem 1rem;
    }
    
    .mission-section {
        flex-direction: column;
    }
    
    .section-content h2 {
        text-align: center;
    }
    
    .team-members {
        gap: 1.5rem;
    }
    
    .involvement-card {
        width: 100%;
        max-width: 300px;
    }
}
</style>