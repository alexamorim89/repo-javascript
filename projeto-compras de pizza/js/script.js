let carrinho = [];
let quantidadePizzas = 1;
//let modalKey = 0;

/*const c = (element) =>{ document.querySelector(element); }*/
/*const cs = (element) =>{ document.querySelectorAll(element); }*/


//LISTAGEM  DAS PIZZAS
pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        //let key = e.target.closest('.pizza-item').getAttribute('data-key');
        quantidadePizzas = 1;
        //modalKey = key;

        //MODAL
        document.querySelector('.pizzaInfo').setAttribute('data-id_pizza', item.id)
        document.querySelector('.pizzaBig img').src = item.img;
        document.querySelector('.pizzaInfo h1').innerHTML = item.name;
        document.querySelector('.pizzaInfo--desc').innerHTML = item.description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
            if(sizeIndex == 2){
                sizeItem.classList.add('selected');
            }
            sizeItem.querySelector('span').innerHTML = item.sizes[sizeIndex] 
        })

        document.querySelector('.pizzaInfo--qt').innerHTML = quantidadePizzas;
        document.querySelector('.pizzaWindowArea').style.opacity = 0;
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{ 
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)

    });

    document.querySelector('.pizza-area').append(pizzaItem)
})

//EVENTOS DO MODAL
function closeModal(){
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(quantidadePizzas > 1){
        quantidadePizzas--;
    }
    document.querySelector('.pizzaInfo--qt').innerHTML = quantidadePizzas;
});

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    quantidadePizzas++; 
    document.querySelector('.pizzaInfo--qt').innerHTML = quantidadePizzas;
});

document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, index)=>{ 
    sizeItem.addEventListener('click', ()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        sizeItem.classList.add('selected');
    });
});

document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{    
    let idPizza = parseInt( document.querySelector('.pizzaInfo').getAttribute('data-id_pizza') );
    
    let tamanhoPizzaKey = parseInt( document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
    let tamanhoPizzaNumero = parseInt( document.querySelector('.selected span').innerHTML );
    let tamanhoPizzaDescricao = document.querySelector('.selected div').innerHTML;

    let identificador = `${idPizza}@${tamanhoPizzaKey}`;
    let itemKey =  carrinho.findIndex((item)=> item.identify == identificador );
    
    pizza = {
        identify: identificador,
        id: idPizza,
        size: {
            key: tamanhoPizzaKey,
            size: tamanhoPizzaNumero,
            desc: tamanhoPizzaDescricao
        },   
        quantity: quantidadePizzas
    }

    if(itemKey > -1){
        carrinho.forEach((item)=>{            
            if(item.id == idPizza){
                item.quantity += quantidadePizzas;
            }
        });
    } else {
        carrinho.push(pizza);
    }
    
    updateCarrinho();
    closeModal();
});

document.querySelector('.menu-openner').addEventListener('click', ()=>{
    if(carrinho.length > 0){
        document.querySelector('aside').style.left = 0;
    }
});

document.querySelector('.menu-closer').addEventListener('click', ()=>{
    document.querySelector('aside').style.left = '100vw';
});

function updateCarrinho() {
    document.querySelector('.menu-openner span').innerHTML = carrinho.length;

    if(carrinho.length > 0){
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';
        
        let total = 0;
        let subtotal = 0;
        let desconto = 0;

        carrinho.map((item, index)=>{           
            let pizzaItem = pizzaJson.find((pizza)=> pizza.id == item.id);
            let carrinhoItem = document.querySelector('.models .cart--item').cloneNode(true);
            
            subtotal += pizzaItem.price * item.quantity;

            let pizzaNomeTamanho;
            switch (item.size.key) {
                case 0:
                    pizzaNomeTamanho = 'P';
                    break;
                case 1:
                    pizzaNomeTamanho = 'M';
                    break;
                case 2:
                    pizzaNomeTamanho = 'G';
                    break;            
            }

            let pizzaNome = `${pizzaItem.name} (${pizzaNomeTamanho})`
            
            carrinhoItem.querySelector('img').src = pizzaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaNome;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = item.quantity;
            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(item.quantity > 1){
                    item.quantity--;
                } else {
                    carrinho.splice(index, 1)
                }
                updateCarrinho();
            });
            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                item.quantity++;
                updateCarrinho();
            });

            document.querySelector('.cart').append(carrinhoItem); 
        });

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        
    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
}




/*
document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{    
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    carrinho.push({
        id: pizzaJson[modalKey].id,
        size,
        quantidade: quantidadePizzas
    });

    closeModal()
});
*/