

const shop_list = document.querySelector('.shop-list')

fetch('http://localhost:5050/devs').then(data => data.json()).then(data=>{

    let products ='';

    data.map(product=>{
        products += `
        <div class="col-md-3 my-3">
                <div class="card shadow p-item">
                    <a href="#" onclick="singleProductLoad(${product.id})" data-bs-toggle="modal" data-bs-target="#single_product"><img src="${product.photo}" alt=""></a>
                    <div class="card-body">
                        <h4>${product.name}</h4>
                        <p>Location: ${product.location}</p>
                    </div>
                </div>
            </div>
        
        `;

    })
    shop_list.innerHTML = products;

});

function singleProductLoad(id){
    //alert(id)
    const single_p = document.querySelector('.product-single');
    // const single_p = document.getElementById('test');

    single_p.innerHTML = '';//ai line ta use korle notun product a click korle purano ra show koebe

    fetch('http://localhost:5050/devs/' + id).then(data => data.json()).then(data => {
        //console.log(data)

        single_p.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                
                <img class="w-100 "src="${data.photo}" alt="">
            </div>
            <div class="col-md-6">
                <h1>${data.name}</h1>
                <h2>Location: ${data.location}</h2>
                
                <p>${data.age}</p>
                <a class="btn btn-lg btn-info" href="#">Add to cart</a>
            </div>

        </div>
        
        `;





    });
   
};