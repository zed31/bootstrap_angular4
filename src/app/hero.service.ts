import { Injectable } from '@angular/core';

import { Hero } from './heroe';
import { HEROES } from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T)

    }
  }

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(
                      tap(heroes => this.log('Heroe fetched')),
                      catchError(this.handleError('getHeroes', []))
                    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched an hero: ${id}`)),
      catchError(this.handleError<Hero>(`Cannot fetch hero ${id}`))
    )
  }

  updateHero(hero : Hero) : Observable<any> {
      return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(_ => this.log(`Heroe ${hero.name} updated successfully`)),
        catchError(this.handleError<any>(`Error while updating ${hero.name}`))
      )
  }

  addHero(hero: Hero) : Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
        tap(heroe => this.log(`Hero ${hero.name} has been added with the id: ${heroe.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  deleteHero(hero: Hero) : Observable<Hero> {
    const id = hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim) {
      return of([])
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching with: ${term}`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    )
  }

  log(message: string) : void {
    this.messageService.add('HeroService: ' + message);
  }

  constructor(
    private messageService : MessageService,
    private http: HttpClient
  ) {}

}
