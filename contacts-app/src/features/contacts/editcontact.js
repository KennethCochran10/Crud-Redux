


function EditContact() {

    fetch('https://tester.crs-consulting.com/api/entry', {
        method: 'PUT',



    })
        .then(res => (res.json()))

    return (
        <div>
            hello
        </div>
    )
}

export default EditContact