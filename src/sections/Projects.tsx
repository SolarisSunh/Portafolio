import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export const Projects: React.FC = () => {
  return (
    <section id="proyectos" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Proyectos</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <Card key={p.title} className="hover:translate-y-[-2px] transition-transform">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {(p.slug || (p.links && p.links.length > 0)) && (
                  <div className="mt-3 text-sm">
                    {p.slug && (
                      <Link to={`/project/${p.slug}`} className="text-primary-300 hover:text-primary-200 mr-3">
                        Vista previa
                      </Link>
                    )}
                    {(p.links || []).map((l) => (
                      <a key={l.href} href={l.href} className="text-primary-300 hover:text-primary-200 mr-3" target="_blank">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


