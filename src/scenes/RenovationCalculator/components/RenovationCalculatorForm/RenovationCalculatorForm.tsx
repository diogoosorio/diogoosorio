import { useState } from "react";
import { Division, DivisionKind, Services } from "../../types";
import { ceilingServices, divisionKinds, floorServices, wallServices } from "../../constants";

const namedInputElement = (elements: HTMLFormControlsCollection, name: string) => elements.namedItem(name) as HTMLInputElement;
const namedSelectElement = (elements: HTMLFormControlsCollection, name: string) => elements.namedItem(name) as HTMLSelectElement;

const RenovationCalculatorForm = ({ addDivision, currentDivisions }: { addDivision: (division: Division) => void, currentDivisions: Division[] }) => {
  const [divisionKind, setDivisionKind] = useState<DivisionKind>();
  const [divisionName, setDivisionName] = useState<string>('');

  const loadDivisionKind = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const kind = event.target.value as DivisionKind;
    const name = divisionKinds.find(([k]) => k === kind)?.[1];
    const number = currentDivisions.filter(d => d.kind === kind).length + 1;

    setDivisionName(`${name} ${number}`);
    setDivisionKind(kind);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const elements = form.elements;
    const division = {
      name: divisionName,
      kind: divisionKind as DivisionKind,
      measures: {
        width: Number(namedInputElement(elements, 'width').value),
        length: Number(namedInputElement(elements, 'length').value),
        height: Number(namedInputElement(elements, 'height').value),
      },
      services: {
        walls: namedSelectElement(elements, 'walls').value as Services['walls'],
        ceiling: namedSelectElement(elements, 'ceiling').value as Services['ceiling'],
        floor: namedSelectElement(elements, 'floor').value as Services['floor'],
        electricity: namedInputElement(elements, 'electricity').checked,
        sewage: namedInputElement(elements, 'sewage')?.checked === true,
        plumbing: namedInputElement(elements, 'plumbing')?.checked === true,
        gas: namedInputElement(elements, 'gas')?.checked === true,
      },
    } as Division;

    addDivision(division);
    setDivisionName('');
    setDivisionKind(undefined);

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="grid">
        <label>
          Tipo da Divisão
          <select name="kind" onChange={loadDivisionKind} required>
            <option>Selecione...</option>
            {divisionKinds.map(([kind, label]) => (<option key={kind} value={kind}>{label}</option>))}
          </select>
        </label>

        <label>
          Nome da Divisão
          <input id="division.name" type="text" name="name" value={divisionName} onChange={(e) => setDivisionName(e.target.value)} required />
        </label>
      </fieldset>

      <fieldset className="grid">
        <label>
          Largura (m)
          <input id="division.width" type="number" name="width" required min="1" />
        </label>

        <label>
          Comprimento (m)
          <input type="number" name="length" required min="1" />
        </label>

        <label>
          Altura (m)
          <input type="number" name="height" required min="1" />
        </label>
      </fieldset>

      <fieldset className="grid">
        <label>
          Paredes
          <select name="walls" aria-label="Selecione o serviço de paredes..." required>
            <option value="none">Selecione o serviço de paredes...</option>
            {wallServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
          </select>
        </label>

        <label>
          Teto
          <select name="ceiling" aria-label="Selecione o serviço de teto..." required>
            <option value="none">Selecione o serviço de teto...</option>
            {ceilingServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
          </select>
        </label>

        <label>
          Pavimento
          <select name="floor" aria-label="Selecione o serviço de chão..." required>
            <option value="none">Selecione o serviço de chão...</option>
            {floorServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
          </select>
        </label>
      </fieldset>

      <fieldset>
        <label>
          <input type="checkbox" name="electricity" />
          Refazer eletricidade
        </label>
        {divisionKind && ['bathroom', 'kitchen'].includes(divisionKind) && (
          <>
            <label>
              <input type="checkbox" name="sewage" />
              Refazer esgotos
            </label>
            <label>
              <input type="checkbox" name="plumbing" />
              Refazer canalização
            </label>
            <label>
              <input id="division.gas" type="checkbox" name="gas" />
              Refazer gás
            </label>
          </>
        )}
      </fieldset>

      <button type="submit">Adicionar Divisão</button>
    </form>
  )
};

export default RenovationCalculatorForm;
