# Birthday Website for Aarohi - Complete Documentation

## Overview

An immersive, highly-animated birthday celebration website built with React 18 + TypeScript, featuring WebGL effects, GSAP animations, a counter animation, galaxy background, and a 3D dome gallery. The project emphasizes creating a magical birthday experience through particle systems, scroll-triggered animations, fluid simulations, and gesture-based interactions.

## Page Flow

The complete birthday experience follows this journey:

```
Welcome Page (/)
    ↓
Intro Page (/intro) - "Hello Aarohi (The Blue) :)" with particle effects
    ↓
Counter Animation (/counter) - Counts slowly to 18 with confetti blast & sound
    ↓
Birthday Wish Page (/birthday-wish) - Galaxy background with glass buttons
    ↓
Gallery Page (/gallery) - 3D dome with photos/videos and ambient music
```

## Getting Started Locally on Mac

### Prerequisites
- **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org)
- **npm** or **yarn** (comes with Node.js)
- A terminal application (Terminal.app or iTerm2)

### Installation & Setup

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd <project-folder>
   
   # Or download the ZIP and extract it
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs all required packages from `package.json`.

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The server will start and display:
   ```
   > rest-express@1.0.0 dev
   > NODE_ENV=development tsx server/index.ts
   
   5:45:06 AM [express] serving on port 5000
   ```

4. **Open in Browser**
   - Open your browser and go to: **http://localhost:5000**
   - You should see the Welcome page with the birthday website

5. **Navigate Through Pages**
   - **Welcome (/)** - Click START to begin
   - **Intro (/intro)** - Click "See The Surprise"
   - **Counter (/counter)** - Watch the animated counter to 18
   - **Birthday Wish (/birthday-wish)** - Click the birthday buttons to see messages
   - **Gallery (/gallery)** - Drag to rotate the 3D gallery, click to view photos/videos

### Development Tips

- **Hot Reload**: The app automatically reloads when you make code changes
- **Stop the Server**: Press `Ctrl + C` in the terminal
- **Check Logs**: Any errors will show in the terminal and browser console (F12)
- **Port Already in Use?**: If port 5000 is busy, kill the process:
  ```bash
  lsof -ti:5000 | xargs kill -9
  ```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Running Production Build Locally

```bash
npm run build
npm run start
```

The production version will also run on `http://localhost:5000`

---

## Deploying to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup) (free tier available)
- GitHub account with the repository pushed to GitHub
- Git installed on your machine

### Verified Configuration ✓

This project is fully configured for Vercel deployment with:
- ✅ Express backend serving React frontend
- ✅ All animations (GSAP, WebGL, Three.js) working
- ✅ Gallery media assets (images, videos, music) included
- ✅ Proper static file serving in production
- ✅ Auto-routing for SPA (Single Page Application)
- ✅ Production build tested and verified

### Step-by-Step Deployment

1. **Push Your Project to GitHub**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Vercel-ready birthday website with animations"
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Find and click your GitHub repository
   - Click "Import"

3. **Automatic Configuration**
   - Vercel auto-detects this is a Node.js project
   - Build command: `npm run build` ✓
   - Output: `dist` ✓
   - **No additional configuration needed!**
   - Click "Deploy" and wait 2-3 minutes

4. **Your App is Live!** 🚀
   - You'll get a free `.vercel.app` domain
   - All animations, music, and gallery work correctly
   - Gallery images/videos load and display properly
   - Confetti animation on counter page works
   - Music fades and transitions work

### What's Configured for You

**`vercel.json`** includes:
- Node.js 18.x runtime
- Proper routing for API and static files
- Automatic SPA fallback for all routes
- Optimized caching for gallery assets

**`.vercelignore`** excludes:
- Source files (already compiled)
- Git files (unnecessary)
- Environment files (security)

**Build Process** automatically:
- Bundles React/Vite frontend → `dist/public`
- Compiles Express backend → `dist/index.js`
- Includes all gallery media (images, videos)
- Includes all music files (birthday piano, Tum Se Hi)

### Deployment Checklist

