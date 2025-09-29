import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';

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

export default function ProjectPage({ params }) {
  const project = projectsData.projects.find(p => p.slug === params.slug);

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.background
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: colors.text }}>
            Project Not Found
          </h1>
          <Link href="/" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      paddingBottom: '48px'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '16px 24px',
        boxShadow: '0 2px 8px rgba(125, 157, 127, 0.1)',
        borderBottom: `1px solid ${colors.border}`,
        marginBottom: '32px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <Link href="/#projects" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <article style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Title Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            {project.title}
          </h1>

          {/* Meta Information */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: colors.textLight,
              fontSize: '14px'
            }}>
              <Calendar size={16} />
              {project.date}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: colors.textLight,
              fontSize: '14px'
            }}>
              <Tag size={16} />
              {projectsData.categories.find(c => c.id === project.category)?.name || project.category}
            </div>
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px'
          }}>
            {project.tags.map((tag, index) => (
              <span key={index} style={{
                padding: '4px 12px',
                background: colors.accent,
                color: colors.text,
                borderRadius: '16px',
                fontSize: '14px'
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: colors.primary,
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background 0.3s ease'
                }}
              >
                <ExternalLink size={16} /> View Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'white',
                  color: colors.primary,
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Github size={16} /> View Code
              </a>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(125, 157, 127, 0.1)',
          border: `1px solid ${colors.border}`
        }}>
          {/* Summary */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: '12px'
            }}>
              Overview
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: colors.textLight
            }}>
              {project.summary}
            </p>
          </section>

          {/* Challenge */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: '12px'
            }}>
              The Challenge
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: colors.textLight
            }}>
              {project.challenge}
            </p>
          </section>

          {/* Solution */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: '12px'
            }}>
              The Solution
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: colors.textLight
            }}>
              {project.solution}
            </p>
          </section>

          {/* Results */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: '12px'
            }}>
              Key Results
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {project.results.map((result, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: colors.textLight
                }}>
                  <span style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: '20px'
                  }}>✓</span>
                  {result}
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: '12px'
            }}>
              Technologies Used
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {project.technologies.map((tech, index) => (
                <span key={index} style={{
                  padding: '6px 14px',
                  background: colors.accent,
                  color: colors.text,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projectsData.projects.map(project => ({
    slug: project.slug
  }));
}