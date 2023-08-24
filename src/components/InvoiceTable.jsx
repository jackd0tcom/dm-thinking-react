import './InvoiceTable.css';
import ModeButton from './ModeButton';
import Rate from './Rate';
import Description from './Description';
import Hours from './Hours';
import AddButton from './AddButton';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import { useState } from 'react';
import axios from 'axios';

const InvoiceTable = ({initialInvoiceList}) => {

    const [currentList, setCurrentList] = useState(initialInvoiceList)

    const addRow = async () => {
        let {data} = await axios.post('/addInvoice', {description: 'Description goes here'})
        // get copy of current list
        // create an empty object for new row
        // push new object into my copied list
        // update list state with the new version of that list
        setCurrentList([...currentList, data])
        // OLD FUNCTION **
        // const newRow = {
        //     id: globalId,
        //     description: 'Description',
        //     rate: '',
        //     hours: '',
        // }
        // newInvoiceList.push(newRow);
        // setCurrentList(newInvoiceList);
    }

    const deleteRow = async (id) => {
        
        const {data} = await axios.delete(`/removeInvoice/${id}`)

        if(!data.error){
            const filteredList = currentList.filter((el) => el.id !== id);
            setCurrentList(filteredList)
        }
        
    }

    const rows = currentList.map((item) => {
        const {id, description, rate, hours} = item;
        return (
            <InvoiceTableRow 
            key={id}
            id={id}
            initialInvoiceData={{description: description, rate: rate, hours: hours}} 
            initialIsEditing={false}
            deleteFunc={() => deleteRow(id)}
            />
        )})
    
    return (
        <div>
            <table>
                <thead><InvoiceTableHeader/></thead>
                <tbody>
                    {rows}
                </tbody>
                <tfoot>
                    <AddButton addClick={addRow}/>
                </tfoot>
            </table>
        </div>
    )
}

export default InvoiceTable