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
    <div className="field">
      <label htmlFor="division.kind">Tipo da Divisão</label>
      <select id="division.kind" name="kind" onChange={loadDivisionKind} required>
        <option>Selecione...</option>
        {divisionKinds.map(([kind, label]) => (<option key={kind} value={kind}>{label}</option>))}
      </select>
    </div>

    <div className="field">
      <label htmlFor="division.name">Nome da Divisão</label>
      <input id="division.name" type="text" name="name" value={divisionName} onChange={(e) => setDivisionName(e.target.value)} required />
    </div>

    <div className="field">
      <label htmlFor="division.width">Largura (m)</label>
      <input id="division.width" type="number" name="width" required min="1" />
    </div>

    <div className="field">
      <label htmlFor="division.length">Comprimento (m)</label>
      <input id="division.length" type="number" name="length" required min="1" />
    </div>

    <div className="field">
      <label htmlFor="division.height">Altura (m)</label>
      <input id="division.height" type="number" name="height" required min="1" />
    </div>

    <div className="field">
      <label htmlFor="division.walls">Paredes</label>
      <select id="division.walls" name="walls" required>
        <option value="none">Selecione...</option>
        {wallServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
      </select>
    </div>

    <div className="field">
      <label htmlFor="division.ceiling">Teto</label>
      <select value="none" id="division.ceiling" name="ceiling" required>
        <option>Selecione...</option>
        {ceilingServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
      </select>
    </div>

    <div className="field">
      <label htmlFor="division.floor">Pavimento</label>
      <select value="none" id="division.floor" name="floor" required>
        <option>Selecione...</option>
        {floorServices.map(([service, label]) => (<option key={service} value={service}>{label}</option>))}
      </select>
    </div>

    <div className="field">
      <fieldset>
        <legend>Serviços Estruturais</legend>
        <ul>
          <li>
            <label htmlFor="division.electricity">Eletricidade</label>
            <input id="division.electricity" type="checkbox" name="electricity" />
          </li>
          {divisionKind && ['bathroom', 'kitchen'].includes(divisionKind) && (
            <>
              <li>
                <label htmlFor="division.sewage">Esgotos</label>
                <input id="division.sewage" type="checkbox" name="sewage" />
              </li>
              <li>
                <label htmlFor="division.plumbing">Canalização</label>
                <input id="division.plumbing" type="checkbox" name="plumbing" />
              </li>
              <li>
                <label htmlFor="division.gas">Gás</label>
                <input id="division.gas" type="checkbox" name="gas" />
              </li>
            </>
          )}
        </ul>
      </fieldset>
    </div>

    <button type="submit">Adicionar Divisão</button>
  </form>
  )
};

export default RenovationCalculatorForm;
