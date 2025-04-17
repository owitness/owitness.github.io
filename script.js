// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('overlay');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Close menu when clicking on a link or outside
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Typewriter effect for the hero section
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'Software Engineer',
      'Frontend Developer',
      'UI/UX Enthusiast',
      'Problem Solver',
      'Creative Thinker',
      'Automation Specialist',
      'Computer Builder',
      'Collaberator'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Remove a character
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Add a character
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150; // Slower when typing
      }
      
      // If word is complete, start deleting after pause
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } 
      // If deletion is complete, move to next word
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next word
      }
      
      setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect once DOM is loaded
    setTimeout(typeWriter, 1000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // GitHub repositories loading with animation
  async function loadGitHubRepos() {
    try {
      const container = document.getElementById('github-projects');
      if (!container) return;
      
      const res = await fetch('https://api.github.com/users/owitness/repos');
      const repos = await res.json();
      
      if (!repos.length) {
        container.innerHTML = '<p>No repositories found.</p>';
        return;
      }
      
      // Clear any existing content
      container.innerHTML = '';
      
      // Get up to 4 repositories
      const reposToDisplay = repos.slice(0, 4);
      
      // Create and append each repo card with animation delay
      reposToDisplay.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Language color indicator (if available)
        let languageHTML = '';
        if (repo.language) {
          const languageColors = {
            JavaScript: '#f1e05a',
            TypeScript: '#3178c6',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Python: '#3572A5',
            Java: '#b07219',
            'C#': '#178600',
            PHP: '#4F5D95',
            Go: '#00ADD8',
            Ruby: '#701516',
            Swift: '#F05138',
            Kotlin: '#A97BFF',
            Rust: '#DEA584',
            Dart: '#00B4AB',
            // Add more languages as needed
          };
          
          const color = languageColors[repo.language] || '#8b949e';
          languageHTML = `
            <div class="repo-language">
              <span class="language-color" style="background-color: ${color}"></span>
              <span>${repo.language}</span>
            </div>
          `;
        }
        
        // Determine stars count
        const stars = repo.stargazers_count ? `
          <div class="repo-stars">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${repo.stargazers_count}</span>
          </div>
        ` : '';
        
        card.innerHTML = `
          <h4>${repo.name}</h4>
          <p>${repo.description || 'No description available.'}</p>
          <div class="repo-meta">
            ${languageHTML}
            ${stars}
          </div>
          <a href="${repo.html_url}" target="_blank" class="view-project">View Project <span class="arrow">→</span></a>
        `;
        
        container.appendChild(card);
        
        // Trigger animation after a small delay
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      });
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      const container = document.getElementById('github-projects');
      if (container) {
        container.innerHTML = '<p>Failed to load GitHub repositories.</p>';
      }
    }
  }
  
  // Initialize on page load
  loadGitHubRepos();
  
  // Add scroll animation for elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.project-card, #resume, #contact, #game-section').forEach(el => {
    if (el) observer.observe(el);
  });
  
  // Theme toggle functionality based on best practices
  // Following the implementation from https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f
  function calculateSettingAsThemeString({localStorageTheme, systemSettingDark}) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
    
    if (systemSettingDark.matches) {
      return "dark";
    }
    
    return "light";
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    
    let currentThemeSetting = calculateSettingAsThemeString({localStorageTheme, systemSettingDark});
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentThemeSetting);
    
    // Update button icon
    if (currentThemeSetting === 'dark') {
      themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else {
      themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
    
    // Update aria label for accessibility
    themeToggle.setAttribute('aria-label', `Change to ${currentThemeSetting === 'dark' ? 'light' : 'dark'} theme`);
    
    // Add event listener for theme toggle button
    themeToggle.addEventListener('click', () => {
      const newTheme = currentThemeSetting === 'dark' ? 'light' : 'dark';
      
      // Update the theme setting
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      currentThemeSetting = newTheme;
      
      // Update the button icon and aria-label
      if (newTheme === 'dark') {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      } else {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      }
      
      themeToggle.setAttribute('aria-label', `Change to ${newTheme === 'dark' ? 'light' : 'dark'} theme`);
    });
  }
  
  // Memory Match Game
  const startGameBtn = document.getElementById('start-game');
  const gameContainer = document.getElementById('game-container');
  const movesCount = document.getElementById('moves-count');
  const timeValue = document.getElementById('time');
  
  if (startGameBtn && gameContainer) {
    let cards;
    let interval;
    let firstCard = false;
    let secondCard = false;
    let firstCardValue;
    let secondCardValue;
    let moves = 0;
    let seconds = 0;
    let minutes = 0;
    let matchedCards = 0;
    let isPlaying = false;
    
    // Items array for card content
    const items = [
      '🚀', '🌟', '🎮', '🎨', '🌈', '🎯', 
      '🔥', '💻', '🛠️', '📱', '🎵', '🎭'
    ];
    
    // Timer
    const timeGenerator = () => {
      seconds += 1;
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      
      // Format time before displaying
      let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
      let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
      timeValue.innerHTML = `${minutesValue}:${secondsValue}`;
    };
    
    // Calculating moves
    const movesCounter = () => {
      moves++;
      movesCount.innerHTML = moves;
    };
    
    // Function to generate random cards
    const generateCards = (size = 16) => {
      // Pick random items from the array
      let selectedItems = [];
      
      // Determine how many unique items we need (half of the size)
      const numUniqueItems = size / 2;
      
      // Randomly select items from the items array
      while (selectedItems.length < numUniqueItems) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        
        // Only add if not already in selectedItems
        if (!selectedItems.includes(randomItem)) {
          selectedItems.push(randomItem);
        }
      }
      
      // Double the array (pairs of each item)
      let cardValues = [...selectedItems, ...selectedItems];
      
      // Randomize the array
      cardValues.sort(() => Math.random() - 0.5);
      
      // Create cards
      gameContainer.innerHTML = '';
      
      cardValues.forEach((item) => {
        gameContainer.innerHTML += `
          <div class="memory-card" data-value="${item}">
            <div class="back">?</div>
            <div class="front">${item}</div>
          </div>
        `;
      });
      
      // Assign cards
      cards = document.querySelectorAll(".memory-card");
      
      // Add event listeners to cards
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          if (!isPlaying) return;
          if (card.classList.contains("matched") || card === firstCard || card.classList.contains("flipped")) return;
          
          // Flip the card
          card.classList.add("flipped");
          
          // If it's the first card
          if (!firstCard) {
            firstCard = card;
            firstCardValue = card.getAttribute("data-value");
          } else {
            // If it's the second card
            movesCounter();
            secondCard = card;
            secondCardValue = card.getAttribute("data-value");
            
            // Check if cards match
            if (firstCardValue === secondCardValue) {
              // Add matched class
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              
              // Reset cards
              firstCard = false;
              secondCard = false;
              
              // Increment matched cards
              matchedCards += 2;
              
              // Check if all cards are matched
              if (matchedCards === size) {
                setTimeout(() => {
                  // Stop the timer
                  clearInterval(interval);
                  
                  // Show win message
                  let winMessage = document.createElement('div');
                  winMessage.classList.add('game-won');
                  winMessage.innerHTML = `
                    <p>Congratulations! 🎉</p>
                    <p>You completed the game in ${minutes}:${seconds < 10 ? '0' + seconds : seconds} with ${moves} moves!</p>
                  `;
                  gameContainer.innerHTML = '';
                  gameContainer.appendChild(winMessage);
                  
                  // Reset game state
                  isPlaying = false;
                  startGameBtn.textContent = 'Play Again';
                }, 1000);
              }
            } else {
              // If cards don't match, flip back
              let tempFirst = firstCard;
              let tempSecond = secondCard;
              
              firstCard = false;
              secondCard = false;
              
              setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 900);
            }
          }
        });
      });
    };
    
    // Start game
    startGameBtn.addEventListener('click', () => {
      if (isPlaying) return;
      
      isPlaying = true;
      startGameBtn.textContent = 'Playing...';
      
      // Reset values
      moves = 0;
      seconds = 0;
      minutes = 0;
      matchedCards = 0;
      
      // Update UI
      movesCount.innerHTML = moves;
      timeValue.innerHTML = '00:00';
      
      // Clear previous interval
      clearInterval(interval);
      
      // Start timer
      interval = setInterval(timeGenerator, 1000);
      
      // Generate cards
      generateCards(16);
    });
  }
  
  // Chatbot functionality
  const chatButton = document.getElementById('chat-button');
  const chatbotContainer = document.getElementById('chatbot-container');
  
  if (chatButton && chatbotContainer) {
    chatButton.addEventListener('click', () => {
      if (chatbotContainer.style.display === 'none' || !chatbotContainer.style.display) {
        chatbotContainer.style.display = 'block';
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          <span>Close chat</span>
        `;
      } else {
        chatbotContainer.style.display = 'none';
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Chat with me</span>
        `;
      }
    });
  }

  // 8-bit glasses toggle functionality
  const profilePic = document.getElementById('profile-pic');
  const glassesContainer = document.getElementById('glasses-container');
  
  if (profilePic && glassesContainer) {
    profilePic.addEventListener('click', () => {
      if (!glassesContainer.classList.contains('active')) {
        // Adding the glasses - simple animation
        glassesContainer.style.transform = 'translate(-50%, -150%) scale(1)';
        glassesContainer.style.opacity = '1';
        glassesContainer.style.display = 'block';
        
        // Drop in animation
        setTimeout(() => {
          glassesContainer.style.transform = 'translate(-50%, -50%) scale(1)';
          glassesContainer.classList.add('active');
        }, 100);
      } else {
        // Removing the glasses
        glassesContainer.classList.remove('active');
        glassesContainer.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      
      // Add a quick animation when toggling glasses
      profilePic.style.transform = 'scale(0.97)';
      setTimeout(() => {
        profilePic.style.transform = 'scale(1)';
      }, 150);
    });
  }
});

