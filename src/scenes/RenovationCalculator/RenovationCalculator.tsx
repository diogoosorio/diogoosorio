import { useState } from "react";
import { Division, RenovationForm } from "./types";
import RenovationCalculatorForm from "./components/RenovationCalculatorForm";
import RenovationDivisionTable from "./components/RenovationDivisionTable";

const RenovationCalculator = () => {
  const [renovationForm, setRenovationForm] = useState<RenovationForm>({ divisions: [] });

  return (
    <main className="container">
      <section>
        <header>
          <hgroup>
            <h1>Calculadora Remodelação</h1>
            <p>
              Adicione as divisões que quer remodelar e respetivos serviços para obter
              uma estimativa de valores.
            </p>
          </hgroup>
        </header>

        <RenovationCalculatorForm
          addDivision={(division: Division) => setRenovationForm({ divisions: [...renovationForm.divisions, division] })}
          currentDivisions={renovationForm.divisions} />
      </section>

      <section>
        <h2>Orçamento</h2>

        <RenovationDivisionTable divisions={renovationForm.divisions} />
      </section>
    </main>
  );
}

export default RenovationCalculator;
