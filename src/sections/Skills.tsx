import React from "react";
import { Badge } from "../components/ui/badge";
import { skills } from "../data/skills";

export const Skills: React.FC = () => {
  return (
    <section id="habilidades" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
};



