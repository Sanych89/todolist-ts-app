import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { v1 } from 'uuid';

type ShopListType = {
id: string,
price: number,
name: string, 
quantity: number
}


export function Shop () {

    let [shoplist, setShoplist] = useState<Array<ShopListType>> ([
        {id: v1(), price: 100, name: 'Beyblade' , quantity: 2},
        {id: v1(), price: 50, name: 'Gas' , quantity: 50},
        {id: v1(), price: 20, name: 'Saw' , quantity: 1},
        {id: v1(), price: 70, name: 'Soda' , quantity: 5},
    ])

    function buyItem(id: string) {
        let item = shoplist.filter(t => t.id === id)
        
        if (item[0].quantity > 0){
            item[0].quantity -=1
        }
        else {alert('No goods left!') }
        
        setShoplist([...shoplist])
        
   

   
    }
    


    
    return <div>
    <div>
    Магазин верх
    </div>
    <div>
        <p> Магазин середина</p>
        <ul>
            {
            shoplist.map(t => {


                let buyButtonHandler = () => {
                    buyItem(t.id)
                }

                return <li key={t.id} >
                <span> {t.name}</span>
                <span> {t.price}</span>
                <span> {t.quantity}</span>
                <span> </span>
                <button onClick={buyButtonHandler}> Buy</button>

                </li>
            } )
        }
        </ul>
            

        
    </div>
    Магазин низ 
    </div>
}

