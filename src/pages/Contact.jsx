import { useState } from 'react';

function Contact() {

    const [inputs, setInputs] = useState({});

    function submithandler(e) {
        e.preventDefault();
        //alert(JSON.stringify(inputs));

        fetch("https://formsubmit.co/ajax/1ab9419dc40239645adfbed3b8ec027c", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Ziņa nosūtīta!");
                setInputs({}); // notīrām laukus
            })
            .catch(error => {
                console.error(error);
                alert("Kļūda nosūtot ziņu");
            });

    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <h1>Contact</h1>
            <form className="max-w-md mx-auto space-y-4" onSubmit={submithandler}>
                <div>
                    <label htmlFor="username" className="block 
                    mb-1" >Enter your name:
                        <input
                            type="text"
                            name="username"
                            className="w-full border px-2 py-1"
                            onChange={handleChange}
                            value={inputs.username || ""}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="age" className="block mb-1">Enter your email:
                        <input
                            type="email"
                            name="email"
                            className="w-full border px-2 py-1"
                            onChange={handleChange}
                            value={inputs.email || ""}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="message" className="block mb-1">Message:</label>
                    <textarea
                        name="message"
                        id="message"
                        className="w-full border px-2 py-1"
                        rows="4"
                        onChange={handleChange}
                        value={inputs.message || ""}
                    ></textarea>
                </div>

                <div>
                    <input
                        type="submit"
                        value="Send"
                        className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-black px-4 py-2 border rounded cursor-pointer"
                    />
                </div>
            </form>

        </>

    );
}

export default Contact;