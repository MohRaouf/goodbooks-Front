import { Observable, Subscriber } from "rxjs";
import { combineAll } from "rxjs/operators";

  function convertToBase64(img: File): Observable<any> {
    const imgObservable = new Observable((subscriber: Subscriber<any>) => {
      readImg(img, subscriber);
    })
    return imgObservable
  }

  function readImg(img: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(img)
    fileReader.onload = () => {
      subscriber.next(fileReader.result)
      subscriber.complete();
    }
    fileReader.onerror = (error) => {
      subscriber.error(error)
      subscriber.complete();
    }

  }
  export{convertToBase64,readImg}