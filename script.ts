const categories= [
    'food',
    'electronics',
    'furniture',
    'all'
]

interface itemType {
    name: string,
    photo: string,
    weight: number,
    price: number,
    category: string
}

const items : itemType[] = [
    {
        name: "Milk",
        photo: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&resize=960,872",
        weight: 0.7,
        price: 2,
        category: 'food'
    },
    {
        name: "Bread",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korb_mit_Br%C3%B6tchen.JPG/1200px-Korb_mit_Br%C3%B6tchen.JPG",
        weight: 0.5,
        price: 3,
        category: 'food'
    },
    {
        name: "Meat",
        photo: "https://media.wired.com/photos/5b493b6b0ea5ef37fa24f6f6/125:94/w_2393,h_1800,c_limit/meat-80049790.jpg",
        weight: 2.5,
        price: 4.50,
        category: 'food'
    },
    {
        name: "Camera",
        photo: "http://i1.adis.ws/i/canon/eos-r6-rf24-105mm-f4_7.1_is_stm_front-on_square_6412568cc0e7484b96bd55e43069a56c",
        weight: 5,
        price: 200,
        category: 'electronics'
    },
    {
        name: "Screen",
        photo: "https://lh3.googleusercontent.com/proxy/wl4THlWX1WeI7MVeP2X0DKLUE7NZr6fdm4WQ32TDzYefkQ67htVue1e-F_RKzSA8oTLNNfsBqGnUSbfeBip4F09i-PnAIyxMCd-l-zgh9ZNxSqcF20aBf_0BbdQ",
        weight: 8,
        price: 150,
        category: 'electronics'
    },
    {
        name: "Phone",
        photo: "https://i5.walmartimages.com/asr/10accd37-b241-4d55-b39d-2417f2f80f74.dd8421d47ac8c8517d0b81fe716760b2.jpeg",
        weight: 0.5,
        price: 400,
        category: 'electronics'
    },
    {
        name: "Chair",
        photo: "https://www.ikea.com/kr/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s",
        weight: 4,
        price: 20,
        category: 'furniture'
    },
    {
        name: "Sofa",
        photo: "https://cdn.shopify.com/s/files/1/0056/0912/8000/products/Sofa_lova_Svan_1800x1800.jpg?v=1583269013",
        weight: 60,
        price: 200,
        category: 'furniture'
    },
    {
        name: "Lamp",
        photo: "https://greenice.com/57848/a.jpg",
        weight: 4,
        price: 80,
        category: 'furniture'
    },

]

let myMoney=200;
let myWeight=30;

const fullScreen=document.querySelector('.main-container')! as HTMLBodyElement;
console.log(fullScreen);
const products=document.querySelector('#shop-products')! as HTMLDivElement;
const inventory=document.querySelector('#my-products')! as HTMLDivElement;

const moneyDIV=document.querySelector('#money')! as HTMLDivElement;
const weightDIV=document.querySelector('#weight')! as HTMLDivElement;

const addItemBtn=document.querySelector('#add-to-shop')! as HTMLButtonElement;

addItemBtn.onclick=()=>{
    console.log('its time to make modal window');
    showInputModal();
}


const displayResources= ()=>{
    console.log(moneyDIV, weightDIV);
    moneyDIV.textContent='Money: '+ myMoney;
    weightDIV.textContent='Weight limt: ' + myWeight;
}


const filteredItems= (arr:itemType[], categoryName: string):itemType[] =>{
    const newArr=arr.filter(item=> item.category == categoryName);
    return (newArr.length)? newArr : arr;
}

