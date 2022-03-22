import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/UI/dialog/dialog.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Observable<RestaurantInterface[]>;
  displayedColumns: string[] = ['name'];

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
    this.restaurants = this.restaurantService.getRestaurants().asObservable();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
    });
  }
}