// Three.js Scene Setup for Hero Section
let heroScene, heroCamera, heroRenderer, heroControls;
let currentModel = null;
let currentModelName = 'iphone';
let loadingManager = null;
let mixer = null;
let clock = null;

// Define the available models
const models = {
  iphone: {
    path: 'models/iphone.glb',
    scale: 10,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  gpu: {
    path: 'models/gpu.glb',
    scale: 0.8,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  macbook: {
    path: 'models/macbook.glb',
    scale: 0.1,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  skis: {
    path: 'models/skis.glb',
    scale: 2.7,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI / 4, z: 0 }
  },
  car: {
    path: 'models/car.glb',
    scale: 1,
    position: { x: 0, y: -0.5, z: 0 },
    rotation: { x: 0, y: Math.PI / 4, z: 0 }
  }
};

// Create a loading indicator
function createLoadingIndicator() {
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '10';
  overlay.style.borderRadius = '1rem';
  
  const text = document.createElement('div');
  text.textContent = 'Loading Model...';
  text.style.color = 'white';
  text.style.fontWeight = 'bold';
  text.style.padding = '1rem';
  text.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  text.style.borderRadius = '0.5rem';
  
  overlay.appendChild(text);
  
  return {
    overlay,
    updateProgress: (progress) => {
      text.textContent = `Loading Model... ${Math.floor(progress * 100)}%`;
    },
    remove: () => {
      overlay.remove();
    }
  };
}

function initHeroModel() {
  // Create scene
  heroScene = new THREE.Scene();
  heroScene.background = new THREE.Color(0x111827);

  // Get container dimensions
  const container = document.getElementById('hero-model-viewer');
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Create camera
  heroCamera = new THREE.PerspectiveCamera(
    35, 
    containerWidth / containerHeight, 
    0.1, 
    1000
  );
  heroCamera.position.set(0, 3, 8); // Position camera higher to look down at model

  // Create renderer
  heroRenderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
  });
  heroRenderer.setSize(containerWidth, containerHeight);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
  heroRenderer.outputEncoding = THREE.sRGBEncoding;
  heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  heroRenderer.toneMappingExposure = 1.2;
  heroRenderer.shadowMap.enabled = true;
  heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  container.appendChild(heroRenderer.domElement);

  // Add controls
  heroControls = new THREE.OrbitControls(heroCamera, heroRenderer.domElement);
  heroControls.enableDamping = true;
  heroControls.dampingFactor = 0.05;
  heroControls.autoRotate = true;
  heroControls.autoRotateSpeed = 1.5;
  heroControls.enableZoom = true;
  heroControls.minDistance = 3;
  heroControls.maxDistance = 12;

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  heroScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 20;
  directionalLight.shadow.normalBias = 0.05;
  heroScene.add(directionalLight);

  // Add another light from opposite direction
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-5, 5, -5);
  heroScene.add(directionalLight2);
  
  // Add rim light for better definition
  const rimLight = new THREE.DirectionalLight(0x5588ff, 0.5);
  rimLight.position.set(0, -5, 0);
  heroScene.add(rimLight);

  // Create loading manager
  loadingManager = new THREE.LoadingManager();
  
  // Create animation clock
  clock = new THREE.Clock();

  // Handle window resize
  window.addEventListener('resize', onHeroWindowResize, false);

  // Load the initial model
  loadModel(currentModelName);

  // Add event listeners to model buttons
  document.querySelectorAll('.model-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Don't reload if already selected
      if (btn.classList.contains('active')) return;
      
      // Update active button
      document.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Load the selected model
      currentModelName = btn.getAttribute('data-model');
      loadModel(currentModelName);
    });
  });

  // Start animation loop
  animateHero();
}