function display (items: itemType[]) {
    products.innerHTML='';
    displayResources();
    items.forEach(item=>{

        const card = document.createElement('div');
        card.classList.add('card');
        products.append(card);

        const img =document.createElement('img');
        img.classList.add('prod-picture');
        img.src=item.photo;

        const productInfo= document.createElement('div');
        productInfo.classList.add('prod-info');
        card.append(img, productInfo);

        const title=document.createElement('h3');
        title.textContent=item.name;

        const weight=document.createElement('p');
        weight.textContent='Weight: '+item.weight.toString();

        const price=document.createElement('p');
        price.textContent='Price: ' + item.price.toString();

        const addItemBtn=document.createElement('button');
        addItemBtn.textContent='Add to cart';

        addItemBtn.onclick=()=>{
            let checkMoney = parseFloat((myMoney - item.price).toFixed(2));
            let checkWeight = parseFloat((myWeight - item.weight).toFixed(2));
            if (checkMoney>=0 && checkWeight>=0) {
                myMoney = parseFloat((myMoney - item.price).toFixed(2));
                myWeight = parseFloat((myWeight - item.weight).toFixed(2));
                displayResources();
                const purchasedItem=card.cloneNode(true) as HTMLDivElement;
                const purchasedItemInfo=purchasedItem.lastChild!;
                const removeItemBtn=purchasedItemInfo.lastChild! as HTMLButtonElement;
                removeItemBtn.textContent='Remove Item';
                inventory.append(purchasedItem);

                removeItemBtn.onclick=()=>{
                    purchasedItem.remove();
                    myMoney = parseFloat((myMoney + item.price).toFixed(2));
                    myWeight = parseFloat((myWeight + item.weight).toFixed(2));
                    displayResources();
                }
            } else {
                console.log('Trūksta resursų,"money" arba "too much weight".')
            }

        }

        productInfo.append(title, weight, price, addItemBtn);
    })
}

//pradzioje rodo visus produktus
display(items);

const categoryButtons :NodeListOf<HTMLButtonElement> =document.querySelectorAll('button.category') ;

categoryButtons.forEach((button, index:number)=> {
    button.onclick=()=>{
        products.innerHTML='';
        display(filteredItems(items, categories[index]));
    }
})

const showInputModal=()=> {
    const modalCard=document.createElement('div');
    modalCard.classList.add('modal-card');
    fullScreen.append(modalCard);
    const nameInput=document.createElement('input') as HTMLInputElement;
    nameInput.classList.add('inputs');
    nameInput.placeholder='Product name';

    const photoInput=document.createElement('input') as HTMLInputElement;
    photoInput.classList.add('inputs');
    photoInput.placeholder='Product picture';

    const weightInput=document.createElement('input') as HTMLInputElement;
    weightInput.classList.add('inputs');
    weightInput.placeholder='Product weight';
    weightInput.type='number';

    const priceInput=document.createElement('input') as HTMLInputElement;
    priceInput.classList.add('inputs');
    priceInput.placeholder='Product price';
    priceInput.type='number';


    const categoryInput=document.createElement('select') as HTMLSelectElement;
    categoryInput.classList.add('inputs');
    const category=document.createElement('option')! as HTMLOptionElement;
    category.selected = true;
    category.disabled = true;
    category.textContent='Select category';
    categoryInput.append(category);

    categories.forEach(categ=> {
        if (categ!='all') {
            const category=document.createElement('option') as HTMLOptionElement;
            category.value=category.textContent=categ;
            categoryInput.append(category);
        }
    })


    const submitBtn=document.createElement('button') as HTMLButtonElement;
    submitBtn.classList.add('inputs');
    submitBtn.textContent='Add product to shop';

    submitBtn.onclick=()=>{
        console.log(nameInput.value);
        console.log(photoInput.value);
        console.log(weightInput.value);
        console.log(priceInput.value);
        console.log(categoryInput.value);

        if (nameInput.value && photoInput.value && weightInput.value && priceInput.value && categories.includes(categoryInput.value)) {
            console.log('visi langai OK.');
            const newProd :itemType = {
                name: nameInput.value,
                photo:photoInput.value,
                weight:parseFloat(weightInput.value),
                price: parseFloat(priceInput.value),
                category: categoryInput.value
            }

            items.push(newProd);
            console.log('papildytas produktu sarasas', items);
            modalCard.remove();
            display(items);

        } else {
            console.log('ne viskas taip gerai...');
        }

    }

    modalCard.append('Insert new product', nameInput, photoInput, weightInput, priceInput, categoryInput, submitBtn);
}

