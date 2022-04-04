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
import DishInterface from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import { DishesDialogComponent } from 'src/app/components/dishes-dialog/dishes-dialog.component';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
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
export class DishesComponent implements OnInit {
  dishes$: Observable<DishInterface[]>;
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = [
    'name',
    'price',
    'tags',
    'restaurant',
    'action',
  ];
  expandedElement: DishInterface | null;

  dataSource: MatTableDataSource<DishInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedValue: string;

  constructor(
    private dishService: DishService,
    public dialog: MatDialog,
    private restaurantsService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.dishService.getIsLoading();
    this.dishService.fetchDishes();
    this.dishes$ = this.dishService.getDishes();
    this.dishService.getDishes().subscribe((dishes) => {
      this.dataSource = new MatTableDataSource(dishes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(DishesDialogComponent, {
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

  editDish(dish: DishInterface) {
    this.dialog.open(DishesDialogComponent, {
      width: '50%',
      data: dish,
    });
  }

  deleteDish(dish: DishInterface) {
    const { _id: id } = dish;
    this.dishService.deleteDish(id!);
  }
}
