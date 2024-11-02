# Interactive Data Structures & Algorithms Visualizer

An interactive educational platform designed to help students understand data structures and algorithms and other subjects through visual demonstrations and hands-on practice.

## 🎯 Project Overview

This web application provides interactive visualizations for various concepts, for now with a focus on data structures and algorithms. Users can:
- Navigate through different subjects and topics
- Interact with live visualizations
- Practice with hands-on examples
- Test their knowledge through quizzes

## 🏗 Project Structure

```
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── components/
    │   ├── explanations/
    │   │   ├── data-structures/
    │   │   │   ├── DataStructures.jsx
    │   │   │   ├── Heap.jsx
    │   │   │   ├── HeapOperationsVisualizer.jsx
    │   │   │   └── HeapVisualizer.jsx
    │   │   └── leetcode/
    │   ├── reusable/
    │   │   ├── ExplanationTemplate.jsx
    │   │   └── Quiz.jsx
    │   └── ui/
    │       ├── button.jsx
    │       ├── card.jsx
    │       └── input.jsx
    ├── styles/
    │   ├── App.css
    │   └── index.css
    ├── App.js
    ├── index.js
    └── Home.jsx
```

## 🚀 Features

### 1. Interactive Topic Selection
- Main page displays available subjects
- Each subject contains multiple topics
- Clean and intuitive navigation

### 2. Educational Template
Each topic follows a consistent layout including:
- Clear overview and explanation
- Interactive visualizations
- Step-by-step demonstrations
- Knowledge check quizzes

### 3. Visualization Components
Custom-built visualizers for various concepts, including:
- Data structure operations
- Algorithm steps
- Real-time updates
- Color-coded states

### 4. Hands-on Practice
- Interactive examples
- Input-based demonstrations
- Step-by-step walkthroughs

## 💻 Technology Stack

- React.js for UI components
- Tailwind CSS for styling
- Custom visualization components
- Interactive quiz system

## 🎨 Design Philosophy

The project emphasizes:
- Clean, intuitive user interface
- Consistent educational experience
- Visual learning through interaction
- Immediate feedback and practice opportunities

## 📚 Component Structure

### Reusable Components
- `ExplanationTemplate.jsx`: Core template for all educational content
- `Quiz.jsx`: Reusable quiz component for knowledge testing

### UI Components
- Custom button, card, and input components for consistent styling

### Topic-Specific Components
- Specialized visualizers for different data structures and algorithms
- Interactive demonstrations of concepts

## 🔧 Usage

Navigate to [nazym.vercel.app](https://nazym-dev.vercel.app/)

## 📝 License

MIT License - feel free to use and modify for your educational needs!

---

Built with ❤️