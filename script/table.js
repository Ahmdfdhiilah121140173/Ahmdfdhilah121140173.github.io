const apiUrl = 'https://dummyjson.com/products'; 
const kontenTable = document.querySelector('.table');

async function fetchProducts() {
    let products = [];
    const storedProducts = localStorage.getItem('products'); 

    if (storedProducts) {

        products = JSON.parse(storedProducts);
    } else {
        try {
            const response = await axios.get(apiUrl);
            const data = await response.data
            console.log(data);
            const products = await data.products
            const productsFiltered = await products.map(product => {
                return {
                    title: product.title,
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                    rating: product.rating,
                    stock: product.stock,
                    brand: product.brand,
                    category: product.category
                }
            });

            localStorage.setItem('products', JSON.stringify(productsFiltered));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return products;
}

async function PopulateTable() {
    try {
        const productsFiltered = await fetchProducts();
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        for (const key in productsFiltered[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);

        productsFiltered.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);

        kontenTable.innerHTML = '';
        kontenTable.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
    }
}


PopulateTable();