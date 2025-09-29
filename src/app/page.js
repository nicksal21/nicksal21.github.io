'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, AreaChart, Activity, Layers, TrendingUp, Database, BrainCircuit, BarChartHorizontal, Home, User, Mail, Menu, X, Briefcase } from 'lucide-react';
import projectsData from '@/data/projects.json';

// Sage green color scheme
const colors = {
  primary: '#7D9D7F',
  primaryDark: '#5A7A5C',
  primaryLight: '#B0C4B1',
  background: '#F7F9F7',
  text: '#2D3B2D',
  textLight: '#4A5D4A',
  accent: '#D0E0D1',
  border: '#C8D5C8',
};

// Global styles
const globalStyles = {
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: '1.5',
  color: colors.text,
};

// Icon mapping
const iconMap = {
  LineChart: LineChart,
  Layers: Layers,
  BrainCircuit: BrainCircuit,
  TrendingUp: TrendingUp,
  AreaChart: AreaChart,
  BarChart3: BarChart3
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation links - reordered with About first
  const navLinks = [
    { id: 'about', label: 'About', icon: <User style={{...navIconStyle, color: colors.textLight}} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase style={{...navIconStyle, color: colors.textLight}} /> },
    { id: 'contact', label: 'Contact', icon: <Mail style={{...navIconStyle, color: colors.textLight}} /> }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle navigation with smooth scroll
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 73; // Header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
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
          <button
            onClick={() => scrollToSection('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
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
              fontSize: isMobile ? '16px' : '22px',
              fontWeight: 'bold',
              color: colors.text
            }}>Nicholas Salazar&apos;s DataSci Portfolio</h1>
          </button>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav>
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
                        fontWeight: activeSection === link.id ? 'bold' : 'normal',
                        color: activeSection === link.id ? colors.primary : colors.textLight,
                        padding: '8px 0',
                        borderBottom: activeSection === link.id ? `2px solid ${colors.primary}` : '2px solid transparent',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => scrollToSection(link.id)}
                    >
                      {link.icon} {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? 
                <X size={24} color={colors.text} /> : 
                <Menu size={24} color={colors.text} />
              }
            </button>
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '73px',
          left: 0,
          right: 0,
          background: 'white',
          zIndex: 9,
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
                    background: activeSection === link.id ? colors.accent : 'white',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '16px 24px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: activeSection === link.id ? 'bold' : 'normal',
                    color: activeSection === link.id ? colors.primary : colors.textLight
                  }}
                  onClick={() => scrollToSection(link.id)}
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
        width: '100%'
      }}>
        {/* About Section - Moved to top */}
        <section id="about" style={{
          padding: '64px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <AboutSection />
        </section>

        {/* Projects Section */}
        <section id="projects" style={{
          padding: '48px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          minHeight: '100vh',
          background: 'white'
        }}>
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          padding: '48px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          minHeight: '100vh'
        }}>
          <ContactSection />
        </section>
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
            © 2024 Nicholas Salazar. Built with Next.js and ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

// Simplified About Section Component
const AboutSection = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: '48px',
      width: '100%'
    }}>
      {/* Profile Image */}
      <div style={{
        flex: '0 0 280px',
        maxWidth: '280px',
        width: '100%'
      }}>
        <div style={{
          background: colors.primary,
          borderRadius: '12px',
          width: '100%',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(125, 157, 127, 0.2)'
        }}>
          <User size={120} color="white" style={{ opacity: 0.9 }} />
        </div>
      </div>

      {/* About Text */}
      <div style={{ flex: 1 }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          color: colors.text 
        }}>
          Hi, I&apos;m Nicholas Salazar
        </h2>
        <p style={{ 
          color: colors.textLight,
          fontSize: '18px',
          marginBottom: '20px',
          lineHeight: '1.8'
        }}>
          I&apos;m a data scientist and web developer passionate about creating interactive data experiences. I specialize in building applications that make complex data accessible and actionable.
        </p>
        <p style={{ 
          color: colors.textLight,
          fontSize: '18px',
          lineHeight: '1.8',
          marginBottom: '24px'
        }}>
          With a background in both computer science and statistics, I bridge the gap between robust analysis and user-friendly interfaces. I&apos;m particularly interested in visualization techniques that reveal patterns and insights in large datasets.
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '12px 24px',
              background: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.primary;
            }}
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '12px 24px',
              background: 'white',
              color: colors.primary,
              border: `2px solid ${colors.primary}`,
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const projects = projectsData.projects;
  const categories = projectsData.categories;
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
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
          maxWidth: '800px'
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
              background: selectedCategory === category.id ? colors.primary : colors.background,
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredProjects.map(project => {
          const IconComponent = iconMap[project.icon];
          return (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                style={{
                  background: colors.background,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(125, 157, 127, 0.15)',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(125, 157, 127, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(125, 157, 127, 0.15)';
                }}
              >
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
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
                      {IconComponent && <IconComponent style={{ ...iconStyle, color: project.iconColor }} />}
                    </div>
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
                    lineHeight: '1.6',
                    flex: 1
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
                      Featured Technologies:
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '6px' 
                    }}>
                      {project.libraries.map((library, index) => (
                        <span 
                          key={index} 
                          style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: 'white',
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          {library}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
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
                  background: colors.background,
                  boxSizing: 'border-box'
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
                  background: colors.background,
                  boxSizing: 'border-box'
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
                  background: colors.background,
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
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
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.primary;
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
                    color: colors.textLight,
                    margin: 0
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
                    color: colors.textLight,
                    margin: 0,
                    lineHeight: '1.6'
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

// Add isMobile to the global scope for use in components
let isMobile = false;
if (typeof window !== 'undefined') {
  isMobile = window.innerWidth < 768;
}

export default DataSciencePortfolio;