# phiMind - Quantum Computing & AI Innovation Website

A modern, responsive website for phiMind, a company focused on quantum computing and AI innovation in healthcare. Built with React.js and featuring advanced animations, glitch effects, and a professional design.

## 🚀 Features

### Design & Animation
- **Floating Navbar**: Transforms from full-width to curved floating design on scroll
- **Logo Animation**: Dynamic transformation from "phiMind" to "ΦMind" with smooth transitions
- **Glitch Effects**: Minimal glitch animations on the hero section
- **Scroll Animations**: Smooth reveal animations using Framer Motion
- **Responsive Design**: Fully responsive across all devices

### Sections
1. **Hero Section**: 
   - Company name with animated transformation
   - Tagline "Beyond Classical, Into Quantum"
   - Glitch animation effects
   - Call-to-action buttons

2. **About Section**:
   - Company description with healthcare focus
   - Animated logo in section title
   - Feature highlights with hover effects
   - Quantum-themed visual elements

3. **Services Section**:
   - Internship opportunities
   - Workshop programs
   - Google Form integration for applications
   - Interactive service cards

4. **Footer**:
   - Animated company logo
   - Social media links (Instagram, Facebook, Twitter)
   - Back to top button
   - Copyright information

## 🎨 Color Palette

```css
--light-sky-blue: #97caedff;
--alice-blue: #dee9f2ff;
--seasalt: #fafafaff;
--cornflower-blue: #6399f1ff;
```

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Intersection Observer** - Scroll animations
- **CSS3** - Styling with custom properties
- **HTML5** - Semantic markup

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd phimind-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component with floating animation
│   ├── Navbar.css
│   ├── Hero.js            # Hero section with glitch effects
│   ├── Hero.css
│   ├── About.js           # About section with company info
│   ├── About.css
│   ├── Services.js        # Services section with forms
│   ├── Services.css
│   ├── Footer.js          # Footer with social links
│   └── Footer.css
├── App.js                 # Main app component
├── App.css
├── index.js              # React entry point
└── index.css             # Global styles
```

## 🎯 Key Features Implementation

### Navbar Animation
- Floating effect on scroll
- Logo transformation animation
- Smooth navigation with scroll-to-section

### Hero Section
- Glitch animation effects
- Company name transformation
- Responsive layout with content positioning

### Services Integration
- Google Form buttons for applications
- Interactive service cards
- Hover effects and animations

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Optimized animations for all screen sizes

## 🔧 Customization

### Updating Google Forms
Edit the form URLs in `src/components/Services.js`:
```javascript
formUrl: 'https://forms.google.com/your-actual-form-url'
```

### Social Media Links
Update social media URLs in `src/components/Footer.js`:
```javascript
url: 'https://instagram.com/your-actual-handle'
```

### Color Scheme
Modify the CSS custom properties in `src/index.css` to change the color scheme.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For questions or support, please contact the development team.

---

**phiMind** - Where AI Meets Quantum Reality