Before clicking Deploy, verify:
- [ ] Code is pushed to GitHub `main` branch
- [ ] `attached_assets/` folder contains gallery media
- [ ] `client/src/assets/music/` contains MP3 files
- [ ] Local `npm run build` completes without errors
- [ ] `npm run start` runs successfully locally

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check Vercel logs in Dashboard → Project → Deployments → click deployment → Logs |
| Animations not playing | Ensure all dependencies are installed (vercel auto-installs from package.json) |
| Images/videos not loading | Check attached_assets folder is in repo and committed to git |
| Music not playing | Verify audio files exist in client/src/assets/music/ before pushing |
| 404 on routes | Vercel.json routing handles all SPA routes automatically |

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `aarohi-birthday.com`)
3. Update DNS at your domain provider with Vercel's nameservers
4. HTTPS certificate auto-generated

### Continuous Deployment

Once deployed:
- Every push to GitHub's `main` branch auto-deploys
- Preview URLs generated for pull requests
- Rollback to previous versions anytime from Dashboard

### After Deployment

Your website is now live! Share these links:
- **Production**: Your `.vercel.app` domain (or custom domain)
- Shows all 6 pages of animations and the interactive 3D gallery
- Mobile-friendly and responsive

---

## Tech Stack

### Frontend
- **React 18.3.1** (TypeScript) - Component-based UI
- **Vite 5.4.20** - Build tool & dev server with HMR
- **Wouter 3.3.5** - Lightweight client-side routing (~2kb)
- **GSAP 3.13.0 + ScrollTrigger** - Professional animation engine
- **OGL 1.0.11** - Lightweight WebGL library (particle systems, shaders, galaxy)
- **Motion (Framer Motion)** - React animation library for CountUp
- **Canvas Confetti** - Confetti celebration effects
- **@use-gesture/react 10.3.1** - Gesture recognition (drag, pinch, swipe)

### Backend
- **Express.js 4.21.2** (TypeScript) - HTTP server & API routes
- **Node.js** with ESM modules
- **TSX 4.20.5** - TypeScript execution for Node

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** (New York variant) - Pre-styled Radix UI components
- **Radix UI** - Accessible primitives
- **Lucide React 0.453.0** - Icon library

### Media Assets
- **Birthday Piano Music** - Plays on birthday wish page with fade-in
- **Tum Se Hi Instrumental** - Plays on gallery page with fade-in
- **Gallery Media** - 20 images and 6 videos

## Project Structure

```
project/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── welcome.tsx           # Entry page with cat reveal (/)
│   │   │   ├── intro.tsx             # Intro message (/intro)
│   │   │   ├── landing.tsx           # Main scroll page (/main)
│   │   │   ├── counter.tsx           # Count to 18 animation (/counter)
│   │   │   ├── birthday-wish.tsx     # Galaxy + birthday message (/birthday-wish)
│   │   │   └── gallery.tsx           # 3D dome gallery (/gallery)
│   │   ├── components/
│   │   │   ├── Galaxy.tsx            # WebGL galaxy background
│   │   │   ├── CurvedLoop.tsx        # Curved text marquee animation
│   │   │   ├── CountUp.tsx           # Animated counter component
│   │   │   ├── SplitText.tsx         # Text animation with GSAP
│   │   │   ├── DomeGallery.tsx       # 3D sphere gallery
│   │   │   ├── LiquidChrome.tsx      # WebGL liquid metal shader
│   │   │   ├── AnimatedButton.tsx    # Gradient button
│   │   │   ├── BlurText.tsx          # Blur-to-clear text
│   │   │   ├── GlassSurface.tsx      # Glassmorphism effect
│   │   │   └── ... (more components)
│   │   └── assets/
│   │       ├── music/
│   │       │   ├── birthday-piano.mp3    # Birthday song
│   │       │   └── tum-se-hi.mp3         # Gallery background music
│   │       └── gallery_media/
│   │           ├── img1.jpg - img20.jpg  # Gallery images
│   │           └── vid2.mp4 - vid9.mp4   # Gallery videos
│   └── index.html
├── server/
│   ├── index.ts                      # Express server
│   ├── routes.ts                     # API routes
│   └── vite.ts                       # Vite integration
├── attached_assets/                  # User-uploaded media
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## Detailed Page Documentation

### 1. Welcome Page (`/`)
**File**: `client/src/pages/welcome.tsx`

**Purpose**: Entry point with personalized greeting and interactive pixel reveal

**Features**:
- WebGL fluid simulation cursor effect (`SplashCursor`)
- Blur-to-clear text animation for "Hello, you!"
- Pixel transition from cat image to START button
- Random gradient selection on button hover
- Multi-panel swipe transition to next page

**Technical Details**:
```typescript
// Fluid cursor background
<SplashCursor backgroundColor="#000000" />

