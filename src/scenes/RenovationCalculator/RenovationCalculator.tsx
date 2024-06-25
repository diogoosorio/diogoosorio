import { useState } from "react";
import { Division, RenovationForm } from "./types";
import RenovationCalculatorForm from "./components/RenovationCalculatorForm";
import { ceilingServices, floorServices, wallServices } from "./constants";

const RenovationCalculator = () => {
  const [renovationForm, setRenovationForm] = useState<RenovationForm>({ divisions: [] });

  return (
    <div>
      <h1>Calculadora Remodelação</h1>

      <RenovationCalculatorForm
        addDivision={(division: Division) => setRenovationForm({ divisions: [...renovationForm.divisions, division] })}
        currentDivisions={renovationForm.divisions} />

      <section>
        <h2>Divisões</h2>

        <ul>
          {renovationForm.divisions.map((division, index) => (
            <li key={index}>
              <h3>{division.name}</h3>
              <p>Largura: {division.measures.width}m</p>
              <p>Comprimento: {division.measures.length}m</p>
              <p>Altura: {division.measures.height}m</p>
              <p>Paredes: {wallServices.find(([service]) => service === division.services.walls)?.[1]}</p>
              <p>Teto: {ceilingServices.find(([service]) => service === division.services.ceiling)?.[1]}</p>
              <p>Pavimento: {floorServices.find(([service]) => service === division.services.floor)?.[1]}</p>
              <p>Eletricidade: {division.services.electricity ? 'Sim' : 'Não'}</p>

              {division.kind === 'bathroom' || division.kind === 'kitchen' && (
                <>
                  <p>Esgotos: {division.services.sewage ? 'Sim' : 'Não'}</p>
                  <p>Canazlização: {division.services.plumbing ? 'Sim' : 'Não'}</p>
                  <p>Gás: {division.services.gas ? 'Sim' : 'Não'}</p>
                </>
              )}
            </li>
          ))}
          </ul>
      </section>
    </div>
  );
}

export default RenovationCalculator;
