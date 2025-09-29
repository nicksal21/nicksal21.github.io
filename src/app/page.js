'use client'

import Image from "next/image";
import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, AreaChart, Activity, Layers, TrendingUp, Database, BrainCircuit, BarChartHorizontal, Home, User, Mail, Menu, X } from 'lucide-react';

// Sage green color scheme
const colors = {
  primary: '#7D9D7F',      // Medium sage green
  primaryDark: '#5A7A5C',  // Darker sage green
  primaryLight: '#B0C4B1', // Lighter sage green
  background: '#F7F9F7',   // Very light sage green background
  text: '#2D3B2D',         // Dark green for text
  textLight: '#4A5D4A',    // Medium green for secondary text
  accent: '#D0E0D1',       // Very light sage for accents
  border: '#C8D5C8',       // Light sage for borders
};

// Global styles
const globalStyles = {
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: '1.5',
  color: colors.text,
};

// Consistent icon style
const iconStyle = {
  width: "40px",
  height: "40px",
  minWidth: "40px", 
  minHeight: "40px",
  display: "block"
};

// Navigation icon style (smaller)
const navIconStyle = {
  width: "20px",
  height: "20px",
  minWidth: "20px", 
  minHeight: "20px"
};

// Portfolio App
const DataSciencePortfolio = () => {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home', icon: <Home style={{...navIconStyle, color: colors.textLight}} /> },
    { id: 'about', label: 'About', icon: <User style={{...navIconStyle, color: colors.textLight}} /> },
    { id: 'contact', label: 'Contact', icon: <Mail style={{...navIconStyle, color: colors.textLight}} /> }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle navigation
  const navigate = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <div style={{
      ...globalStyles,
      maxWidth: '100%',
      minHeight: '100vh',
      background: colors.background,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '16px 24px',
        boxShadow: '0 2px 8px rgba(125, 157, 127, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: colors.primary,
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart3 size={24} color="white" />
            </div>
            <h1 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 'bold',
              color: colors.text
            }}>Nicholas Salazar&apos;s DataSci Portfolio</h1>
          </div>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            '@media (minWidth: 768px)': {
              display: 'flex'
            }
          }}>
            <ul style={{
              display: 'flex',
              gap: '32px',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: activePage === link.id ? 'bold' : 'normal',
                      color: activePage === link.id ? colors.primary : colors.textLight,
                      padding: '8px 0',
                      borderBottom: activePage === link.id ? `2px solid ${colors.primary}` : '2px solid transparent',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => navigate(link.id)}
                  >
                    {link.icon} {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '@media (minWidth: 768px)': {
                display: 'none'
              }
            }}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? 
              <X size={24} color={colors.text} /> : 
              <Menu size={24} color={colors.text} />
            }
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '73px', // Height of header
          left: 0,
          right: 0,
          background: 'white',
          zIndex: 5,
          boxShadow: '0 4px 8px rgba(125, 157, 127, 0.1)',
          borderBottom: `1px solid ${colors.border}`
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: '8px 0'
          }}>
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: activePage === link.id ? colors.accent : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '16px 24px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: activePage === link.id ? 'bold' : 'normal',
                    color: activePage === link.id ? colors.primary : colors.textLight
                  }}
                  onClick={() => navigate(link.id)}
                >
                  {link.icon} {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Home Page */}
        {activePage === 'home' && <HomePage />}
        
        {/* About Page */}
        {activePage === 'about' && <AboutPage />}
        
        {/* Contact Page */}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        padding: '24px',
        borderTop: `1px solid ${colors.border}`,
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{
            color: colors.textLight,
            fontSize: '14px',
            margin: 0
          }}>
            © 2023 DataSci Portfolio. Built with React and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