// Animated greeting
<BlurText text="Hello, you!" delay={200} direction="top" />

// Pixel transition effect
<PixelTransition
  gridSize={5}
  firstContent={<img src={catImage} />}
  secondContent={<AnimatedButton>START</AnimatedButton>}
  animationStepDuration={0.4}
/>
```

**Navigation**: Takes user to Intro page with fade-swipe transition

---

### 2. Intro Page (`/intro`)
**File**: `client/src/pages/intro.tsx`

**Purpose**: Greeting page with personalized message for Aarohi

**Features**:
- Floating CSS particles in cyan color
- Two-line text reveal:
  - Line 1: "Hello Aarohi (The Blue) :)" with "(The Blue)" highlighted in cyan
  - Line 2: "Are You Ready For The Surprise ?"
- GSAP staggered word animation (150ms delay between words)
- Animated button: "See The Surprise" with click spark effect
- Direct navigation to Counter page (skips Main page)

**Technical Details**:
```typescript
// Particle background
<ParticlesCSS count={30} color="#00d4ff" blur={true} />

// Multi-line word animation
const lines = [
  { text: "Hello Aarohi (The Blue) :)", highlightWords: ["(The", "Blue)"] },
  { text: "Are You Ready For The Surprise ?", highlightWords: [] }
];

gsap.fromTo(allElements,
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, stagger: 0.15, duration: 1.5 }
);

// Click spark effect
<ClickSpark color="white" sparkSize={56} count={20}>
  <AnimatedButton onClick={() => setLocation('/counter')}>
    See The Surprise
  </AnimatedButton>
</ClickSpark>
```

**Navigation**: Takes user directly to Counter page

---

### 3. Main Page (`/main`)
**File**: `client/src/pages/landing.tsx`

**Purpose**: Primary interactive scroll experience with personalized message

**Features**:
- WebGL liquid chrome background (interactive with mouse)
- 300vh scroll container for smooth scrolling experience
- Scroll-triggered text: "Hello Aarohi (The Blue) :)"
- Second message: "Are You Ready To The Surprise ?"
- Scroll instruction that fades out
- Glass surface button: "See The Surprise"
- Button appears only after scrolling to reveal all text

**Technical Details**:
```typescript
// Interactive WebGL background
<LiquidChrome
  baseColor={[0, 0.1, 0.1]}
  speed={0.3}
  amplitude={0.3}
  interactive={true}
/>

// Scroll-triggered floating text
<ScrollFloat
  text="Hello Aarohi (The Blue) :)"
  blueText="(The Blue)"
  scrollStart="top bottom-=20%"
  scrollEnd="center center"
  stagger={0.07}
/>

// Glass button with WebGL distortion
<GlassSurface
  onClick={() => navigate('/counter')}
  blur={11}
  brightness={54}
  distortionScale={-180}
>
  See The Surprise
</GlassSurface>
```

**Navigation**: Takes user to Counter page

---

### 4. Counter Page (`/counter`)
**File**: `client/src/pages/counter.tsx`

**Purpose**: Animated counter that slowly counts to 18 with realistic confetti blast

**Features**:
- **Black background** for dramatic effect
- Large animated counter from 0 to 18 (5 second duration for slower counting)
- **NO subtitle** - only the number is displayed
- Realistic confetti explosion when counter reaches 18
- **Confetti blast sound effect** (party horn sound)
- Multi-origin confetti (left, right, and center)
- Colorful confetti with 10 vibrant colors
- 4-second continuous celebration
- Automatic navigation to birthday wish page after confetti

**Technical Details**:
```typescript
// Confetti sound effect
useEffect(() => {
  confettiAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
  confettiAudioRef.current.volume = 0.6;
}, []);

// Slower animated counter (5 seconds)
<CountUp
  from={0}
  to={18}
  duration={5}
  className="text-[clamp(8rem,20vw,16rem)] font-bold text-white"
  onEnd={handleCountComplete}
/>

