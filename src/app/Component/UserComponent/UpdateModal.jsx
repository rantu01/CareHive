

const UpdateModal = () => {

    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Blood Pressure" />
                <input type="text" placeholder="Daily Step" />
                <input type="text" placeholder="Heart Rate" />
                <input type="text" placeholder="Weight" />
            </form>


        </div>
    );
};

export default UpdateModal;