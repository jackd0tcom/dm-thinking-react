let TEST_DATA = [
  { id: 0, description: "Content plan", rate: 50, hours: 4 },
  { id: 1, description: "Copy writing", rate: 50, hours: 2 },
  { id: 2, description: "Website design", rate: 50, hours: 5 },
  { id: 3, description: "Website development", rate: 100, hours: 5 },
];

let globalId = 5;

const handlerFunctions = {
  getInvoices: (req, res) => {
    res.send(TEST_DATA);
  },
  addItem: (req, res) => {
    // get the values from req.body
    // create new object to add to test data
    // push new object into test data
    // increase counter by 1
    // send back new object to frontend
    const { description } = req.body;
    const newObj = {
      id: globalId,
      description: description,
      rate: 0,
      hours: 0,
    };
    TEST_DATA.push(newObj);
    globalId++;
    res.send(newObj);
  },
  deleteItem: (req, res) => {
    const { id } = req.params;
    TEST_DATA = TEST_DATA.filter((el) => el.id !== +id);
    res.send("Item deleted");
  },
  updateItem: (req, res) => {
    const { id } = req.params;
    const { description, rate, hours } = req.body;

    const index = TEST_DATA.findIndex((el) => el.id === +id);

    const item = TEST_DATA[index];

    item.description = description ?? item.description;
    item.rate = +(rate ?? item.rate);
    item.hours = +(hours ?? item.hours);

    res.send(item);
  },
};

export default handlerFunctions;