// Realistic confetti celebration
const handleCountComplete = () => {
  // Play confetti sound
  confettiAudioRef.current.play();

  const duration = 4000;
  const defaults = {
    startVelocity: 45,
    spread: 360,
    ticks: 90,
    gravity: 1.2,
    decay: 0.94,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ffa500', '#ff1493', '#00d4ff']
  };

  const interval = setInterval(() => {
    const particleCount = 80 * (timeLeft / duration);

    // Three confetti sources
    confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0 } });
    confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0 } });
    confetti({ ...defaults, particleCount: particleCount * 0.5, origin: { x: 0.5, y: 0.3 } });
  }, 150);

  // Navigate after 5 seconds (1 second delay after confetti ends)
  setTimeout(() => navigate('/birthday-wish'), 5000);
};
```

**Navigation**: Automatically navigates to Birthday Wish page after confetti

---

### 5. Birthday Wish Page (`/birthday-wish`)
**File**: `client/src/pages/birthday-wish.tsx`

**Purpose**: Main birthday celebration with customized galaxy background and glass morphism buttons

**Features**:
- **WebGL Galaxy Background** (matching reference image):
  - Interactive star field with mouse interaction
  - Customized settings to match reference:
    - density=2.5 (slightly less dense for cleaner look)
    - glowIntensity=0.7 (brighter stars)
    - saturation=0.7
    - hueShift=147° (teal-cyan color palette)
    - twinkleIntensity=0.3 (subtle twinkling)
    - rotationSpeed=0.1 (slower rotation)
    - transparent=false (solid black background)

- **Curved Loop Animation** (top of page):
  - Text: "HAPPY BIRTHDAY AAROHI"
  - Word "AAROHI" highlighted in cyan (#00d4ff)
  - Continuous curved marquee animation
  - Interactive (draggable)

- **Birthday Piano Music**:
  - Fades in from volume 0 to 0.7 over ~1.4 seconds
  - Loops continuously
  - Cross-fades to "Tum Se Hi" when navigating to gallery

- **Interactive Wish Flow with Glass Morphism**:
  1. **Glass button** appears after 2 seconds: "To: बरसाने वाली"
     - GlassSurface component with chromatic aberration effect
     - Hover scale animation (1.05x)
     - Beautiful glass distortion effect
  2. Click button triggers **disappear animation** (scale 0 with back ease)
  3. SplitText animation with word-by-word reveal:
     - "Happy Birthday Aarohi (GEET) :) !! Always Stays Happy And In A Blissful State . As Always You Are. Happy Birthday 🎂"
     - Duration: 2 seconds
     - Ease: power3.out
     - Delay: 70ms between words
  4. **6 seconds after text completes**, show "Birthday Present 🎁" **glass button**
     - Same glass morphism effect
     - Larger and more prominent
  5. Button triggers music cross-fade and navigates to gallery

**Technical Details**:
```typescript
// Galaxy background (matching reference image)
<Galaxy
  mouseInteraction={true}
  density={2.5}
  glowIntensity={0.7}
  saturation={0.7}
  hueShift={147}
  twinkleIntensity={0.3}
  rotationSpeed={0.1}
  speed={0.7}
  transparent={false}
/>

// Glass morphism button (To: बरसाने वाली)
<GlassSurface
  width="auto"
  height="auto"
  borderRadius={16}
  brightness={40}
  opacity={0.85}
  blur={15}
  distortionScale={-200}
  onClick={handleStartTextAnimation}
  className="cursor-pointer hover:scale-105 transition-transform"
>
  <div className="px-8 py-6 text-white text-xl font-semibold">
    To: बरसाने वाली
  </div>
</GlassSurface>

// Button disappear animation
const handleStartTextAnimation = () => {
  gsap.to(wishButtonRef.current, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.in(1.7)',
    onComplete: () => setShowTextAnimation(true)
  });
};

// Birthday Present glass button (appears after 6 seconds)
<GlassSurface
  borderRadius={20}
  brightness={45}
  opacity={0.9}
  blur={15}
  distortionScale={-220}
  onClick={handleGalleryClick}
  className="cursor-pointer hover:scale-105"
>
  <div className="px-12 py-8 text-white text-2xl font-semibold">
    Birthday Present 🎁
  </div>
</GlassSurface>

