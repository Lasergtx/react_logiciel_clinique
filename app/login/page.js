"use client";

import Image from 'next/image';
import logo from '@/public/images/logo-full.svg';
import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/users');
            if (!response.ok) throw new Error('Erreur serveur');
            const data = await response.json();
            const users = data.result;
            const user = users.find(
              (user) => user.username === username && user.password === password
            );
            if (user) {
                window.location.href = '/dashboard';
                setError('');
            } else {
                setError('Identifiant ou mot de passe incorrect');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion :', err);
            setError('Erreur de connexion au serveur');
        }
    };

    return (
        <main className="h-[100vh] flex justify-center items-center">
            <div className="flex flex-col space-y-10">
                <Image src={logo} alt="Logo de la clinique" className="w-96" />
                <div className="flex flex-col bg-white rounded-xl p-10 justify-center items-center">
                    <h1>Connexion</h1>
                    <form className="flex flex-col space-y-8 mt-12 w-full" onSubmit={handleLogin}>
                        <div className="flex flex-col min-h-44 space-y-4">
                            <div className="flex flex-col space-y-1">
                                <label>Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="p-2 rounded-lg w-full border bg-[#F5F6FA] border-gray-300"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 rounded-lg w-full border bg-[#F5F6FA] border-gray-300"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <button className="bg-[#374C78] text-white hover:bg-[#7D8AA7] hover:text-black py-2 rounded-lg">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
