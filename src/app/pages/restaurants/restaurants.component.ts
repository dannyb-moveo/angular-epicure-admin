import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantsDialogComponent } from 'src/app/components/restaurants-dialog/restaurants-dialog.component';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class RestaurantsComponent implements OnInit {
  restaurants$: Observable<RestaurantInterface[]>;
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = [
    'name',
    'popular',
    'signatureDish',
    'chef',
    'action',
  ];
  expandedElement: RestaurantInterface | null;

  dataSource: MatTableDataSource<RestaurantInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.restaurantService.getIsLoading();
    this.restaurantService.fetchRestaurants();
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.dataSource = new MatTableDataSource(restaurants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(RestaurantsDialogComponent, {
      width: '50%',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRestaurant(restaurant: RestaurantInterface) {
    this.dialog.open(RestaurantsDialogComponent, {
      width: '50%',
      data: restaurant,
    });
  }

  deleteRestaurant(restaurant: RestaurantInterface) {
    const { _id: id } = restaurant;
    this.restaurantService.deleteRestaurant(id!);
  }
}