// Music cross-fade to gallery music
const handleGalleryClick = () => {
  tumSeHiRef.current = new Audio(tumSeHi);
  tumSeHiRef.current.loop = true;
  tumSeHiRef.current.volume = 0;
  tumSeHiRef.current.play();

  // Cross-fade: birthday piano fades out, Tum Se Hi fades in
  const crossFade = setInterval(() => {
    birthdayVol -= 0.05;
    tumSeHiVol += 0.025;
    audioRef.current.volume = Math.max(birthdayVol, 0);
    tumSeHiRef.current.volume = Math.min(tumSeHiVol, 0.5);
  }, 50);
};
```

**Navigation**: "Birthday Present 🎁" glass button takes user to Gallery page with music cross-fade

---

### 6. Gallery Page (`/gallery`)
**File**: `client/src/pages/gallery.tsx`

**Purpose**: 3D dome gallery showcasing photos and videos with ambient color extraction and responsive music

**Features**:
- **3D Dome Gallery**:
  - 20 images + 6 videos arranged on sphere (26 total items)
  - Landscape orientation for images: img7, img14, img15, img16, img17, img18, img19, img20
  - Portrait orientation for remaining images
  - 360° horizontal rotation (drag to spin)
  - Items shuffled randomly to avoid adjacent duplicates
  - Click to view full-screen media
  - Proper aspect ratios maintained for all devices

- **Background Music with Ambient Effect**:
  - "Tum Se Hi (Instrumental)" starts at 0.5 volume (cross-faded from birthday page)
  - Loops continuously
  - **Ambient music effect**: Volume automatically lowers to 0.15 when video plays
  - Volume smoothly returns to 0.5 when video pauses/ends
  - Creates immersive experience where background music and video audio blend

- **Ambient Color Extraction with Reduced Blur**:
  - Extracts dominant color from clicked media
  - Smooth 1-second transition to new background color
  - **Reduced blur** (opacity 0.6) to show ambient colors more clearly
  - Overlay blur color set to `rgba(0, 0, 0, 0.3)` for better color visibility
  - Color darkened for better readability
  - Works for both images and videos

- **Media List** (26 total items):
  - **Images**: img1-img20 (20 images)
  - **Videos**: vid2, vid3, vid6, vid7, vid8, vid9 (6 videos)
  - **REMOVED**: vid4.mp4 (excluded per requirements)

- **Responsive Design**:
  - Text sizes adapt to device screen size using clamp()
  - Images and videos display correctly in landscape/portrait
  - Touch-optimized for mobile devices
  - Proper sizing on tablets and desktops

**Technical Details**:
```typescript
// Music starts at 0.5 volume (already cross-faded from birthday page)
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = 0.5;
    audioRef.current.play();
  }
}, []);

// Ambient music effect when video plays
useEffect(() => {
  const targetVolume = isVideoPlaying ? 0.15 : 0.5;
  const currentVolume = audioRef.current.volume;
  const step = (targetVolume - currentVolume) / 10;

  // Smooth volume transition
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 10) {
      clearInterval(interval);
      audioRef.current.volume = targetVolume;
      return;
    }
    audioRef.current.volume += step;
    count++;
  }, 50);
}, [isVideoPlaying]);

// Listen for video play/pause events
document.addEventListener('play', () => setIsVideoPlaying(true), true);
document.addEventListener('pause', () => setIsVideoPlaying(false), true);

// Media array with orientations
const galleryMedia = [
  { src: img1, alt: 'Memory 1', type: 'image' },
  { src: img7, alt: 'Memory 7', type: 'image', orientation: 'landscape' },
  { src: img14, alt: 'Memory 14', type: 'image', orientation: 'landscape' },
  { src: img15, alt: 'Memory 15', type: 'image', orientation: 'landscape' },
  { src: img16, alt: 'Memory 16', type: 'image', orientation: 'landscape' },
  { src: img17, alt: 'Memory 17', type: 'image', orientation: 'landscape' },
  { src: img18, alt: 'Memory 18', type: 'image', orientation: 'landscape' },
  { src: img19, alt: 'Memory 19', type: 'image', orientation: 'landscape' },
  { src: img20, alt: 'Memory 20', type: 'image', orientation: 'landscape' },
  { src: vid2, alt: 'Video 2', type: 'video' },
  { src: vid3, alt: 'Video 3', type: 'video' },
  { src: vid6, alt: 'Video 6', type: 'video' },
  { src: vid7, alt: 'Video 7', type: 'video' },
  { src: vid8, alt: 'Video 8', type: 'video' },
  { src: vid9, alt: 'Video 9', type: 'video' },
  // vid4.mp4 REMOVED
];

