import React, { useState, useEffect } from "react";
import './posts.css';
import PostForm from "./PostForm";

function Posts() {

    async function loadPosts() {
        let response = await fetch('http://localhost:8080/posts');
        let data = await response.json();
        return data;
    }

    const [posts, setPosts] = useState([]);
    const [visiblePostDiv, setVisiblePostDiv] = useState(false);
    const [reload, setReload] = useState(false);
    const [editFormData, setEditFormData] = useState([]);
    const [formId, setFormID] = useState();

    const closeModal = () => {
        setVisiblePostDiv(false);
    }

    const doReload = () => {
        setReload(!reload);
    }

    const createPost = () => {
        setEditFormData([]);
        setFormID(null);
        setVisiblePostDiv(true);
    }

    const openPost = async (e) => {
        let id = e.currentTarget.dataset.id;
        if (!id) {
            console.error("Ziņas ID nav atrasts");
            return;
        }

        setFormID(id);
        await loadFormData(id);
        setVisiblePostDiv(true);
    }

    const loadFormData = async (id) => {
        try {
            let response = await fetch(`http://localhost:8080/posts/${id}`);
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
            let data = await response.json();
            setEditFormData(data);
            console.log(data);
        } catch (error) {
            console.error("Neizdevās ielādēt datus:", error);
            alert("Neizdevās ielādēt ziņu datus.");
        }
    }

   const deletePost = async (id) => {
    if (!window.confirm("Vai tiešām vēlaties dzēst šo ziņu?")) return;

    try {
        let response = await fetch(`http://localhost:8080/posts/delete/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        alert("Ziņa veiksmīgi izdzēsta.");
        doReload();
    } catch (error) {
        console.error("Neizdevās dzēst ziņu:", error);
        alert("Kļūda dzēšot ziņu.");
    }
};

    useEffect(() => {
        loadPosts().then((data) => {
            setPosts(data);
        });
    }, [reload]);

    if (!posts) {
        return (
            <>
                <h1>Ziņas</h1>
                <p>Ielādē...</p>
            </>
        )
    }

    return (
        <>
            <h1>Ziņas</h1>
            <button type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
                onClick={createPost}>
                Pievienot jaunu ziņu
            </button>
            <table className='border-collapse border border-slate-400'>
                <thead>
                    <tr>
                        <th>Post</th>
                        <th>View post</th>
                        <th className="border border-slate-300 p-2">Dzēst</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, i) => (
                        <tr key={i}>
                            <td>{post.post_title}</td>
                            <td>
                                <button type="button" class="inline-block rounded-full bg-sky-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-sky-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-sky-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-sky-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0" data-id={post.id} onClick={openPost}>Skatīt postu</button>
                            </td>
                            <td>
                                <button
                                   type="button" class="inline-block rounded-full bg-red-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                    onClick={() => deletePost(post.id)}
                                >
                                    Dzēst
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {visiblePostDiv && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative'>
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={closeModal}>
                            x
                        </button>
                        <h1>Ziņa</h1>
                        <PostForm closeModal={closeModal} reload={doReload} formasDati={editFormData} editFormId={formId} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Posts;
