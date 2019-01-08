import { Reflections } from '../data/reflections.interface';
import { Storage } from '@ionic/Storage';
import firebase from 'firebase';
import { storage } from 'firebase';

export class ReflectionServices {
    private favoritesRef: Reflections[] = [];
    likedRef = [];
    fav;

    addRefToFavorites(ref: Reflections) {
        this.favoritesRef.push(ref);
    }

    removeRefFromFavorites(ref: Reflections) {
        this.fav = this.favoritesRef.indexOf(ref);
        this.favoritesRef.splice(this.fav, 1);
    }

    getFavoritedRef() {
        return this.favoritesRef;
    }

    isFavorited(ref: Reflections){
        return this.favoritesRef.findIndex( refs => refs == ref );
    }

    getAllReflection() {
        const ref: firebase.database.Reference = firebase.database().ref('/reflection');
        return ref;
    }
}