// Shuffle array to prevent adjacent duplicates
const shuffled = shuffleArray(galleryMedia);

// Dome gallery with reduced blur for better ambient colors
<DomeGallery
  images={shuffledMedia}
  fit={1}
  minRadius={300}
  segments={34}
  dragDampening={2}
  overlayBlurColor="rgba(0, 0, 0, 0.3)"
  grayscale={false}
  onMediaClick={handleMediaClick}
/>

// Background with ambient color (60% opacity for better color visibility)
<div
  className="absolute inset-0 transition-colors duration-1000"
  style={{ backgroundColor: bgColor, opacity: 0.6 }}
/>

// Color extraction (unchanged)
const extractDominantColor = async (src, type) => {
  // 1. Load media in canvas
  // 2. Sample 100x100 pixel area
  // 3. Calculate average RGB values
  // 4. Darken for background use (brightness factor)
  // 5. Return rgb() color string
};
```

**3D Dome Algorithm** (unchanged):
```
1. Create grid of positions on spherical surface
2. Map media items to grid positions
3. Shuffle to prevent adjacent duplicates
4. Apply CSS 3D transforms:
   - rotateY() for horizontal position
   - rotateX() for vertical position
   - translateZ() to push onto sphere surface
5. Drag gesture rotates entire sphere
6. Click opens media in full-screen overlay
```

---

## Component Documentation

### Galaxy Component
**File**: `client/src/components/Galaxy.tsx`

WebGL shader-based galaxy/star field effect with interactive features.

**Features**:
- Procedurally generated stars using noise functions
- Star twinkle effect with configurable intensity
- Hue shifting for color customization
- Mouse interaction (repulsion or attraction)
- Auto-rotation
- Configurable density, glow, and saturation

**Props**:
```typescript
{
  focal: [0.5, 0.5],              // Center point
  density: 3,                      // Star density
  glowIntensity: 0.6,             // Star glow brightness
  saturation: 0.7,                // Color saturation
  hueShift: 150,                  // Color hue (0-360)
  twinkleIntensity: 1,            // Twinkle amount
  rotationSpeed: 0.2,             // Auto-rotation speed
  speed: 0.7,                     // Animation speed
  mouseInteraction: true,         // Enable mouse effects
  transparent: true               // Transparent background
}
```

### CurvedLoop Component
**File**: `client/src/components/CurvedLoop.tsx`

SVG-based curved text marquee with optional text highlighting.

**Features**:
- Text follows curved path
- Continuous looping animation
- Draggable/interactive
- Custom highlighting for specific words
- Configurable curve amount and speed

**Props**:
```typescript
{
  marqueeText: "HAPPY BIRTHDAY AAROHI",
  speed: 2,                       // Animation speed
  curveAmount: 400,               // Curve depth
  direction: "left",              // Animation direction
  interactive: true,              // Enable dragging
  highlightWord: "AAROHI",        // Word to highlight
  highlightColor: "#00d4ff"       // Highlight color
}
```

### CountUp Component
**File**: `client/src/components/CountUp.tsx`

Animated number counter using Framer Motion springs.

**Features**:
- Smooth spring-based animation
- Customizable duration and delay
- Callbacks for start/end events
- Decimal and separator support
- Intersection observer triggering

**Props**:
```typescript
{
  from: 0,
  to: 18,
  duration: 3,                    // Animation duration
  delay: 0,                       // Start delay
  onStart: () => {},              // Start callback
  onEnd: () => {},                // End callback
  separator: "",                  // Thousands separator
  className: "text-8xl"
}
```

### DomeGallery Component
**File**: `client/src/components/DomeGallery.tsx`

3D sphere gallery using CSS 3D transforms and gesture controls.

**Features**:
- Items arranged on spherical surface
- 360° horizontal drag rotation
- Vertical rotation constraints
- Momentum/inertia on drag release
- Click to view media full-screen
- Video playback support
- Grayscale filter option

**Algorithm**:
1. Generate grid coordinates for sphere surface
2. Calculate rotation angles for each position
3. Apply CSS 3D transforms (rotateX, rotateY, translateZ)
4. Handle drag gestures with velocity tracking
5. Apply momentum after drag release
6. Clamp vertical rotation to prevent over-rotation

---

## Music & Audio

### Birthday Piano Music
- **File**: `client/src/assets/music/birthday-piano.mp3`
- **Plays on**: Birthday Wish page
- **Behavior**:
  - Fades in from 0 to 0.7 volume over ~1.4 seconds
  - Loops continuously
  - Fades out when navigating away (0.1 volume decrease every 50ms)

### Tum Se Hi Instrumental
- **File**: `client/src/assets/music/tum-se-hi.mp3`
- **Plays on**: Gallery page
- **Behavior**:
  - Fades in from 0 to 0.5 volume over ~1 second
  - Loops continuously
  - Creates ambient background for gallery viewing
  - Volume can be adjusted when videos play (future enhancement)

---

## Gallery Media

### Images (20 total)
- **Portrait orientation**: img1-6, img8-13
- **Landscape orientation**: img7, img14-20
- All images displayed in 3D dome arrangement
- Shuffled to prevent adjacent duplicates

### Videos (6 total)
- vid2.mp4
- vid3.mp4
- vid6.mp4
- vid7.mp4
- vid8.mp4
- vid9.mp4
- **Excluded**: vid4.mp4 (removed per requirements)

---

## Build & Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs on `http://localhost:5000` (or Replit URL)