function loadModel(modelName) {
  const modelConfig = models[modelName];
  
  if (!modelConfig) {
    console.error(`Model '${modelName}' not defined`);
    return;
  }
  
  // Create loading indicator
  const loadingIndicator = createLoadingIndicator();
  document.getElementById('hero-model-viewer').appendChild(loadingIndicator.overlay);
  
  // Update loader event handlers
  loadingManager.onProgress = (url, loaded, total) => {
    loadingIndicator.updateProgress(loaded / total);
  };
  
  loadingManager.onLoad = () => {
    setTimeout(() => {
      loadingIndicator.remove();
    }, 500);
  };
  
  loadingManager.onError = (url) => {
    console.error(`Error loading ${url}`);
    loadingIndicator.remove();
    
    // Create a fallback object if model fails to load
    createFallbackObject(modelName);
  };
  
  // Create GLTF loader with DRACOLoader support
  const dracoLoader = new THREE.DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  
  const loader = new THREE.GLTFLoader(loadingManager);
  loader.setDRACOLoader(dracoLoader);
  
  // Remove existing model if present
  if (currentModel) {
    heroScene.remove(currentModel);
    currentModel = null;
    
    // Clear any existing animation mixer
    if (mixer) {
      mixer = null;
    }
  }
  
  // Load the new model
  loader.load(
    modelConfig.path,
    (gltf) => {
      const model = gltf.scene;
      
      // Create a group to contain the model for easier manipulation
      const modelGroup = new THREE.Group();
      modelGroup.add(model);
      
      // Set scale
      model.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);
      
      // Set position - add vertical offset to raise the model
      model.position.set(
        modelConfig.position.x,
        modelConfig.position.y + 3, // Increase offset to raise model higher
        modelConfig.position.z
      );
      
      // Set rotation
      model.rotation.set(
        modelConfig.rotation.x,
        modelConfig.rotation.y,
        modelConfig.rotation.z
      );
      
      // Configure model rendering
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          
          // Improve material quality
          if (node.material) {
            node.material.roughness = 0.7;
            node.material.metalness = 0.3;
            if (node.material.map) {
              node.material.map.anisotropy = 16;
            }
          }
        }
      });
      
      // Save reference and add to scene
      currentModel = modelGroup;
      heroScene.add(modelGroup);
      
      // Set up animations if they exist
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const animation = gltf.animations[0];
        const action = mixer.clipAction(animation);
        action.play();
      }
      
      // Reset camera position based on model bounding box
      fitCameraToModel(model);
    },
    (xhr) => {
      // Progress is handled by the loadingManager
    },
    (error) => {
      console.error('Error loading model:', error);
      loadingIndicator.remove();
      
      // Create a fallback object if model fails to load
      createFallbackObject(modelName);
    }
  );
}

