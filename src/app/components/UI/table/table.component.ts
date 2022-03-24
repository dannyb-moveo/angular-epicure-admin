import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  restaurants: Observable<RestaurantInterface[]>;
  displayedColumns: string[] = ['id', 'name', 'isPopular', 'action'];

  dataSource: MatTableDataSource<RestaurantInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
    this.restaurants = this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.dataSource = new MatTableDataSource(restaurants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
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

  editProduct(row: RestaurantInterface) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row,
    });
  }
}
