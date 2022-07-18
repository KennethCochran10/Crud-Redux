import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { FormControl, FormGroup, FormLabel, Input } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteContact from '../contacts/deletecontact';
import EditContact from '../contacts/editcontact';
import { setSelectedContact, selectedContact, updateSelectedContact, setContacts } from '../contacts/contactslice';
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@material-ui/core';
import { Dialog } from '@material-ui/core';







function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {


    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

function SimpleModal(props) {

    const contact = useSelector(selectedContact)
    const [newContact, setNewContact] = useState({ ...contact })
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setNewContact({ ...contact })

    }, [contact])
    const getall = async () => {

        const results = await fetch('https://tester.crs-consulting.com/api/entries', {
            method: 'GET'
        })
        const data = await results.json()
        if (data) {

            dispatch(setContacts(data))
        }

    }

    const updateContact = async () => {

        try {
            const results = await fetch('https://tester.crs-consulting.com/api/entry', {
                method: 'PUT',
                body: JSON.stringify({

                    name: newContact.name,
                    email: newContact.email,
                    phone: newContact.phone,
                    id: newContact.id,


                }),
                headers: { 'Content-Type': 'application/json' }


            })
            const data = await results.json()
            if (data) {


                getall()
                handleClose()


            }
        } catch (error) {
            console.log(error)
        }



    }

    const deleteContact = async () => {



        try {

            const results = await fetch(`https://tester.crs-consulting.com/api/entry?id=${props.contactId}`, {
                method: 'DELETE'
            })
            const data = results.json()
            if (data) {
                getall()
            }
        } catch (error) {
            console.log(error)

        }


    }


    const handlechange = (event) => {
        event.preventDefault()
        setNewContact({ ...newContact, [event.target.name]: event.target.value });
        console.log(event.target.name, event.target.value)

    };
    const handleOpen = async () => {
        try {
            const results = await fetch(`https://tester.crs-consulting.com/api/entry?id=${props.contactId}`, {
                method: 'GET'
            })
            const data = await results.json()
            if (data) {

                dispatch(setSelectedContact(data))
            }

        } catch (err) {
            console.log(err)
        }


        // dispatch(setSelectedContact(props.contactId))
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };


    const { classes } = props;

    return (
        <div>

            <Button onClick={handleOpen} style={{ margin: '10px' }} variant='outlined' color='primary'>Update Contact</Button>
            <Button onClick={deleteContact} variant='outlined' color='secondary'>Delete</Button>
            <Modal

                open={open}
                onClose={handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>

                    {/*add code here*/}
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TextField
                                    name='name'
                                    id="name"
                                    label="Name"
                                    value={newContact.name}
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={handlechange}
                                />
                                <TextField
                                    name='email'
                                    id="email"
                                    label="Email"
                                    value={newContact.email}
                                    onChange={handlechange}
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <TextField
                                    name='phone'
                                    id="phone"
                                    label="Phone"
                                    value={newContact.phone}
                                    onChange={handlechange}
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <Button onClick={updateContact} variant='outlined' color='primary'>Confirm Changes</Button>


                            </TableRow>

                        </TableHead>

                        {/* <TableBody>
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
                                                {<SimpleModalWrapped />}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody> */}
                    </Table>

                </div>
            </Modal >
        </div >
    );

}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;