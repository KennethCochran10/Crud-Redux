import { useEffect, useState } from "react";
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { selectContacts, setContacts, addContact } from "./contactslice";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@material-ui/core";
import SimpleModalWrapped from "../contactbyid/modal";
import CreateContact from "./createcontact";
import { TextField } from '@material-ui/core';
import './contactlist.css'


function ContactList() {
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();
    const [contact, setContact] = useState({})

    const handleChange = (event) => {
        event.preventDefault()
        setContact({ ...contact, [event.target.name]: event.target.value });
        console.log(event.target.name, event.target.value)

    };

    useEffect(() => {
        getall()
    }, [])



    const createContact = async () => {

        try {
            const results = await fetch('https://tester.crs-consulting.com/api/entry', {
                method: 'POST',
                body: JSON.stringify({
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,

                })

            })
            console.log(results)
            const data = await results.json()

            if (data) {

                dispatch(addContact(contact))
            }

        } catch (error) {
            console.log(error)
        }

    }

    const getall = async () => {

        const results = await fetch('https://tester.crs-consulting.com/api/entries', {
            method: 'GET'
        })
        const data = await results.json()
        if (data) {

            dispatch(setContacts(data))
        }

    }
    return (
        <div className="App">
            <div className="NavBox">CRS Consulting</div>
            <Button onClick={createContact} >Create    </Button>

            <Table>
                <TableHead>
                    <TableRow >
                        <TextField

                            onChange={handleChange}
                            name='name'
                            id="name"
                            label="Name"
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name='email'
                            id="email"
                            label="Email"
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name='phone'
                            id="phone"
                            label="Phone"
                            margin="normal"
                        />
                    </TableRow>
                </TableHead>
            </Table>

            <Table>

                <TableHead>
                    <TableRow >
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Update/Delete</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map(contact => {
                        return (
                            <TableRow key={contact.id}>
                                <TableCell scope="contact">
                                    {contact.name}
                                </TableCell>
                                <TableCell >
                                    {contact.email}
                                </TableCell>
                                <TableCell>
                                    {contact.phone}
                                </TableCell>
                                <TableCell>
                                    {<SimpleModalWrapped contactId={contact.id} />}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    );
}

export default ContactList;

