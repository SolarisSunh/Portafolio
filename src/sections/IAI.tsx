import React from "react";
import { Link } from "react-router-dom";
import { iaiProjects } from "../data/iai-projects";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export const IAI: React.FC = () => {
  return (
    <section id="iai" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-2">IAI</h2>
        <p className="text-white/70 mb-6 text-sm">
          Course activities — Informática Aplicada a Internet.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {iaiProjects.map((p) => (
            <Card key={p.slug} className="hover:translate-y-[-2px] transition-transform">
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
                <div className="mt-3 text-sm">
                  <Link
                    to={`/project/${p.slug}`}
                    className="text-primary-300 hover:text-primary-200 mr-3"
                  >
                    Vista previa
                  </Link>
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-primary-300 hover:text-primary-200 mr-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