// Home Page Component (Projects Page)
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'visualization', name: 'Data Visualization' },
    { id: 'dashboard', name: 'Dashboards' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'analytics', name: 'Analytics Tools' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'Real-time Financial Dashboard',
      description: 'Create a dashboard that displays stock market data in real-time with multiple visualization types.',
      category: 'dashboard',
      difficulty: 'Medium',
      icon: <LineChart style={{ ...iconStyle, color: colors.primary }} />,
      libraries: ['Recharts', 'React Query', 'Financial APIs (Alpha Vantage, Polygon)'],
      features: ['Multiple chart types', 'Real-time data updates', 'Historical comparisons', 'Custom indicators']
    },
    {
      id: 2,
      title: 'Interactive Data Explorer',
      description: 'Build a tool that allows users to upload CSV/Excel files and interactively explore the data with dynamically generated visualizations.',
      category: 'visualization',
      difficulty: 'Medium',
      icon: <Layers style={{ ...iconStyle, color: colors.primaryDark }} />,
      libraries: ['Papaparse', 'SheetJS', 'D3.js/Recharts', 'React Dropzone'],
      features: ['File upload & parsing', 'Data summary statistics', 'Custom chart generation', 'Data filtering & sorting']
    },
    {
      id: 3,
      title: 'ML Model Playground',
      description: 'Develop an interface for users to interact with pre-trained machine learning models and see predictions in real-time.',
      category: 'ml',
      difficulty: 'Hard',
      icon: <BrainCircuit style={{ ...iconStyle, color: colors.primary }} />,
      libraries: ['TensorFlow.js', 'Plotly', 'React Hook Form'],
      features: ['Input parameter controls', 'Visualized predictions', 'Multiple model support', 'Result explanations']
    },
    {
      id: 4,
      title: 'Business KPI Tracker',
      description: 'Create a comprehensive dashboard for tracking business KPIs with drill-down capabilities and alerts.',
      category: 'dashboard',
      difficulty: 'Medium',
      icon: <TrendingUp style={{ ...iconStyle, color: colors.primaryDark }} />,
      libraries: ['Recharts/D3.js', 'React Table', 'Context API'],
      features: ['Custom KPI cards', 'Goal tracking', 'Historical trends', 'Data export']
    },
    {
      id: 5,
      title: 'Geospatial Data Visualizer',
      description: 'Build an interactive map-based visualization tool for exploring geographic data patterns.',
      category: 'visualization',
      difficulty: 'Medium',
      icon: <AreaChart style={{ ...iconStyle, color: colors.primary }} />,
      libraries: ['React Leaflet/MapboxGL', 'D3-geo', 'GeoJSON utilities'],
      features: ['Interactive maps', 'Data overlays', 'Clustering', 'Custom region selection']
    },
    {
      id: 6,
      title: 'A/B Test Results Analyzer',
      description: 'Develop a tool for uploading, analyzing, and visualizing A/B test results with statistical significance calculations.',
      category: 'analytics',
      difficulty: 'Medium',
      icon: <BarChart3 style={{ ...iconStyle, color: colors.primaryDark }} />,
      libraries: ['Recharts', 'Math.js', 'React Table'],
      features: ['Statistical tests', 'Confidence intervals', 'Visual comparisons', 'Sample size calculator']
    }
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  const difficultyStyles = {
    Easy: { background: '#D0E0D1', color: '#2D3B2D' },
    Medium: { background: '#B0C4B1', color: '#2D3B2D' },
    Hard: { background: '#7D9D7F', color: '#F7F9F7' }
  };
  
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          color: colors.text 
        }}>
          Data Science Projects
        </h2>
        <p style={{ 
          color: colors.textLight,
          fontSize: '16px',
          maxWidth: '700px'
        }}>
          Explore these project ideas to build your portfolio and practice your React and data science skills. Each project is designed to showcase different aspects of data analysis and visualization.
        </p>
      </div>
      
      {/* Category Filters */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '8px', 
        marginBottom: '32px'
      }}>
        {categories.map(category => (
          <button
            key={category.id}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              background: selectedCategory === category.id ? colors.primary : 'white',
              color: selectedCategory === category.id ? 'white' : colors.textLight,
              border: `1px solid ${colors.border}`,
              cursor: 'pointer',
              fontWeight: selectedCategory === category.id ? '600' : '400',
              fontSize: '14px',
              outline: 'none'
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '24px',
        '@media (minWidth: 640px)': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        '@media (minWidth: 1024px)': {
          gridTemplateColumns: 'repeat(3, 1fr)'
        }
      }}>
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(125, 157, 127, 0.15)',
              transition: 'all 0.3s ease',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ padding: '24px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '16px'
              }}>
                <div style={{ 
                  padding: '12px', 
                  borderRadius: '9999px', 
                  background: colors.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {project.icon}
                </div>
                <span style={{ 
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  ...difficultyStyles[project.difficulty]
                }}>
                  {project.difficulty}
                </span>
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '8px', 
                color: colors.text 
              }}>
                {project.title}
              </h3>
              <p style={{ 
                marginBottom: '16px', 
                color: colors.textLight,
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {project.description}
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: colors.text 
                }}>
                  Key Features:
                </h4>
                <ul style={{ 
                  fontSize: '14px',
                  marginLeft: '0',
                  paddingLeft: '0',
                  listStyle: 'none'
                }}>
                  {project.features.map((feature, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      marginBottom: '4px' 
                    }}>
                      <span style={{ 
                        marginRight: '8px', 
                        color: colors.primary 
                      }}>•</span>
                      <span style={{ color: colors.textLight }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: colors.text 
                }}>
                  Suggested Libraries:
                </h4>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px' 
                }}>
                  {project.libraries.map((library, index) => (
                    <span 
                      key={index} 
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: colors.accent,
                        color: colors.text
                      }}
                    >
                      {library}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  const skills = [
    { category: 'Programming', items: ['Python', 'JavaScript', 'R', 'SQL', 'Java'] },
    { category: 'Data Science', items: ['Machine Learning', 'Statistical Analysis', 'Data Visualization', 'NLP', 'Big Data'] },
    { category: 'Web Development', items: ['React', 'Node.js', 'HTML/CSS'] },
    { category: 'Tools', items: ['Jupyter', 'Git', 'Tableau', 'PowerBI'] }
  ];

  const education = [
    {
      degree: 'M.S. in Computer Science',
      institution: 'University of Florida',
      year: '2021-2024',
      description: 'Focused on machine learning algorithms, statistical modeling, and data visualization techniques.'
    },
    {
      degree: 'B.S. in Computer Science',
      institution: 'University of Florida',
      year: '2018-2021',
      description: 'Specialized in software engineering and database systems with a minor in Linguistics.'
    }
  ];

  return (
    <div>
      {/* About Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          color: colors.text 
        }}>
          About Me
        </h2>
        <p style={{ 
          color: colors.textLight,
          fontSize: '16px',
          maxWidth: '700px',
          marginBottom: '16px'
        }}>
          I&apos;m a data scientist and web developer passionate about creating interactive data experiences. I specialize in building applications that make complex data accessible and actionable.
        </p>
        <p style={{ 
          color: colors.textLight,
          fontSize: '16px',
          maxWidth: '700px'
        }}>
          With a background in both computer science and statistics, I bridge the gap between robust analysis and user-friendly interfaces. I&apos;m particularly interested in visualization techniques that reveal patterns and insights in large datasets.
        </p>
      </div>

      {/* Profile Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginBottom: '32px',
        '@media (minWidth: 768px)': {
          flexDirection: 'row'
        }
      }}>
        {/* Profile Image */}
        <div style={{
          flex: '0 0 280px',
          '@media (minWidth: 768px)': {
            flex: '0 0 320px'
          }
        }}>
          <div style={{
            background: colors.primary,
            borderRadius: '8px',
            width: '100%',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={120} color="white" style={{ opacity: 0.9 }} />
          </div>
        </div>

        {/* Skills */}
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginBottom: '16px', 
            color: colors.text 
          }}>
            Skills & Expertise
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '24px',
            '@media (minWidth: 640px)': {
              gridTemplateColumns: 'repeat(2, 1fr)'
            }
          }}>
            {skills.map((skillGroup, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '8px',
                padding: '16px',
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 4px rgba(125, 157, 127, 0.1)'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: colors.text
                }}>
                  {skillGroup.category}
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: colors.accent,
                      color: colors.text
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          color: colors.text 
        }}>
          Education
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {education.map((item, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              border: `1px solid ${colors.border}`,
              boxShadow: '0 2px 4px rgba(125, 157, 127, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: colors.text
                }}>
                  {item.degree}
                </h4>
                <span style={{
                  fontSize: '14px',
                  color: colors.primary,
                  fontWeight: '500'
                }}>
                  {item.year}
                </span>
              </div>
              <p style={{
                fontSize: '14px',
                color: colors.textLight,
                marginBottom: '8px'
              }}>
                {item.institution}
              </p>
              <p style={{
                fontSize: '14px',
                color: colors.textLight
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  return (
    <div>
      {/* Contact Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          color: colors.text 
        }}>
          Contact Me
        </h2>
        <p style={{ 
          color: colors.textLight,
          fontSize: '16px',
          maxWidth: '700px'
        }}>
          Interested in working together? Feel free to reach out through any of the methods below or fill out the contact form.
        </p>
      </div>

      {/* Contact Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '32px',
        '@media (minWidth: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      }}>
        {/* Contact Form */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(125, 157, 127, 0.15)',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: colors.text
          }}>
            Send a Message
          </h3>

          <form 
            action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" 
            method="POST"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px',
                color: colors.text
              }}>
                Name
              </label>
              <input 
                type="text" 
                name="name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '16px',
                  color: colors.text,
                  background: colors.background
                }}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px',
                color: colors.text
              }}>
                Email
              </label>
              <input 
                type="email" 
                name="email"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '16px',
                  color: colors.text,
                  background: colors.background
                }}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px',
                color: colors.text
              }}>
                Message
              </label>
              <textarea 
                name="message"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  fontSize: '16px',
                  color: colors.text,
                  minHeight: '120px',
                  resize: 'vertical',
                  background: colors.background
                }}
                placeholder="How can I help you?"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              style={{
                background: colors.primary,
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': {
                  background: colors.primaryDark
                }
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(125, 157, 127, 0.15)',
            border: `1px solid ${colors.border}`,
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: colors.text
            }}>
              Contact Information
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <Mail style={{ color: colors.primary, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: colors.text
                  }}>
                    Email
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: colors.textLight
                  }}>
                    contact@datasciportfolio.com
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <User style={{ color: colors.primary, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: colors.text
                  }}>
                    Social Media
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: colors.textLight
                  }}>
                    LinkedIn: /in/datasci-portfolio<br />
                    GitHub: @datasci-portfolio<br />
                    Twitter: @datasci_portfolio
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(125, 157, 127, 0.15)',
            border: `1px solid ${colors.border}`
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: colors.text
            }}>
              Availability
            </h3>

            <p style={{
              fontSize: '14px',
              color: colors.textLight,
              marginBottom: '16px',
              lineHeight: '1.6'
            }}>
              I&apos;m currently available for freelance work and consulting. My typical response time is within 24 hours.
            </p>

            <div style={{
              padding: '12px 16px',
              background: colors.accent,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#4CAF50'
              }}></div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: colors.text
              }}>
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSciencePortfolio;