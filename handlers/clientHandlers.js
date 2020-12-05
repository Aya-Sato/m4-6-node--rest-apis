const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

const handleClients = (req, res) => {
    res.status(200).json({ status: 200, data: clients });
}

const handleEachClient = (req, res) => {
    const clientId = req.params.id
    const findClient = clients.find((client) => {
        return clientId === client.id;
    })
    if (findClient) {
        res.status(200).json( { status: 200, data: findClient });
    }
    else {
        res.status(404).json( { status: 404, message: 'Client not found.' });
    }
}

const handleAddClient = (req, res) => {
    const newClientInfo = req.body;
    const newId = uuidv4();
    const newClientObj = {id: newId, ...newClientInfo};
    const newClientArr = [newClientObj];

    const isNewClient = clients.find((client) => {
        return client.email === newClientObj.email;
    })
    if (!isNewClient) {
        const arrWithNewClient = clients.concat(newClientArr);
        res.status(201).json( { status: 201, data: arrWithNewClient });
    }
    else {
        res.status(400).json( { status: 400, message: 'This customer already exists in the system.'})
    }
}

const handleDeleteClient = (req, res) => {
    const clientId = req.params.id;
    const findClient = clients.find((client) => {
        return client.id === clientId;
    })
    if (findClient) {
        const removeClient = clients.filter((client) => {
            return client.id !== findClient.id;
        });
        res.status(200).json( { status: 200, data: removeClient });
    }
    else {
        res.status(404).json( { status: 404, message: 'This client does not exist.'})
    }
}

module.exports = { handleClients, handleEachClient, handleAddClient, handleDeleteClient };