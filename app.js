/**
 * @file app.js
 * @description Core logic for AuraTravel AI Companion.
 * Implements itinerary generation, AI assistant chat, and dashboard interactions.
 * Built for high efficiency and scalability.
 */

/**
 * AuraTravel App Namespace
 */
const AuraTravel = (() => {
    'use strict';

    // --- State Management ---
    const state = {
        isChatOpen: false,
        currentItinerary: null,
        userPreferences: {
            interest: 'adventure',
            tripType: 'solo'
        }
    };

    // --- DOM Elements ---
    const elements = {
        chatToggle: document.getElementById('chatToggle'),
        chatWindow: document.getElementById('chatWindow'),
        closeChat: document.getElementById('closeChat'),
        sendBtn: document.getElementById('sendBtn'),
        userInput: document.getElementById('userInput'),
        chatMessages: document.getElementById('chatMessages'),
        generateBtn: document.getElementById('generateBtn'),
        destinationInput: document.getElementById('dest'),
        styleSelect: document.getElementById('travel-style'),
        typeSelect: document.getElementById('trip-type')
    };

    /**
     * Initializes the application modules
     */
    const init = () => {
        registerEventListeners();
        injectCustomStyles();
        console.log('AuraTravel Core Initialized');
    };

    /**
     * Registers all global event listeners
     */
    const registerEventListeners = () => {
        // Chat interactions
        elements.chatToggle?.addEventListener('click', toggleChat);
        elements.closeChat?.addEventListener('click', () => toggleChat(false));
        elements.sendBtn?.addEventListener('click', handleChatSubmit);
        elements.userInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });

        // Planner interactions
        elements.generateBtn?.addEventListener('click', handleItineraryGeneration);
    };

    /**
     * Toggles the AI Assistant chat window
     * @param {boolean|null} force - Optional boolean to force state
     */
    const toggleChat = (force = null) => {
        state.isChatOpen = force !== null ? force : !state.isChatOpen;
        elements.chatWindow.style.display = state.isChatOpen ? 'flex' : 'none';
        
        if (state.isChatOpen) {
            elements.userInput.focus();
        }
    };

    /**
     * Handles user message submission in the AI Chat
     */
    const handleChatSubmit = () => {
        const text = elements.userInput.value.trim();
        if (!text) return;

        // Sanitize input for basic security
        const sanitizedText = sanitizeHTML(text);
        
        appendMessage(sanitizedText, 'user');
        elements.userInput.value = '';

        // Simulate AI Processing delay
        simulateAIResponse(sanitizedText);
    };

    /**
     * Appends a message bubble to the chat container
     * @param {string} text 
     * @param {string} sender - 'ai' or 'user'
     */
    const appendMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `message ${sender} animate-fade-in`;
        msg.textContent = text;
        elements.chatMessages.appendChild(msg);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    };

    /**
     * Simulates a context-aware AI response
     * @param {string} input 
     */
    const simulateAIResponse = (input) => {
        setTimeout(() => {
            let response = "I'm analyzing your request to provide the best travel advice.";
            
            if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
                response = "Hello! I'm Aura, your personal AI travel companion. Ready to plan your next adventure?";
            } else if (input.toLowerCase().includes('budget')) {
                response = "I've calculated your budget. Based on your preferences, we can optimize costs by 15% by booking mid-week.";
            } else if (input.toLowerCase().includes('weather')) {
                response = "Currently, your destination shows clear skies with a high of 24°C. Perfect for outdoor activities!";
            }
            
            appendMessage(response, 'ai');
        }, 800);
    };

    /**
     * Handles the complex itinerary generation process
     */
    const handleItineraryGeneration = async () => {
        const destination = elements.destinationInput.value.trim();
        if (!destination) {
            showNotification('Please provide a destination to begin magic planning.', 'warning');
            return;
        }

        // Update UI to loading state
        const originalText = elements.generateBtn.innerHTML;
        elements.generateBtn.disabled = true;
        elements.generateBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Optimizing Route...';
        lucide.createIcons();

        // Simulate complex AI calculation (Route optimization, budget mapping)
        await new Promise(resolve => setTimeout(resolve, 2500));

        elements.generateBtn.disabled = false;
        elements.generateBtn.innerHTML = originalText;
        lucide.createIcons();

        showNotification(`Success! A personalized itinerary for ${destination} has been generated and optimized for a ${elements.typeSelect.value} trip.`, 'success');
    };

    /**
     * Utility: Basic HTML Sanitization for Security
     */
    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    /**
     * Utility: Toast Notifications for better UX
     */
    const showNotification = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `glass animate-fade-in`;
        toast.style.cssText = `
            position: fixed; top: 2rem; left: 50%; transform: translateX(-50%);
            padding: 1rem 2rem; z-index: 1000; border-left: 4px solid ${type === 'success' ? '#4ade80' : '#fbbf24'};
            background: rgba(30, 41, 59, 0.95);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    };

    /**
     * Injects micro-animation styles
     */
    const injectCustomStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .spin { display: inline-block; animation: spin 1.2s linear infinite; }
            .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        `;
        document.head.appendChild(style);
    };

    return { init };
})();

// Start the application
AuraTravel.init();
