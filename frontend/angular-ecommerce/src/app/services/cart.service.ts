import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   cartItems: CartItem[] =[];
   totalPrice: Subject<number>=new Subject<number>();
   totalQuantity: Subject<number>=new Subject<number>();
   // subject is subclass of observable, use subject to push events, the event would be sent to all of subscribers
  constructor() { }

  addToCart(theCartItem: CartItem){
     // check if we already have items in cart
     let alreadyExistsInCart: boolean=false;
     let existingCartItem: CartItem= undefined;

     // find the item in cart base on item id
     if(this.cartItems.length>0){
        for(let tempCartItem of this.cartItems){
          if(tempCartItem.id===theCartItem.id){
            existingCartItem=tempCartItem;
            break;
          }
        }
        //check if we found it
        alreadyExistsInCart=(existingCartItem!=undefined);
     }
     if(alreadyExistsInCart){
       existingCartItem.quantity++;
     }else{
       this.cartItems.push(theCartItem);
     }
     //compute cart total price and quantity
     this.computeCartTotals();
     
  }

  computeCartTotals() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.unitPrice*currentCartItem.quantity;
      totalQuantityValue+=currentCartItem.quantity;
    }

    //publish the new values... all subscribers will receive new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // .next(): publish/send event to all subscribers

    //log cart data just for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
     console.log('Contents of the cart');
     for(let tempCartItem of this.cartItems){
       const subTotalPrice=tempCartItem.unitPrice*tempCartItem.quantity;
       console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
     }
     console.log(`totalPrice:${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
     console.log('------');
  }
  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex= this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id)
    //if found, remove item from array
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
