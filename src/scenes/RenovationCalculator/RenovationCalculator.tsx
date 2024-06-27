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
          <h1>Calculadora Remodelação</h1>
        </header>

        <RenovationCalculatorForm
          addDivision={(division: Division) => setRenovationForm({ divisions: [...renovationForm.divisions, division] })}
          currentDivisions={renovationForm.divisions} />
      </section>

      <section>
        <h2>Divisões atuais</h2>

        <RenovationDivisionTable divisions={renovationForm.divisions} />
      </section>
    </main>
  );
}

export default RenovationCalculator;
