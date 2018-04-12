import { Component, OnInit }    from '@angular/core';
import { Hero }                 from '../heroe'
import { HeroService }          from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes : Hero[] = null;

  constructor(private heroService : HeroService) { 
    
  }

  ngOnInit() {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name : string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({name} as Hero)
        .subscribe(
          hero => this.heroes.push(hero)
        );
  }

  delete(hero: Hero) : void {
    this.heroes = this.heroes.filter(currentHero => currentHero.id !== hero.id);
    this.heroService.deleteHero(hero).subscribe();
  }

}