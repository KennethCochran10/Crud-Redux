import { createSlice, current } from "@reduxjs/toolkit"
import { store } from "../../app/store"
const initialState = { contacts: [], selectedContact: null, }




export const contactSlice = createSlice({


    name: 'contactList',
    initialState,
    reducers: {
        setContacts: (state, action) => {

            state.contacts = action.payload


        },
        setSelectedContact: (state, action) => {

            state.selectedContact = action.payload;

        },

        addContact: (state, action) => {
            console.log(action.payload)
            const currentState = current(state)
            const newState = [...currentState.contacts]
            newState.push(action.payload)
            state.contacts = newState;


        }

        // updateSelectedContact: (state, action) => {
        //     const currentState = current(state)
        //     const index = currentState.contacts.findIndex(contact => contact.id === action.payload.id)
        //     console.log(index)
        //     const newState = {...currentState}
        //     state.contacts = action.payload
        // }


    }

})

export const selectContacts = (state) => state.contactList.contacts;
export const selectedContact = (state) => state.contactList.selectedContact;
export const { setContacts, setSelectedContact, updateSelectedContact, addContact } = contactSlice.actions

export default contactSlice.reducer