import React from "react";
import { Link } from "react-router-dom";

interface EvolutionLineProps {
    chain: any;
}

const extractEvolutionLine = (chain: any): string[] => {
    const names: string[] = [];
    let current = chain;
    while (current) {
        names.push(current.species.name);
        current = current.evolves_to?.[0];
    }
    return names;
};

const EvolutionLine: React.FC<EvolutionLineProps> = ({ chain }) => {
    const evolutionNames = extractEvolutionLine(chain);

    return (
        <div className="mt-4">
        <h4 className="text-center mb-3">Evolution Line</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                {evolutionNames.map((name) => (
                <Link key={name} to={`/pokemon/${name}`} className="text-decoration-none">
                    <div className="card text-center p-2 shadow-sm">
                    <img
                        src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
                        alt={name}
                        style={{ width: "80px" }}
                    />
                    <div className="text-capitalize mt-2">{name}</div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    );
};

export default EvolutionLine;
