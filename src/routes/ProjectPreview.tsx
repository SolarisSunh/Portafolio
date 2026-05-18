import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { iaiProjects } from "../data/iai-projects";
import { Button } from "../components/ui/button";

export const ProjectPreview: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project =
    projects.find((p) => p.slug === slug) ??
    iaiProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="mb-4">Proyecto no encontrado.</p>
          <Link to="/"><Button>Volver</Button></Link>
        </div>
      </div>
    );
  }

  const base = (import.meta as any).env?.BASE_URL || "/";
  const previewPath = `${base}projects/${project.slug}/index.html`;
  const isWordPressIai = slug === "iai-wordpress-iai";

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{project.title}</h1>
          <Link to="/"><Button variant="secondary">← Volver</Button></Link>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs rounded bg-white/10 text-white px-3 py-1 border border-white/10">{t}</span>
            ))}
          </div>
          <div className={`w-full rounded-xl overflow-hidden border border-white/10 bg-black ${isWordPressIai ? "h-[min(80vh,720px)]" : "aspect-video"}`}>
            <iframe title={project.title} src={previewPath} className="w-full h-full border-0" />
          </div>
          <p className="text-white/80">{project.description}</p>
          {isWordPressIai && (
            <p className="text-white/60 text-sm">
              Dentro del visor: pestañas Vista previa (sitio estático) y Código (bloques Gutenberg y backups JSON).
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {project.links?.map(l => (
              <a key={l.href} href={l.href} className="text-primary-300 hover:text-primary-200" target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


