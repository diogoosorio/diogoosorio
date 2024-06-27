import { calculateEstimation } from "../../calculator";
import { ceilingServices, floorServices, wallServices } from "../../constants";
import { Division } from "../../types";

const labelStructuralServices = (division: Division) => {
    const services = [];
    const waterDivision = division.kind === 'bathroom' || division.kind === 'kitchen';

    if (division.services.electricity) {
        services.push('Eletricidade')
    }

    if (waterDivision && division.services.sewage) {
        services.push('Esgotos')
    }

    if (waterDivision && division.services.plumbing) {
        services.push('Canalização')
    }

    if (waterDivision && division.services.gas) {
        services.push('Gás')
    }

    return services.length ? services.join(' / ') : 'N/A';
}

const RenovationDivisionTable = ({ divisions, removeDivision }: { divisions: Division[], removeDivision: (division: Division) => void }) => {
    const formatter = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' });

    return (
        <table className="striped">
            <thead>
                <th>Nome da divisão</th>
                <th>Dimensões <sup>(Largura x Comprimento x Altura)</sup></th>
                <th>Paredes</th>
                <th>Teto</th>
                <th>Pavimento</th>
                <th>Serviços Estruturais</th>
                <th></th>
            </thead>
            <tbody>
                {divisions.length === 0 && (
                <tr>
                    <td colSpan={7}>Adicione uma divisão para ter um custo estimado</td>
                </tr>
                )}

                {divisions.length > 0 && divisions.map((division) => (
                    <tr>
                        <td>{division.name}</td>
                        <td>{division.measures.width}m x {division.measures.length}m x {division.measures.height}m</td>
                        <td>{wallServices.find(([service]) => service === division.services.walls)?.[1] || 'N/A'}</td>
                        <td>{ceilingServices.find(([service]) => service === division.services.ceiling)?.[1] || 'N/A'}</td>
                        <td>{floorServices.find(([service]) => service === division.services.floor)?.[1] || 'N/A'}</td>
                        <td>{labelStructuralServices(division)}</td>
                        <td><button className="outline secondary" onClick={() => removeDivision(division)}>Remover</button></td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}></td>
                    <td colSpan={2}>Total Estimado:</td>
                    <td colSpan={1}>{divisions.length === 0 ? 'N/A' : formatter.format(calculateEstimation(divisions))}</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default RenovationDivisionTable;