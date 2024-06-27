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

const RenovationDivisionTable = ({ divisions }: { divisions: Division[] }) => {
    return (
        <table className="striped">
            <thead>
                <th>Nome da divisão</th>
                <th>Dimensões <sup>(Largura x Comprimento x Altura)</sup></th>
                <th>Paredes</th>
                <th>Teto</th>
                <th>Pavimento</th>
                <th>Serviços Estruturais</th>
            </thead>
            <tbody>
                {divisions.map((division) => (
                    <tr>
                        <td>{division.name}</td>
                        <td>{division.measures.width}m x {division.measures.length}m x {division.measures.height}m</td>
                        <td>{wallServices.find(([service]) => service === division.services.walls)?.[1] || 'N/A'}</td>
                        <td>{ceilingServices.find(([service]) => service === division.services.ceiling)?.[1] || 'N/A'}</td>
                        <td>{floorServices.find(([service]) => service === division.services.floor)?.[1] || 'N/A'}</td>
                        <td>{labelStructuralServices(division)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={5}>Total Estimado:</td>
                    <td>5.550€</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default RenovationDivisionTable;