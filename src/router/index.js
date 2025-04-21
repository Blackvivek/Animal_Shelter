import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading components for better performance
const Dashboard = () => import('../components/Dashboard.vue');
const AboutUs = () => import('../components/AboutUs.vue');
const Admission = () => import('../components/Admission.vue');
const Adoption = () => import('../components/adoption.vue'); // Import the adoption component
const AdoptedAnimals = () => import('../components/AdoptedAnimals.vue'); // Import the adopted animals component
const AdoptionForm = () => import('../components/AdoptionForm.vue');
const ContactUs = () => import('../components/ContactUs.vue'); // Import the contact us component
const NotFound = () => import('../components/NotFound.vue');

const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/about', name: 'AboutUs', component: AboutUs },
    { path: '/admission', name: 'Admission', component: Admission },
    { path: '/adoption', name: 'Adoption', component: Adoption },
    { path: '/adopted-animals', name: 'AdoptedAnimals', component: AdoptedAnimals }, // Add route for adopted animals page
    { path: '/adoption-form/:id', name: 'AdoptionForm', component: AdoptionForm }, // Route for the adoption form with pet ID parameter
    { path: '/contact', name: 'ContactUs', component: ContactUs }, // Add contact us route
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Fallback route for 404
];

const router = createRouter({
    history: createWebHistory('/'), // Ensure base path is set to '/' for local development
    routes,
});

export default router;


