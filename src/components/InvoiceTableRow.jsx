import ModeButton from './ModeButton';
import Rate from './Rate';
import Description from './Description';
import Hours from './Hours';
import formatCurrency from '../utils/formatCurrency';
import { useState } from 'react';
import axios from 'axios';

const InvoiceTableRow = ({initialInvoiceData, initialIsEditing, deleteFunc, id}) => {
    const [editMode, setIsEditing] = useState(initialIsEditing)
    const [description, setDescription] = useState(initialInvoiceData.description)
    const [rate, setRate] = useState(initialInvoiceData.rate)
    const [hours, setHours] = useState(initialInvoiceData.hours)
    
    const changeEditMode = () => setIsEditing(true)

    const changeNormalMode = async () => {
        let bodyObj = {
            description,
            rate,
            hours
        }
        const {data} = await axios.put(`/editInvoice/${id}`, bodyObj)
        
        if(!data.error){
            setIsEditing(false)
        }else alert('essayez encore')
        
        }

    
    return (
    <tr>
        <ModeButton isEditing={editMode} editClick={changeEditMode} saveClick={changeNormalMode} funkyDelete={deleteFunc}/>
        <Description onValueChange={setDescription} isEditing={editMode} value={description}/>
        <Rate onValueChange={setRate} isEditing={editMode} value={rate}/>
        <Hours onValueChange={setHours} isEditing={editMode} value={hours}/>
        <td>{formatCurrency(rate * hours)}</td>
    </tr>
    )
}

export default InvoiceTableRow