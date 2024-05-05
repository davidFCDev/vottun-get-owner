// Obtenemos el NFT

export const searchToken = async (contractAddress, network, id) => {
    const requestBody = {
        contractAddress: contractAddress,
        network: network,
        id: id
    };

    const response = await fetch(`https://api.vottun.tech/erc/v1/erc721/tokenUri`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'x-application-vkn': import.meta.env.VITE_APP_ID
        },
        body: JSON.stringify(requestBody)
    });
    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to fetch token');
    }

    return response.json();
}

// Owner del NFT

export const getOwnerOfToken = async (contractAddress, network, id) => {
    const requestBody = {
        contractAddress: contractAddress,
        network: network,
        id: id
    };

    const response = await fetch(`https://api.vottun.tech/erc/v1/erc721/ownerOf`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'x-application-vkn': import.meta.env.VITE_APP_ID
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error('Failed to fetch owner');
    }

    return response.json();
}


