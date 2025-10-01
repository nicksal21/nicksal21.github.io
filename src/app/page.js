'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, AreaChart, Activity, Layers, TrendingUp, Database, BrainCircuit, BarChartHorizontal, Home, User, Mail, Menu, X, Briefcase } from 'lucide-react';
import projectsData from '@/data/projects.json';

// Icon mapping
const iconMap = {
  LineChart: LineChart,
  Layers: Layers,
  BrainCircuit: BrainCircuit,
  TrendingUp: TrendingUp,
  AreaChart: AreaChart,
  BarChart3: BarChart3
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
  
  // Navigation links
  const navLinks = [
    { id: 'about', label: 'About', icon: <User className="icon-nav" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="icon-nav" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="icon-nav" /> }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle navigation with smooth scroll
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 73;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-content">
          {/* Logo */}
          <button onClick={() => scrollToSection('about')} className="logo-button">
            <div className="logo-icon">
              <BarChart3 size={24} color="white" />
            </div>
            <h1 className="logo-text">Nicholas Salazar&apos;s DataSci Portfolio</h1>
          </button>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="desktop-nav">
              <ul>
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button
                      className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
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
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? 
                <X size={24} /> : 
                <Menu size={24} />
              }
            </button>
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="mobile-nav">
          <ul>
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
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
      <main className="main-content">
        {/* About Section */}
        <section id="about" className="section">
          <AboutSection isMobile={isMobile} />
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-projects">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2024 Nicholas Salazar. Built with Next.js.
          </p>
        </div>
      </footer>
    </div>
  );
};

// About Section Component
const AboutSection = ({ isMobile }) => {
  return (
    <div className="about-container">
      {/* Profile Image */}
      <div className="about-image-wrapper">
        <div className="about-image">
          <User size={120} color="white" style={{ opacity: 0.9 }} />
        </div>
      </div>

      {/* About Text */}
      <div className="about-text">
        <h2 className="about-title">
          Hi, I&apos;m Nicholas Salazar
        </h2>
        <p className="about-paragraph">
          I&apos;m a data scientist and web developer passionate about creating interactive data experiences. I specialize in building applications that make complex data accessible and actionable.
        </p>
        <p className="about-paragraph">
          With a background in both computer science and statistics, I bridge the gap between robust analysis and user-friendly interfaces. I&apos;m particularly interested in visualization techniques that reveal patterns and insights in large datasets.
        </p>
        <div className="about-buttons">
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
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
      <div className="projects-header">
        <h2 className="projects-title">
          Data Science Projects
        </h2>
        <p className="projects-description">
          Explore these project ideas to build your portfolio and practice your React and data science skills. Each project is designed to showcase different aspects of data analysis and visualization.
        </p>
      </div>
      
      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => {
          const IconComponent = iconMap[project.icon];
          return (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-card-link"
            >
              <div className="project-card">
                <div className="project-card-content">
                  <div className="project-icon-wrapper">
                    <div className="project-icon">
                      {IconComponent && <IconComponent className="icon-standard" style={{ color: project.iconColor }} />}
                    </div>
                  </div>
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  <p className="project-description">
                    {project.description}
                  </p>
                  
                  <div className="project-features">
                    <h4 className="project-section-title">
                      Key Features:
                    </h4>
                    <ul className="project-features-list">
                      {project.features.map((feature, index) => (
                        <li key={index} className="project-feature-item">
                          <span className="project-feature-bullet">•</span>
                          <span className="project-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="project-section-title">
                      Featured Technologies:
                    </h4>
                    <div className="project-libraries">
                      {project.libraries.map((library, index) => (
                        <span key={index} className="library-tag">
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
      <div className="contact-header">
        <h2 className="contact-title">
          Contact Me
        </h2>
        <p className="contact-description">
          Interested in working together? Feel free to reach out through any of the methods below or fill out the contact form.
        </p>
      </div>

      {/* Contact Sections */}
      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <h3 className="contact-form-title">
            Send a Message
          </h3>

          <form 
            action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" 
            method="POST"
            className="contact-form"
          >
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message"
                className="form-textarea"
                placeholder="How can I help you?"
                required
              ></textarea>
            </div>

            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="contact-info-wrapper">
            <h3 className="contact-info-title">
              Contact Information
            </h3>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <Mail className="contact-info-icon" size={20} />
                <div>
                  <h4 className="contact-info-label">Email</h4>
                  <p className="contact-info-text">
                    contact@datasciportfolio.com
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <User className="contact-info-icon" size={20} />
                <div>
                  <h4 className="contact-info-label">Social Media</h4>
                  <p className="contact-info-text">
                    LinkedIn: /in/datasci-portfolio<br />
                    GitHub: @datasci-portfolio<br />
                    Twitter: @datasci_portfolio
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="availability-wrapper">
            <h3 className="availability-title">
              Availability
            </h3>

            <p className="availability-text">
              I&apos;m currently available for freelance work and consulting. My typical response time is within 24 hours.
            </p>

            <div className="availability-badge">
              <div className="availability-indicator"></div>
              <span className="availability-status">
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