function fitCameraToModel(model) {
  const boundingBox = new THREE.Box3().setFromObject(model);
  const center = boundingBox.getCenter(new THREE.Vector3());
  const size = boundingBox.getSize(new THREE.Vector3());
  
  // Get the max side of the bounding box
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = heroCamera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
  
  // Set some padding
  cameraZ *= 1.5;
  
  // Update camera position to look down at the model
  // Position camera higher and maintain the Z distance
  heroCamera.position.set(0, center.y + 2, cameraZ);
  
  const minZ = boundingBox.min.z;
  const cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;
  
  heroCamera.far = cameraToFarEdge * 3;
  heroCamera.updateProjectionMatrix();
  
  // Set camera to look at center of the model
  heroControls.target = center;
  
  // Ensure the model is properly positioned
  // We only offset X and Z, keeping the Y positioning we set earlier
  model.position.x = -center.x;
  // Leave Y position alone to maintain the raised position
  model.position.z = -center.z;
  
  heroControls.update();
}

function onHeroWindowResize() {
  if (!heroCamera || !heroRenderer) return;
  
  const container = document.getElementById('hero-model-viewer');
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  heroCamera.aspect = containerWidth / containerHeight;
  heroCamera.updateProjectionMatrix();
  
  heroRenderer.setSize(containerWidth, containerHeight);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animateHero() {
  requestAnimationFrame(animateHero);
  
  // Update controls
  if (heroControls) heroControls.update();
  
  // Update animations
  if (mixer) {
    const delta = clock.getDelta();
    mixer.update(delta);
  }
  
  // Render scene
  if (heroRenderer && heroScene && heroCamera) {
    heroRenderer.render(heroScene, heroCamera);
  }
}

// Create a placeholder object when a model fails to load
function createFallbackObject(modelName) {
  if (currentModel) {
    heroScene.remove(currentModel);
    currentModel = null;
  }
  
  let geometry, material;
  
  // Create different placeholder geometries based on the model type
  switch (modelName) {
    case 'iphone':
      geometry = new THREE.BoxGeometry(1, 2, 0.1);
      material = new THREE.MeshPhongMaterial({ color: 0x888888 });
      break;
    case 'gpu':
      geometry = new THREE.BoxGeometry(2, 0.2, 1);
      material = new THREE.MeshPhongMaterial({ color: 0x222222 });
      break;
    case 'macbook':
      // Create a laptop-like shape (base + screen)
      const group = new THREE.Group();
      
      // Base
      const baseGeom = new THREE.BoxGeometry(2, 0.1, 1.5);
      const baseMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const base = new THREE.Mesh(baseGeom, baseMat);
      group.add(base);
      
      // Screen
      const screenGeom = new THREE.BoxGeometry(2, 1.3, 0.05);
      const screenMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
      const screen = new THREE.Mesh(screenGeom, screenMat);
      screen.position.y = 0.7;
      screen.position.z = -0.7;
      screen.rotation.x = Math.PI / 6;
      group.add(screen);
      
      currentModel = group;
      heroScene.add(group);
      return;
    case 'skis':
      geometry = new THREE.BoxGeometry(0.3, 0.05, 3);
      material = new THREE.MeshPhongMaterial({ color: 0x3399ff });
      break;
    case 'car':
      // Create a car-like shape
      const carGroup = new THREE.Group();
      
      // Body
      const bodyGeom = new THREE.BoxGeometry(2, 0.5, 1);
      const bodyMat = new THREE.MeshPhongMaterial({ color: 0xff3333 });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      carGroup.add(body);
      
      // Roof
      const roofGeom = new THREE.BoxGeometry(1.2, 0.4, 0.8);
      const roofMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
      const roof = new THREE.Mesh(roofGeom, roofMat);
      roof.position.y = 0.45;
      roof.position.z = -0.1;
      carGroup.add(roof);
      
      // Wheels
      const wheelGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24);
      const wheelMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
      
      const wheel1 = new THREE.Mesh(wheelGeom, wheelMat);
      wheel1.rotation.z = Math.PI / 2;
      wheel1.position.set(0.6, -0.3, 0.5);
      carGroup.add(wheel1);
      
      const wheel2 = new THREE.Mesh(wheelGeom, wheelMat);
      wheel2.rotation.z = Math.PI / 2;
      wheel2.position.set(0.6, -0.3, -0.5);
      carGroup.add(wheel2);
      
      const wheel3 = new THREE.Mesh(wheelGeom, wheelMat);
      wheel3.rotation.z = Math.PI / 2;
      wheel3.position.set(-0.6, -0.3, 0.5);
      carGroup.add(wheel3);
      
      const wheel4 = new THREE.Mesh(wheelGeom, wheelMat);
      wheel4.rotation.z = Math.PI / 2;
      wheel4.position.set(-0.6, -0.3, -0.5);
      carGroup.add(wheel4);
      
      currentModel = carGroup;
      heroScene.add(carGroup);
      return;
    default:
      geometry = new THREE.SphereGeometry(1, 32, 32);
      material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  }
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  
  currentModel = mesh;
  heroScene.add(mesh);
  
  // Reset camera
  heroCamera.position.z = 5;
  heroControls.target.set(0, 0, 0);
  heroControls.update();
}

// Initialize Three.js for the hero section when the page loads
window.addEventListener('load', initHeroModel); 