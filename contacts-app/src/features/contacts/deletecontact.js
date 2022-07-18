



function DeleteContact(contactId) {
    fetch('https://tester.crs-consulting.com/api/entry?id=', {
        method: 'DELETE'
    })
        .then(res => res.json())

    return (
        <div>
            hello
        </div>
    )
}

export default DeleteContact