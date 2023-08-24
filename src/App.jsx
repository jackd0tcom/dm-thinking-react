import './App.css';
import InvoiceTable from './components/InvoiceTable';

function App({initialData}) {
  return <InvoiceTable initialInvoiceList={initialData}/>
}

export default App;
