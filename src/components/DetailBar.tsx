import React from 'react';
import '../styles/App.css';
import { TDetail } from '../data/types';

type DetailBarProps = {
    details: TDetail[]
    unitShortName: string
}

const DetailBar = (props: DetailBarProps) => {
    const header=<tr>
                <th>Название</th>
                <th>Длина</th>
                <th>Ширина</th>
                <th>Кол-во</th>
                <th>Паз</th>
                <th>Прим.</th>
                </tr>
    const details = props.details.map((d: TDetail,index:number) => {
            let edgeLength=""
            let edgeWidth=""
            if(d.edgeLength1||d.edgeLength2) edgeLength="singleEdge"
            if(d.edgeLength1&&d.edgeLength2) edgeLength="doubleEdge"
            if(d.edgeWidth1||d.edgeWidth2) edgeWidth="singleEdge"
            if(d.edgeWidth1&&d.edgeWidth2) edgeWidth="doubleEdge"
            return <tr key={index}>
                    <td className="tdLeft">{d.name}</td>
                    <td className={edgeLength}>{d.length}</td>
                    <td className={edgeWidth}>{d.width}</td>
                    <td>{d.count}</td>
                    <td>{d.paz}</td>
                    <td>{d.comment}</td>
                </tr>
    })
        return (
        <>
        <div>{`Детали ${props.unitShortName||""}`}</div>
            <table>
                {header}
                <tbody>
                  {details}  
                </tbody>
            </table>
        </>
        );
    }
export default DetailBar

