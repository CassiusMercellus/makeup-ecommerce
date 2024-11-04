import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import firebase from 'firebase/app'; // Ensure Firebase is imported
import { getFirestore, arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  // Add item to user's cart
  // Add item to user's cart
addToCart(itemId: string): Promise<void> {
  return this.auth.user.pipe(
    take(1), // Take only the first user observable
    switchMap(user => {
      if (user) {
        const cartDoc: AngularFirestoreDocument<any> = this.firestore.doc(`carts/${user.uid}`);
        // Create a new document or update the existing one
        return cartDoc.set(
          { items: arrayUnion(itemId) }, // Using the modular SDK's arrayUnion
          { merge: true }
        );
      } else {
        return Promise.reject('User not authenticated'); // Handle unauthenticated user
      }
    })
  ).toPromise(); // Return the Promise
}


  // Get user's cart items
  getCartItems() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore
            .collection('carts')
            .doc(user.uid)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
