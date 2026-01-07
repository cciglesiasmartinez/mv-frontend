import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GetUserCollection } from '../../features/items/dto';

@Injectable({
  providedIn: 'root',
})
export class Items {
  /**
   * 
   */
  private readonly apiUrl = 'http://localhost:8089/items';

  /**
   * Constructor del servicio Items.
   * @param httpClient Cliente HTTP inyectado por Angular
   */
  constructor(private httpClient: HttpClient) {}

  getUserCollection(page: number = 0, size: number = 100): Observable<GetUserCollection> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<GetUserCollection>(`${this.apiUrl}/collection`, { params });
  }
}