### Production Build
```bash
npm run build
```

### Environment Variables
All assets use relative imports - no environment variables needed.

---

## Browser Support

- **Modern browsers** with WebGL support (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** with CSS 3D transform support
- **Recommended**: Latest Chrome or Firefox for best performance

---

## Performance Considerations

1. **WebGL Shaders**: Galaxy and liquid chrome use GPU rendering
2. **Image Optimization**: Gallery images should be optimized for web
3. **Video Loading**: Videos load on-demand when gallery opens
4. **Animation Performance**: GSAP uses hardware acceleration
5. **3D Transforms**: CSS 3D uses GPU compositing

---

## User Experience Flow

```
1. WELCOME
   → User sees greeting with fluid cursor
   → Cat image pixelates into START button
   → Click START triggers multi-panel transition

2. INTRO
   → Floating particles appear
   → Text reveals word-by-word
   → READY button with spark effect
   → Click navigates to main page

3. MAIN
   → Liquid chrome background responds to mouse
   → Scroll slowly to reveal messages
   → "See The Surprise" button appears
   → Click navigates to counter

4. COUNTER
   → Numbers count from 0 to 18
   → Confetti celebrates at 18
   → Auto-navigate to birthday wish

5. BIRTHDAY WISH
   → Galaxy background loads
   → Curved "HAPPY BIRTHDAY AAROHI" animates
   → Piano music fades in
   → Click "To: बरसाने वाली" button
   → Birthday message animates word-by-word
   → "Birthday Present 🎁" button appears
   → Click navigates to gallery

6. GALLERY
   → Music crossfades to instrumental
   → 3D dome with 26 media items
   → Drag to rotate sphere
   → Click media for full-screen view
   → Background color adapts to media
```

---

## Special Features

### 1. Smart Text Highlighting
- Automatic highlighting of specific words in cyan
- Works in ScrollFloat, SplitText, and CurvedLoop components

### 2. Confetti Celebration
- Dual-origin confetti (left and right sides)
- 50 particles per burst
- 360° spread pattern
- 3-second continuous celebration

### 3. Color Extraction
- Analyzes media for dominant colors
- Darkens for better text readability
- Smooth 1-second transitions
- Works with images and videos

### 4. Music Transitions
- Smooth fade-in/fade-out (100ms intervals)
- Volume control for ambient effects
- Automatic cleanup on page navigation

### 5. Galaxy Interaction
- Stars repel/attract based on mouse position
- Continuous twinkling animation
- Auto-rotation for dynamic effect
- Customizable color palette

---

## Credits

Built with Freindship for Aarohi's 18th Birthday

**Technologies**: React, TypeScript, GSAP, OGL, Tailwind CSS, shadcn/ui, Canvas Confetti, Motion

**Special Components**: Galaxy shader, DomeGallery, LiquidChrome, CurvedLoop

---

## License

Personal birthday project - All rights reserved.
