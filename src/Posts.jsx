import React from 'react'
import { useState, useEffect } from "react";
import './posts.css';

function Posts() {

    // 1. Funkcijas kas veido vaicājumu uz: https://jsonplaceholder.typicode.com/posts/
    // 2. Funkcijas kas ielādē datus, kad React components tiek ielādēts



    async function loadPosts() {
        let response = await fetch('http://localhost:8080/posts');
        let data = await response.json();
        return data;

    }

    const [posts, setPosts] = useState([]);
    const [postsContent, setPostsContent] = useState([]);
    const [visiblePostDiv, setVisiblePostDiv] = useState([]);

    const openPost = (e) => {
        let id = e.target.dataset.id;
        console.log(id);

        setVisiblePostDiv(true);
    }


    useEffect(() => {
        loadPosts().then((data) => {
            setPosts(data);
        });

    }, [])

    if (!posts) {
        return (
            <>
                <h1>Ziņas</h1>
                <p>Ielādē...</p>
            </>
        )
    } else {
        return (
            <>
                <h1>Ziņas</h1>
                <table className='border-collapse border border-slate-400'>
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>View post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, i) => {
                            return (
                                <tr key={i}>
                                    <td>{post.post_title}</td>
                                    <td>
                                        <button data-id={post.id} onClick={openPost}>Skatīt postu</button>
                                    </td>
                                </tr>)
                        })
                        }
                    </tbody>
                </table>

                {visiblePostDiv ?
                    (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative'>
                                <button className = "absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"onClick={() => {
                                    setVisiblePostDiv(false)
                                }}>x</button>
                                <h1>Ziņa</h1>
                                <p>test</p>
                            </div>
                        </div>
                    ) : ""
                }
            </>
        )
    }
}

export default Posts;

