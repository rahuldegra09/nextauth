// utils/api.js

const fetchCredentials = async () => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch credentials');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching credentials:', error);
        throw new Error('Failed to fetch credentials');
    }
};

export { fetchCredentials };
