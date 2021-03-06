import React, {useState} from 'react';
//styles
import { Table, Tr } from './PersonTable.style';

const PersonTable = ({ children }) =>{
    return(
        <>
            <Tr>
                <td>
                    <Table>
                        <tbody>
                            {children}
                        </tbody>
                    </Table>
                </td>
            </Tr>
        </>
    )
}

export default PersonTable;