


function CreateContact() {


    const results = fetch('https://tester.crs-consulting.com/api/entry', {
        method: 'POST',
        body: JSON.stringify({
            contactList: {
                // contacts: {
                //  name: 
                //  email:
                //  phone:

                // }
            }
        })
            .then(res => (res.json()))
            .then(data => console.log(data))
            .catch(err => console.log(err))
    })
    const data = results.json()



}
export default CreateContact
