import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Tag, ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';
import siteData from '@/data/site.json';
import TableauEmbed from '@/app/components/TableauEmbed.js';
import PowerBIEmbed from '@/app/components/PowerBIEmbed';
import FlaskEmbed from '@/app/components/FlaskEmbed';

const embedSectionTitles = {
  tableau: 'Interactive Dashboard',
  powerbi: 'Interactive Dashboard',
  flask: 'Live Application',
  render: 'Live Application',
};

export default function ProjectPage({ params }) {
  const project = projectsData.projects.find(p => p.slug === params.slug);
  const ragDemoUrl = siteData.ragDemoUrl;
  const isRagProject = project?.slug === 'construction-rag-pipeline';
  const embedUrl = isRagProject && ragDemoUrl ? ragDemoUrl : project?.embedUrl;
  const liveUrl = isRagProject && ragDemoUrl ? ragDemoUrl : project?.liveUrl;

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="project-not-found-content">
          <h1 className="project-not-found-title">
            Project Not Found
          </h1>
          <Link href="/" className="project-not-found-link">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is a Tableau project
  const isTableauProject = project.tableauUrl || project.tags?.includes("Tableau");

  return (
    <div className="project-detail-container">
      {/* Header */}
      <header className="project-detail-header">
        <div className="project-detail-header-content">
          <Link href="/#projects" className="project-detail-back-link">
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <article className="project-detail-article">
        {/* Title Section */}
        <div className="project-detail-title-section">
          <h1 className="project-detail-title">
            {project.title}
          </h1>

          {/* Meta Information */}
          <div className="project-detail-meta">
            <div className="project-detail-meta-item">
              <Calendar size={16} />
              {project.date}
            </div>
            <div className="project-detail-meta-item">
              <Tag size={16} />
              {projectsData.categories.find(c => c.id === project.category)?.name || project.category}
            </div>
          </div>

          {/* Tags */}
          <div className="project-detail-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="project-detail-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="project-detail-links">
            {liveUrl && liveUrl !== '#' && !project.tableauUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-link-primary"
              >
                <ExternalLink size={16} /> View Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-link-secondary"
              >
                <Github size={16} /> View Code
              </a>
            )}
          </div>
        </div>

        
            {project.embedType && embedUrl && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-title">
                  {embedSectionTitles[project.embedType] || 'Interactive Demo'}
                </h2>
                <div className="embed-container">
                  {project.embedType === 'tableau' && (
                    <TableauEmbed
                      url={embedUrl}
                      {...(project.embedConfig || {})}
                    />
                  )}
                  {project.embedType === 'powerbi' && (
                    <PowerBIEmbed
                      url={embedUrl}
                      {...(project.embedConfig || {})}
                    />
                  )}
                  {(project.embedType === 'flask' || project.embedType === 'render') && (
                    <FlaskEmbed
                      url={embedUrl}
                      title={project.title}
                      {...(project.embedConfig || {})}
                    />
                  )}
                </div>
              </section>
            )}

        {/* Project Content */}
        <div className="project-detail-content">
          {/* Summary */}
          <section className="project-detail-section">
            <h2 className="project-detail-section-title">
              Overview
            </h2>
            <p className="project-detail-section-text">
              {project.summary}
            </p>
          </section>

          {project.screenshots?.length > 0 && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">
                Screenshots
              </h2>
              <div className="project-screenshots">
                {project.screenshots.map((shot, index) => (
                  <figure key={index} className="project-screenshot">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1200}
                      height={750}
                      className="project-screenshot-image"
                    />
                    {shot.caption && (
                      <figcaption className="project-screenshot-caption">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Tableau Embed - Show early if it's a Tableau project */}
          {isTableauProject && project.tableauUrl && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">
                Interactive Dashboard
              </h2>
              <div className="tableau-embed-container">
                <TableauEmbed
                  url={project.tableauUrl}
                  height="800px"
                  width="100%"
                />
              </div>
            </section>
          )}

          {/* Challenge */}
          {project.challenge && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">
                The Challenge
              </h2>
              <p className="project-detail-section-text">
                {project.challenge}
              </p>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">
                The Solution
              </h2>
              <p className="project-detail-section-text">
                {project.solution}
              </p>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">
                Key Results
              </h2>
              <ul className="project-detail-results-list">
                {project.results.map((result, index) => (
                  <li key={index} className="project-detail-result-item">
                    <span className="project-detail-result-icon">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technologies */}
          <section className="project-detail-section">
            <h2 className="project-detail-section-title">
              Technologies Used
            </h2>
            <div className="project-detail-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="project-detail-tech-tag">
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